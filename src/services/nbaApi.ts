import axios from "axios";
import { DEFAULT_PER_PAGE } from "../constants";
import { TPRawPlayer, TPRawPlayerStats } from "../types/players";

const API_URL = "http://localhost:5000";

export const getPlayers = async (
  page: number,
  perPage: number = DEFAULT_PER_PAGE,
  search: string
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
  playerId: number
): Promise<TPRawPlayerStats[]> => {
  const response = await axios.get(`${API_URL}/player/${playerId}`);
  return response.data;
};

export const getLeadersOfRebounds = async (): Promise<TPRawPlayerStats[]> => {
  const response = await axios.get(`${API_URL}/leaders/rebounds`);
  return response.data;
};

export const getLeadersOfAssists = async (): Promise<TPRawPlayerStats[]> => {
  const response = await axios.get(`${API_URL}/leaders/assists`);
  return response.data;
};

export const getLeadersOfPoints = async (): Promise<TPRawPlayerStats[]> => {
  const response = await axios.get(`${API_URL}/leaders/points`);
  return response.data;
};

export const getLeadersOfBlocks = async (): Promise<TPRawPlayerStats[]> => {
  const response = await axios.get(`${API_URL}/leaders/blocks`);
  return response.data;
};

export const getLeadersOfSteals = async (): Promise<TPRawPlayerStats[]> => {
  const response = await axios.get(`${API_URL}/leaders/steals`);
  return response.data;
};
