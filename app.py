# from nba_api.stats.static import players
# from nba_api.stats.endpoints import playercareerstats, leagueleaders
# from flask import Flask, jsonify, request
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# def get_paginated_players(page, per_page, active_only=False):
#     player_list = players.get_players()
    
#     if active_only:
#         player_list = [player for player in player_list if player.get('is_active', False)]
    
#     start_index = (page - 1) * per_page
#     end_index = start_index + per_page
#     return player_list[start_index:end_index], len(player_list)

# def get_cursor_paginated_players(cursor, per_page, active_only=False):
#     player_list = players.get_players()

#     if active_only:
#         player_list = [player for player in player_list if player.get('is_active', False)]
    
#     start_index = cursor if cursor else 0
#     end_index = start_index + per_page

#     next_cursor = end_index if end_index < len(player_list) else None
#     return player_list[start_index:end_index], next_cursor

# def add_team_to_players(players_data):
#     enriched_players = []
#     for player in players_data:
#         player_id = player["id"]
#         career_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_data_frames()[0]

#         latest_season = career_stats.sort_values(by="SEASON_ID", ascending=False).iloc[0] if not career_stats.empty else None
#         team_name = latest_season["TEAM_ABBREVIATION"] if latest_season is not None else "Unknown"

#         player["team"] = team_name
#         enriched_players.append(player)
    
#     return enriched_players

# @app.route("/players", methods=["GET"])
# def get_players():
#     per_page = int(request.args.get("per_page", 20)) 
#     active_only = request.args.get("activeOnly", "false").lower() == "true"

#     page = request.args.get("page")
#     cursor = request.args.get("cursor")

#     if cursor is not None: 
#         cursor = int(cursor)
#         players_data, next_cursor = get_cursor_paginated_players(cursor, per_page, active_only)
#         players_data = add_team_to_players(players_data)  # Добавляем команду
#         return jsonify({
#             "players": players_data,
#             "next_cursor": next_cursor
#         })

#     if page is not None:
#         page = int(page)
#         players_data, total_count = get_paginated_players(page, per_page, active_only)
#         next_cursor = page * per_page if len(players_data) == per_page else None
#         players_data = add_team_to_players(players_data)  # Добавляем команду
#         return jsonify({
#             "players": players_data,
#             "next_cursor": next_cursor
#         })

# @app.route("/player/<int:player_id>", methods=["GET"])
# def get_player_stats(player_id):
#     stats = playercareerstats.PlayerCareerStats(player_id=player_id)
#     career_stats = stats.get_data_frames()[0].to_dict(orient="records")
#     return jsonify(career_stats)

# @app.route("/leaders/points", methods=["GET"])
# def leaders_points():
#     leaders = leagueleaders.LeagueLeaders(season="2024-25")
#     data = leaders.get_data_frames()[0]

#     leaders_points = data[['PLAYER', 'PTS']].sort_values(by='PTS', ascending=False)

#     leaders_list = leaders_points.to_dict(orient="records")
#     return jsonify(leaders_list)

# @app.route("/leaders/rebounds", methods=["GET"])
# def leaders_rebounds():
#     leaders = leagueleaders.LeagueLeaders(season="2024-25")
#     data = leaders.get_data_frames()[0]

#     leaders_rebounds = data[['PLAYER', 'REB']].sort_values(by='REB', ascending=False)

#     leaders_list = leaders_rebounds.to_dict(orient="records")
#     return jsonify(leaders_list)

# @app.route("/leaders/assists", methods=["GET"])
# def leaders_assists():
#     leaders = leagueleaders.LeagueLeaders(season="2024-25")
#     data = leaders.get_data_frames()[0]

#     leaders_assists = data[['PLAYER', 'AST']].sort_values(by='AST', ascending=False)

#     leaders_list = leaders_assists.to_dict(orient="records")
#     return jsonify(leaders_list)

# if __name__ == "__main__":
#     app.run(debug=True)


from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, leagueleaders
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

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

@app.route("/leaders/points", methods=["GET"])
def leaders_points():
    leaders = leagueleaders.LeagueLeaders(season="2024-25")
    data = leaders.get_data_frames()[0]

    leaders_points = data[['PLAYER', 'PLAYER_ID', 'PTS']].sort_values(by='PTS', ascending=False)

    leaders_list = leaders_points.to_dict(orient="records")
    return jsonify(leaders_list)

@app.route("/leaders/rebounds", methods=["GET"])
def leaders_rebounds():
    leaders = leagueleaders.LeagueLeaders(season="2024-25")
    data = leaders.get_data_frames()[0]

    leaders_rebounds = data[['PLAYER', 'PLAYER_ID', 'REB']].sort_values(by='REB', ascending=False)

    leaders_list = leaders_rebounds.to_dict(orient="records")
    return jsonify(leaders_list)

@app.route("/leaders/assists", methods=["GET"])
def leaders_assists():
    leaders = leagueleaders.LeagueLeaders(season="2024-25")
    data = leaders.get_data_frames()[0]

    leaders_assists = data[['PLAYER', 'PLAYER_ID', 'AST']].sort_values(by='AST', ascending=False)

    leaders_list = leaders_assists.to_dict(orient="records")
    return jsonify(leaders_list)

if __name__ == "__main__":
    app.run(debug=True)
