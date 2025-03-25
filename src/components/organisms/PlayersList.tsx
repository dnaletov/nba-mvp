import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PlayerCard from "../molecules/PlayerCard";
import Popup from "../atoms/Popup";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import {
  fetchPlayersWithImage,
  fetchPlayerStats,
} from "../../services/playersData";
import PlayerStat from "../molecules/PlayerStat";
import { DEFAULT_PER_PAGE } from "../../constants";
import SearchInput from "../atoms/SearchInput";
import useDebounce from "../../hooks/useDebounce";

interface Player {
  id: number;
  name: string;
  imageUrl: string;
}

const PlayersListWrapper = styled.section`
  min-height: 100vh;
  padding: 46px;
  background-color: rgb(182, 182, 182);
  overflow-y: auto;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const PlayersContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 800px;
  gap: 24px;
  padding: 24px;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);

    & > :first-child {
      grid-column: span 2;
      width: 100%;
    }
  }
`;

const PlayersList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearch = useDebounce(search, 500);

  const fetchPlayers = useCallback(
    async (page: number, perPage: number, search: string) => {
      if (!hasMore) return;

      setIsFetchingMore(true);
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const newPlayers = await fetchPlayersWithImage(
          page,
          perPage,
          search,
          signal
        );

        if (!signal.aborted) {
          if (newPlayers.length === 0) {
            setHasMore(false);
          }
          setPlayers((prev) =>
            page === 1 ? newPlayers : [...prev, ...newPlayers]
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching players:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        if (!signal.aborted) {
          setIsFetchingMore(false);
        }
      }

      return () => controller.abort();
    },
    [hasMore]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setPlayers([]);
  }, [debouncedSearch]);

  useEffect(() => {
    if (hasMore) {
      fetchPlayers(page, DEFAULT_PER_PAGE, debouncedSearch);
    }
  }, [page, debouncedSearch, hasMore]);

  const handleCardClick = (player: any) => {
    setSelectedPlayer(player);
    setPlayerStats(null);
    setIsLoadingStats(true);

    fetchPlayerStats(player.id)
      .then((stats) => setPlayerStats(stats[stats.length - 1] || null))
      .catch((error) => console.error("Error fetching player stats:", error))
      .finally(() => setIsLoadingStats(false));
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight * 0.95 &&
        !isFetchingMore &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore, hasMore]);

  return (
    <PlayersListWrapper>
      <InnerContent>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PlayersContainer>
          {players.length > 0 ? (
            players
              .filter((player) =>
                player.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((player) => (
                <PlayerCard
                  variant="list"
                  key={player.id}
                  {...player}
                  onClick={() => handleCardClick(player)}
                />
              ))
          ) : (
            <p>No players available</p>
          )}
        </PlayersContainer>
      </InnerContent>
      {selectedPlayer && (
        <Popup onClose={() => setSelectedPlayer(null)}>
          {isLoadingStats ? (
            <LoadingPlaceholder />
          ) : playerStats ? (
            <PlayerStat
              name={selectedPlayer.name}
              imageUrl={selectedPlayer.imageUrl}
              team={playerStats.team}
              age={playerStats.age}
              points={playerStats.points}
              assists={playerStats.assists}
              rebounds={playerStats.rebounds}
              blocks={playerStats.blocks}
            />
          ) : (
            <p>No stats available</p>
          )}
        </Popup>
      )}
      {isFetchingMore && <LoadingPlaceholder />}
    </PlayersListWrapper>
  );
};

export default PlayersList;
