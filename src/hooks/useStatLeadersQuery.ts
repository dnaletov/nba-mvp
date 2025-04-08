import { useQuery } from "@tanstack/react-query";
import {
  getLeadersOfPoints,
  getLeadersOfRebounds,
  getLeadersOfAssists,
} from "../services/nbaApi";
import { RawPlayerStats } from "../types/players";

type StatType = "points" | "rebounds" | "assists";

const fetchers: Record<StatType, () => Promise<RawPlayerStats[]>> = {
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
