import { useQuery } from "@tanstack/react-query";
import {
  getLeadersOfPoints,
  getLeadersOfRebounds,
  getLeadersOfAssists,
} from "../services/nbaApi";
import { TPRawPlayerStats } from "../types/players";

type StatType = "points" | "rebounds" | "assists";

const fetchers: Record<StatType, () => Promise<TPRawPlayerStats[]>> = {
  points: getLeadersOfPoints,
  rebounds: getLeadersOfRebounds,
  assists: getLeadersOfAssists,
};

export const useStatLeadersQuery = (stat: StatType) => {
  return useQuery({
    queryKey: ["leaders", stat],
    queryFn: () => fetchers[stat](),
  });
};
