import axios from "axios";
import { DEFAULT_PER_PAGE } from "../constants";
import { TPRawPlayer, TPRawPlayerStats } from "../types/players";

const API_URL = "http://localhost:5001";

export const getPlayers = async (
  page: number,
  perPage: number = DEFAULT_PER_PAGE,
  search: string,
): Promise<TPRawPlayer[]> => {
  const response = await axios.get(`${API_URL}/players`, {
    params: {
      page,
      per_page: perPage,
      activeOnly: true,
      search,
    },
  });
  return response.data.players;
};

export const getPlayerStats = async (
  playerId: number,
): Promise<TPRawPlayerStats[]> => {
  const response = await axios.get(`${API_URL}/player/${playerId}`);
  return response.data;
};

export type StatType = "points" | "rebounds" | "assists" | "steals" | "blocks";

const statToEndpoint: Record<StatType, string> = {
  points: "points",
  rebounds: "rebounds",
  assists: "assists",
  steals: "steals",
  blocks: "blocks",
};

export const getLeaders = async (
  stat: StatType,
): Promise<TPRawPlayerStats[]> => {
  const endpoint = statToEndpoint[stat];
  const response = await axios.get(`${API_URL}/leaders/${endpoint}`);
  return response.data.players;
};
