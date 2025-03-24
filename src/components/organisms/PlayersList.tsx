import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PlayerCard from "../molecules/PlayerCard";
import Popup from "../atoms/Popup";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import {
  fetchPlayersWithImage,
  fetchPlayerStats,
} from "../../services/playersData";

const PlayersListWrapper = styled.section`
  min-height: 100vh;
  padding: 46px;
  background-color: rgb(182, 182, 182);
  overflow-y: auto;
`;

const InnerContent = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    justify-content: flex-start;
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
  const [visiblePlayers, setVisiblePlayers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const isLoadingRef = useRef(false);

  const fetchPlayers = async (page: number) => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    try {
      const players = await fetchPlayersWithImage(page);
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
    fetchPlayers(page);
  }, [page]);

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
        <PlayersContainer>
          {visiblePlayers.length > 0 &&
            visiblePlayers.map((player, id) => (
              <PlayerCard
                key={id}
                {...player}
                onClick={() => handleCardClick(player)}
              />
            ))}
        </PlayersContainer>
      </InnerContent>
      {selectedPlayer && (
        <Popup onClose={() => setSelectedPlayer(null)}>
          <h2>{selectedPlayer.name}</h2>
          {isLoadingStats ? (
            <p>Loading stats...</p>
          ) : playerStats ? (
            <>
              <p>Team: {playerStats.team}</p>
              <p>Age: {playerStats.age}</p>
              <p>Points: {playerStats.points}</p>
              <p>Assists: {playerStats.assists}</p>
              <p>Rebounds: {playerStats.rebounds}</p>
              <p>Steals: {playerStats.steals}</p>
              <p>Blocks: {playerStats.blocks}</p>
            </>
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
