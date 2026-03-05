from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, leagueleaders, leaguestandings
from flask import Flask, jsonify, request
from flask_cors import CORS
from nba_api.stats.library.http import NBAStatsHTTP
import logging

# Configure nba_api headers to avoid 403/429
NBAStatsHTTP.headers = {
    'Host': 'stats.nba.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': 'https://www.nba.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Origin': 'https://www.nba.com',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
}

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "NBA MVP Backend is running"})

# Cache for static data
_players_cache = None

def get_all_players():
    global _players_cache
    if _players_cache is None:
        logger.info("Fetching players from nba_api...")
        _players_cache = players.get_players()
    return _players_cache

# === Players ===

def get_filtered_players(active_only=False, search=""):
    player_list = get_all_players()
    if active_only:
        player_list = [player for player in player_list if player.get('is_active', False)]
    if search:
        search_lower = search.lower()
        player_list = [player for player in player_list if search_lower in player['full_name'].lower()]
    return player_list

def get_paginated_players(page, per_page, active_only=False, search=""):
    player_list = get_filtered_players(active_only, search)
    start_index = (page - 1) * per_page
    end_index = start_index + per_page
    return player_list[start_index:end_index], len(player_list)

def get_cursor_paginated_players(cursor, per_page, active_only=False, search=""):
    player_list = get_filtered_players(active_only, search)
    start_index = cursor if cursor else 0
    end_index = start_index + per_page
    next_cursor = end_index if end_index < len(player_list) else None
    return player_list[start_index:end_index], next_cursor


# === Leaders ===

# === Leaders ===

# Cache for leaders to avoid frequent API calls
_leaders_cache = {}

def get_leaders_data(stat_column, season="2025-26"):
    cache_key = f"{stat_column}_{season}"
    if cache_key in _leaders_cache:
        return _leaders_cache[cache_key]

    try:
        logger.info(f"Fetching leaders for {stat_column} from nba_api...")
        leaders = leagueleaders.LeagueLeaders(season=season)
        df = leaders.get_data_frames()[0]
        sorted_df = df[['PLAYER', 'PLAYER_ID', stat_column]].sort_values(by=stat_column, ascending=False)
        data = sorted_df.to_dict(orient="records")
        _leaders_cache[cache_key] = data
        return data
    except Exception as e:
        logger.error(f"Error fetching leaders data: {e}")
        return []

def get_paginated_leaders(stat_column, cursor=None, page=None, per_page=20):
    leaders_list = get_leaders_data(stat_column)
    
    if cursor is not None:
        start_index = cursor
    elif page is not None:
        start_index = (page - 1) * per_page
    else:
        start_index = 0

    end_index = start_index + per_page
    next_cursor = end_index if end_index < len(leaders_list) else None
    return leaders_list[start_index:end_index], next_cursor


# Cache for standings
_standings_cache = {}

def get_standings(season="2025-26"):
    if season in _standings_cache:
        return _standings_cache[season]
    
    try:
        logger.info(f"Fetching standings for {season}...")
        standings = leaguestandings.LeagueStandings(season=season)
        df = standings.get_data_frames()[0]
        # Columns: TeamID, TeamCity, TeamName, WinPCT, etc.
        data = df.to_dict(orient="records")
        _standings_cache[season] = data
        return data
    except Exception as e:
        logger.error(f"Error fetching standings: {e}")
        return []

@app.route("/standings", methods=["GET"])
def get_standings_route():
    season = request.args.get("season", "2025-26")
    return jsonify(get_standings(season))

@app.route("/mvp-forecast", methods=["GET"])
def get_mvp_forecast():
    season = request.args.get("season", "2025-26")
    
    # 1. Get Leaders (top 50 for performance)
    try:
        leaders = leagueleaders.LeagueLeaders(season=season).get_data_frames()[0]
        standings = get_standings(season)
        
        # Create a win% map for quick lookup
        win_pct_map = {str(s['TeamID']): float(s['WinPCT']) for s in standings}
        
        forecast = []
        for _, row in leaders.head(50).iterrows():
            player_id = int(row['PLAYER_ID'])
            team_id = str(row['TEAM_ID'])
            win_pct = win_pct_map.get(team_id, 0.5) # Default to 0.5 if not found
            
            # Simple MVP Score Algorithm:
            # Score = (PPG * 1.0) + (RPG * 0.5) + (APG * 0.5) + (Win% * 50)
            # Note: LeagueLeaders returns totals, so we divide by GP
            gp = row['GP'] if row['GP'] > 0 else 1
            ppg = row['PTS'] / gp
            rpg = row['REB'] / gp
            apg = row['AST'] / gp
            
            mvp_score = ppg + (rpg * 0.5) + (apg * 0.5) + (win_pct * 50)
            
            forecast.append({
                "PLAYER_ID": player_id,
                "PLAYER": row['PLAYER'],
                "TEAM": row['TEAM'],
                "PTS": round(ppg, 1),
                "REB": round(rpg, 1),
                "AST": round(apg, 1),
                "WIN_PCT": round(win_pct * 100, 1),
                "SCORE": round(mvp_score, 2)
            })
            
        # Sort by score and take top 6
        forecast.sort(key=lambda x: x['SCORE'], reverse=True)
        top_forecast = forecast[:6]
        
        # Calculate probability (relative to top score)
        max_score = top_forecast[0]['SCORE'] if top_forecast else 1
        for f in top_forecast:
            f['PROBABILITY'] = round((f['SCORE'] / max_score) * 100, 1)
            
        return jsonify(top_forecast)
        
    except Exception as e:
        logger.error(f"Error in mvp-forecast: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/players", methods=["GET"])
