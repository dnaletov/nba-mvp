import { useQuery } from "@tanstack/react-query";
import { getLeaders, StatType } from "../services/nbaApi";

export const useStatLeadersQuery = (stat: StatType) => {
  return useQuery({
    queryKey: ["leaders", stat],
    queryFn: () => getLeaders(stat),
  });
};
