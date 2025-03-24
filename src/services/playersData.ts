import { getPlayers, getPlayerStats } from "./nbaApi";

export const fetchPlayersWithImage = async (
  page: number,
  perPage: number = 20
) => {
  try {
    const playerData = await getPlayers(page, perPage);

    if (!Array.isArray(playerData)) {
      console.error("Invalid player data format", playerData);
      return [];
    }

    const playersWithImage = playerData.map((player) => ({
      id: player.id,
      name: player.full_name,
      imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`,
    }));

    console.log("TEST:", playersWithImage);
    return playersWithImage;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

export const fetchPlayerStats = async (playerId: number) => {
  try {
    const playerData = await getPlayerStats(playerId);

    if (!Array.isArray(playerData)) {
      console.error("Invalid stats data format", playerData);
      return [];
    }

    const playerStats = playerData.map((player) => ({
      age: player.PLAYER_AGE,
      team: player.TEAM_ABBREVIATION,
      assists: player.AST,
      blocks: player.BLK,
      points: player.PTS,
      rebounds: player.REB,
      steals: player.STL,
    }));

    console.log("TEST2:", playerStats);
    return playerStats;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};