def get_players_route():
    try:
        per_page = int(request.args.get("per_page", 20))
        active_only = request.args.get("activeOnly", "false").lower() == "true"
        search = request.args.get("search", "")

        page = request.args.get("page")
        cursor = request.args.get("cursor")

        if cursor is not None:
            players_data, next_cursor = get_cursor_paginated_players(int(cursor), per_page, active_only, search)
        elif page is not None:
            players_data, _ = get_paginated_players(int(page), per_page, active_only, search)
            next_cursor = int(page) * per_page if len(players_data) == per_page else None
        else:
            players_data, next_cursor = get_cursor_paginated_players(0, per_page, active_only, search)

        return jsonify({
            "players": players_data,
            "next_cursor": next_cursor
        })
    except Exception as e:
        logger.error(f"Error in /players route: {e}")
        return jsonify({"error": str(e)}), 500

# Cache for player stats
_player_stats_cache = {}

@app.route("/player/<int:player_id>", methods=["GET"])
def get_player_stats_route(player_id):
    if player_id in _player_stats_cache:
        return jsonify(_player_stats_cache[player_id])

    max_retries = 3
    for attempt in range(max_retries):
        try:
            logger.info(f"Fetching stats for player {player_id} (attempt {attempt + 1})...")
            # Set explicit timeout for this request
            stats = playercareerstats.PlayerCareerStats(player_id=player_id, timeout=60)
            career_stats = stats.get_data_frames()[0].to_dict(orient="records")
            _player_stats_cache[player_id] = career_stats
            return jsonify(career_stats)
        except Exception as e:
            logger.warning(f"Attempt {attempt + 1} failed for player {player_id}: {e}")
            if attempt == max_retries - 1:
                logger.error(f"All attempts failed for player {player_id}: {e}")
                return jsonify({"error": "NBA API timeout or failure. Please try again later.", "details": str(e)}), 500
            import time
            import random
            time.sleep(1 + random.random() * 2) # Wait a bit before retry

def create_leaders_route(stat_column):
    def route_handler():
        try:
            per_page = int(request.args.get("per_page", 20))
            page = request.args.get("page")
            cursor = request.args.get("cursor")

            if cursor is not None:
                data, next_cursor = get_paginated_leaders(stat_column, cursor=int(cursor), per_page=per_page)
            elif page is not None:
                data, next_cursor = get_paginated_leaders(stat_column, page=int(page), per_page=per_page)
            else:
                data, next_cursor = get_paginated_leaders(stat_column, cursor=0, per_page=per_page)

            return jsonify({
                "players": data,
                "next_cursor": next_cursor
            })
        except Exception as e:
            logger.error(f"Error in leaders route for {stat_column}: {e}")
            return jsonify({"error": str(e)}), 500

    return route_handler

app.add_url_rule("/leaders/points", view_func=create_leaders_route("PTS"), methods=["GET"], endpoint="leaders_points")
app.add_url_rule("/leaders/rebounds", view_func=create_leaders_route("REB"), methods=["GET"], endpoint="leaders_rebounds")
app.add_url_rule("/leaders/assists", view_func=create_leaders_route("AST"), methods=["GET"], endpoint="leaders_assists")
app.add_url_rule("/leaders/blocks", view_func=create_leaders_route("BLK"), methods=["GET"], endpoint="leaders_blocks")
app.add_url_rule("/leaders/steals", view_func=create_leaders_route("STL"), methods=["GET"], endpoint="leaders_steals")

if __name__ == "__main__":
    app.run(debug=True, port=5001)
