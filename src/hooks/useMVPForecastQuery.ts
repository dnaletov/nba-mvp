import { useQuery } from "@tanstack/react-query";
import { getMVPForecast } from "../services/nbaApi";

export const useMVPForecastQuery = () => {
  return useQuery({
    queryKey: ["mvp-forecast"],
    queryFn: getMVPForecast,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
