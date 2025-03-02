// import axios from "axios";

// const API_KEY = "4b463f2e5fmsh0f575c2b3f566c5p17908djsn5f769964a6a0";
// const API_HOST = "api-nba-v1.p.rapidapi.com";

// const apiClient = axios.create({
//   baseURL: `https://${API_HOST}`,
//   headers: {
//     "X-RapidAPI-Key": API_KEY,
//     "X-RapidAPI-Host": API_HOST,
//   },
// });

// export const getMvpPlayers = async () => {
//   try {
//     const response = await apiClient.get("/players/", {
//       params: {
//         season: "2024",
//         team: "1",
//       },
//     });

//     console.log("Response from API:", response.data);

//     if (response.data.response && response.data.response.length > 0) {
//       return response.data.response;
//     } else {
//       console.error("Нет данных о игроках для указанного сезона.");
//       return [];
//     }
//   } catch (error) {
//     console.error("Ошибка при получении данных MVP", error);
//     return [];
//   }
// };
