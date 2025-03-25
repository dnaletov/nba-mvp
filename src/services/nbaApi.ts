import axios from "axios";
import { DEFAULT_PER_PAGE } from "../constants";

const API_URL = "http://localhost:5000";

export const getPlayers = async (
  page: number,
  perPage: number = DEFAULT_PER_PAGE,
  search: string,
  signal?: AbortSignal
) => {
  const response = await axios.get(`${API_URL}/players`, {
    params: { page, per_page: perPage, activeOnly: true, search },
    signal,
  });
  return response.data.players;
};

export const getPlayerStats = async (playerId: number) => {
  const response = await axios.get(`${API_URL}/player/${playerId}`);
  return response.data;
};
