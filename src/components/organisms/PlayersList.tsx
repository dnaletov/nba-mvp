import { useState, useEffect } from "react";
import styled from "styled-components";
import PlayerCard from "../molecules/PlayerCard";
import Popup from "../atoms/Popup";
import { getPlayers } from "../../services/nbaApi";
import LoadingPlaceholder from "../atoms/LoadingIndicator";

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

  const fetchPlayers = async (page: number) => {
    try {
      const playerData = await getPlayers(page);
      if (!Array.isArray(playerData)) {
        console.error("Invalid data format", playerData);
        return;
      }

      setVisiblePlayers((prev) =>
        page === 1 ? playerData : [...prev, ...playerData]
      );
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers(page);
  }, [page]);

  const handleCardClick = (player: any) => {
    setSelectedPlayer(player);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight * 0.8 && !isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PlayersListWrapper>
      <InnerContent>
        <PlayersContainer>
          {visiblePlayers.length > 0 ? (
            visiblePlayers.map((player, index) => (
              <PlayerCard
                key={index}
                {...player}
                onClick={() => handleCardClick(player)}
              />
            ))
          ) : (
            <p>Players undefined</p>
          )}
        </PlayersContainer>
      </InnerContent>
      {selectedPlayer && (
        <Popup onClose={() => setSelectedPlayer(null)}>
          <h2>{selectedPlayer.name}</h2>
          <p>Position: {selectedPlayer.position}</p>
          <p>Team: {selectedPlayer.team}</p>
          <p>Points: {selectedPlayer.points}</p>
        </Popup>
      )}
      {isLoading && <LoadingPlaceholder />}
    </PlayersListWrapper>
  );
};

export default PlayersList;
