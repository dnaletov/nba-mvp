from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, leagueleaders
from flask import Flask, jsonify, request
from flask_cors import CORS
from functools import partial

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


# === Players ===

def get_paginated_players(page, per_page, active_only=False, search=""):
    player_list = players.get_players()
    if active_only:
        player_list = [player for player in player_list if player.get('is_active', False)]
    if search:
        player_list = [player for player in player_list if search.lower() in player['full_name'].lower()]
    
    start_index = (page - 1) * per_page
    end_index = start_index + per_page
    return player_list[start_index:end_index], len(player_list)

def get_cursor_paginated_players(cursor, per_page, active_only=False, search=""):
    player_list = players.get_players()
    if active_only:
        player_list = [player for player in player_list if player.get('is_active', False)]
    if search:
        player_list = [player for player in player_list if search.lower() in player['full_name'].lower()]
    
    start_index = cursor if cursor else 0
    end_index = start_index + per_page

    next_cursor = end_index if end_index < len(player_list) else None
    return player_list[start_index:end_index], next_cursor


# === Leaders ===

def get_leaders_data(stat_column):
    leaders = leagueleaders.LeagueLeaders(season="2024-25")
    df = leaders.get_data_frames()[0]
    sorted_df = df[['PLAYER', 'PLAYER_ID', stat_column]].sort_values(by=stat_column, ascending=False)
    return sorted_df.to_dict(orient="records")

def get_paginated_leaders_page(stat_column, page, per_page):
    leaders_list = get_leaders_data(stat_column)
    start_index = (page - 1) * per_page
    end_index = start_index + per_page
    next_cursor = end_index if end_index < len(leaders_list) else None
    return leaders_list[start_index:end_index], next_cursor

def get_paginated_leaders_cursor(stat_column, cursor, per_page):
    leaders_list = get_leaders_data(stat_column)
    start_index = cursor if cursor else 0
    end_index = start_index + per_page
    next_cursor = end_index if end_index < len(leaders_list) else None
    return leaders_list[start_index:end_index], next_cursor


# === Роуты ===

@app.route("/players", methods=["GET"])
def get_players():
    per_page = int(request.args.get("per_page", 20))
    active_only = request.args.get("activeOnly", "false").lower() == "true"
    search = request.args.get("search", "")

    page = request.args.get("page")
    cursor = request.args.get("cursor")

    if cursor is not None:
        cursor = int(cursor)
        players_data, next_cursor = get_cursor_paginated_players(cursor, per_page, active_only, search)
        return jsonify({
            "players": players_data,
            "next_cursor": next_cursor
        })

    if page is not None:
        page = int(page)
        players_data, total_count = get_paginated_players(page, per_page, active_only, search)
        next_cursor = page * per_page if len(players_data) == per_page else None
        return jsonify({
            "players": players_data,
            "next_cursor": next_cursor
        })

@app.route("/player/<int:player_id>", methods=["GET"])
def get_player_stats(player_id):
    stats = playercareerstats.PlayerCareerStats(player_id=player_id)
    career_stats = stats.get_data_frames()[0].to_dict(orient="records")
    return jsonify(career_stats)

def create_leaders_route(stat_column):
    def route_handler():
        per_page = int(request.args.get("per_page", 20))
        page = request.args.get("page")
        cursor = request.args.get("cursor")

        if cursor is not None:
            cursor = int(cursor)
            data, next_cursor = get_paginated_leaders_cursor(stat_column, cursor, per_page)
        elif page is not None:
            page = int(page)
            data, next_cursor = get_paginated_leaders_page(stat_column, page, per_page)
        else:
            data, next_cursor = get_paginated_leaders_cursor(stat_column, 0, per_page)

        return jsonify({
            "players": data,
            "next_cursor": next_cursor
        })

    return route_handler

app.add_url_rule("/leaders/points", view_func=create_leaders_route("PTS"), methods=["GET"], endpoint="leaders_points")
app.add_url_rule("/leaders/rebounds", view_func=create_leaders_route("REB"), methods=["GET"], endpoint="leaders_rebounds")
app.add_url_rule("/leaders/assists", view_func=create_leaders_route("AST"), methods=["GET"], endpoint="leaders_assists")
app.add_url_rule("/leaders/blocks", view_func=create_leaders_route("BLK"), methods=["GET"], endpoint="leaders_blocks")
app.add_url_rule("/leaders/steals", view_func=create_leaders_route("STL"), methods=["GET"], endpoint="leaders_steals")

if __name__ == "__main__":
    app.run(debug=True)
