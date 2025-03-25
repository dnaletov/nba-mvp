import { useState, useEffect, useRef } from "react";
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

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 8px 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
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
  const [visiblePlayers, setVisiblePlayers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const isLoadingRef = useRef(false);

  const [search, setSearch] = useState("");

  const filteredPlayers = visiblePlayers.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchPlayers = async (
    page: number,
    perPage: number,
    search: string
  ) => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    try {
      const players = await fetchPlayersWithImage(page, perPage, search);
      setVisiblePlayers((prev) =>
        page === 1 ? players : [...prev, ...players]
      );
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchPlayers(page, DEFAULT_PER_PAGE, search);
  }, [page, search]);

  const handleCardClick = (player: any) => {
    setSelectedPlayer(player);
    setPlayerStats(null);
  };

  useEffect(() => {
    if (selectedPlayer) {
      setIsLoadingStats(true);

      fetchPlayerStats(selectedPlayer.id)
        .then((stats) => setPlayerStats(stats[stats.length - 1] || null))
        .catch((error) => {
          console.error("Error fetching player stats:", error);
          setPlayerStats(null);
        })
        .finally(() => setIsLoadingStats(false));
    }
  }, [selectedPlayer]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight * 0.95 &&
      !isLoadingRef.current
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PlayersListWrapper>
      <InnerContent>
        <SearchInput
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск игрока..."
        />
        <PlayersContainer>
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, id) => (
              <PlayerCard
                key={id}
                {...player}
                onClick={() => handleCardClick(player)}
              />
            ))
          ) : (
            <p>Игроков не найдено</p>
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
      {isLoadingRef.current && <LoadingPlaceholder />}
    </PlayersListWrapper>
  );
};

export default PlayersList;
