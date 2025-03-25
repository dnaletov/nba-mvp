import { useState, useEffect, useCallback } from "react";
import {
  fetchPlayersWithImage,
  fetchPlayerStats,
} from "../services/playersData";
import { DEFAULT_PER_PAGE } from "../constants";
import useDebounce from "./useDebounce";

interface Player {
  id: number;
  name: string;
  imageUrl: string;
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setPlayers([]);
  }, [debouncedSearch]);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!hasMore) return;

      setIsFetchingMore(true);
      const controller = new AbortController();

      try {
        const newPlayers = await fetchPlayersWithImage(
          page,
          DEFAULT_PER_PAGE,
          debouncedSearch,
          controller.signal
        );
        setPlayers((prev) =>
          page === 1 ? newPlayers : [...prev, ...newPlayers]
        );
        setHasMore(newPlayers.length > 0);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setIsFetchingMore(false);
      }

      return () => controller.abort();
    };

    fetchPlayers();
  }, [page, debouncedSearch]);

  useEffect(() => {
    if (page === 1) {
      setHasMore(true);
      setIsFetchingMore(true);
      fetchPlayersWithImage(1, DEFAULT_PER_PAGE, debouncedSearch)
        .then((newPlayers) => {
          setPlayers(newPlayers);
          setHasMore(newPlayers.length > 0);
        })
        .catch((error) => console.error("Error fetching players:", error))
        .finally(() => setIsFetchingMore(false));
    }
  }, [debouncedSearch]);

  const handleCardClick = useCallback((player: Player) => {
    setSelectedPlayer(player);
    setPlayerStats(null);
    setIsLoadingStats(true);

    fetchPlayerStats(player.id)
      .then((stats) => setPlayerStats(stats[stats.length - 1] || null))
      .catch((error) => console.error("Error fetching player stats:", error))
      .finally(() => setIsLoadingStats(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight * 0.95 &&
        hasMore &&
        !isFetchingMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isFetchingMore]);

  return {
    players,
    selectedPlayer,
    playerStats,
    isLoadingStats,
    isFetchingMore,
    search,
    setSearch,
    hasMore,
    handleCardClick,
    setSelectedPlayer,
  };
};
