from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, leagueleaders
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_paginated_players(page, per_page):
    player_list = players.get_players()
    start_index = (page - 1) * per_page
    end_index = start_index + per_page
    return player_list[start_index:end_index], len(player_list)

def get_cursor_paginated_players(cursor, per_page):
    player_list = players.get_players()

    start_index = cursor if cursor else 0
    end_index = start_index + per_page

    next_cursor = end_index if end_index < len(player_list) else None
    return player_list[start_index:end_index], next_cursor

@app.route("/players", methods=["GET"])
def get_players():

    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 9)) 
    cursor = request.args.get("cursor") 

    if page:
        players_data, total_count = get_paginated_players(page, per_page)
        next_cursor = page * per_page if len(players_data) == per_page else None
        return jsonify({
            "players": players_data,
            "next_cursor": next_cursor
        })

    if cursor:
        cursor = int(cursor)
        players_data, next_cursor = get_cursor_paginated_players(cursor, per_page)
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

    leaders_points = data[['PLAYER', 'PTS']].sort_values(by='PTS', ascending=False)

    leaders_list = leaders_points.to_dict(orient="records")
    return jsonify(leaders_list)

@app.route("/leaders/rebounds", methods=["GET"])
def leaders_rebounds():
    leaders = leagueleaders.LeagueLeaders(season="2024-25")
    data = leaders.get_data_frames()[0]

    leaders_rebounds = data[['PLAYER', 'REB']].sort_values(by='REB', ascending=False)

    leaders_list = leaders_rebounds.to_dict(orient="records")
    return jsonify(leaders_list)

@app.route("/leaders/assists", methods=["GET"])
def leaders_assists():
    leaders = leagueleaders.LeagueLeaders(season="2024-25")
    data = leaders.get_data_frames()[0]

    leaders_assists = data[['PLAYER', 'AST']].sort_values(by='AST', ascending=False)

    leaders_list = leaders_assists.to_dict(orient="records")
    return jsonify(leaders_list)

if __name__ == "__main__":
    app.run(debug=True)
