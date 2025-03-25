import axios from "axios";
import { DEFAULT_PER_PAGE } from "../constants";

const API_URL = "http://localhost:5000";

export const getPlayers = async (
  page: number,
  perPage: number = DEFAULT_PER_PAGE,
  search: string,
  signal?: AbortSignal
) => {
  try {
    const response = await axios.get(`${API_URL}/players`, {
      params: { page, per_page: perPage, activeOnly: true, search, signal },
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
