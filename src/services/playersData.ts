import { getPlayers, getPlayerStats } from "./nbaApi";

export const fetchPlayersWithImage = async (
  page: number,
  perPage: number,
  search: string,
  signal?: AbortSignal
) => {
  const playerData = await getPlayers(page, perPage, search, signal);
  return Array.isArray(playerData)
    ? playerData.map((player) => ({
        id: player.id,
        name: player.full_name,
        imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`,
      }))
    : [];
};

export const fetchPlayerStats = async (playerId: number) => {
  const playerData = await getPlayerStats(playerId);
  return Array.isArray(playerData)
    ? playerData.map((player) => ({
        age: player.PLAYER_AGE,
        team: player.TEAM_ABBREVIATION,
        assists: player.AST,
        blocks: player.BLK,
        points: player.PTS,
        rebounds: player.REB,
        steals: player.STL,
      }))
    : [];
};
