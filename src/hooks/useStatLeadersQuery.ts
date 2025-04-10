import { useQuery } from "@tanstack/react-query";
import {
  getLeadersOfPoints,
  getLeadersOfRebounds,
  getLeadersOfAssists,
  getLeadersOfSteals,
  getLeadersOfBlocks,
} from "../services/nbaApi";
import { TPRawPlayerStats } from "../types/players";

type StatType = "points" | "rebounds" | "assists" | "steals" | "blocks";

const fetchers: Record<StatType, () => Promise<TPRawPlayerStats[]>> = {
  points: getLeadersOfPoints,
  rebounds: getLeadersOfRebounds,
  assists: getLeadersOfAssists,
  steals: getLeadersOfSteals,
  blocks: getLeadersOfBlocks,
};

export const useStatLeadersQuery = (stat: StatType) => {
  return useQuery({
    queryKey: ["leaders", stat],
    queryFn: () => fetchers[stat](),
  });
};
