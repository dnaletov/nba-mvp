import axios from "axios";

const API_KEY = "4b463f2e5fmsh0f575c2b3f566c5p17908djsn5f769964a6a0";
const API_HOST = "api-nba-v1.p.rapidapi.com";

const apiClient = axios.create({
  baseURL: `https://${API_HOST}`,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
});

export const getMvpPlayers = async () => {
  try {
    const response = await apiClient.get("/players/statistics", {
      params: {
        league: "standard",
        season: "2024",
      },
    });
    return response.data.response; // Данные игроков
  } catch (error) {
    console.error("Ошибка при получении данных MVP", error);
    return [];
  }
};
