import axios from "axios";

const API_URL = "http://localhost:5000";

export const getPlayers = async (page: number, perPage: number = 10) => {
  try {
    const response = await axios.get(`${API_URL}/players`, {
      params: { page, per_page: perPage, activeOnly: true },
    });

    return response.data.players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const getPlayerStats = async (playerId: number) => {
  try {
    const response = await axios.get(`${API_URL}/player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for player ${playerId}:`, error);
    throw error;
  }
};
