import { getPlayers } from "./nbaApi";

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
