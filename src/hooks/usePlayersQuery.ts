import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { getPlayers, getPlayerStats } from "../services/nbaApi";
import { DEFAULT_PER_PAGE } from "../constants";
import useDebounce from "./useDebounce";
import { TPPlayer, TPRawPlayerStats, TPRawPlayer } from "../types/players";

const mapPlayer = (raw: TPRawPlayer): TPPlayer => ({
  id: raw.id,
  name: raw.full_name,
  imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${raw.id}.png`,
});

const mapPlayerStats = (raw: TPRawPlayerStats) => ({
  age: raw.PLAYER_AGE,
  team: raw.TEAM_ABBREVIATION,
  assists: raw.AST,
  blocks: raw.BLK,
  points: raw.PTS,
  rebounds: raw.REB,
  steals: raw.STL,
});

export const usePlayersQuery = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedPlayer, setSelectedPlayer] = useState<TPPlayer | null>(null);

  const playersQuery = useInfiniteQuery({
    queryKey: ["players", debouncedSearch],
    queryFn: async ({ pageParam }) => {
      const rawPlayers = await getPlayers(
        pageParam as number,
        DEFAULT_PER_PAGE,
        debouncedSearch
      );
      const players = rawPlayers.map(mapPlayer);
      return {
        players,
        nextPage: rawPlayers.length ? (pageParam as number) + 1 : undefined,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const statsQuery = useQuery({
    queryKey: ["playerStats", selectedPlayer?.id],
    queryFn: async () => {
      if (!selectedPlayer) return null;
      const stats = await getPlayerStats(selectedPlayer.id);
      return stats.length ? mapPlayerStats(stats[stats.length - 1]) : null;
    },
    enabled: !!selectedPlayer,
  });

  const handleCardClick = useCallback((player: TPPlayer) => {
    setSelectedPlayer(player);
  }, []);

  return {
    players: playersQuery.data?.pages.flatMap((page) => page.players) || [],
    hasMore: !!playersQuery.hasNextPage,
    fetchNextPage: playersQuery.fetchNextPage,
    isFetchingNextPage: playersQuery.isFetchingNextPage,
    isLoadingPlayers: playersQuery.isLoading,
    isLoadingStats: statsQuery.isLoading,
    playerStats: statsQuery.data,
    selectedPlayer,
    setSelectedPlayer,
    handleCardClick,
    search,
    setSearch,
  };
};
