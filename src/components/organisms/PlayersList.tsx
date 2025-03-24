import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PlayerCard from "../molecules/PlayerCard";
import Popup from "../atoms/Popup";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import { fetchPlayersWithStats } from "../../services/playersData";

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

  // Используем useRef для отслеживания состояния загрузки
  const isLoadingRef = useRef(false);

  const fetchPlayers = async (page: number) => {
    if (isLoadingRef.current) return; // Блокируем запрос, если уже идет загрузка

    isLoadingRef.current = true; // Устанавливаем флаг загрузки
    try {
      const players = await fetchPlayersWithStats(page);
      setVisiblePlayers((prev) =>
        page === 1 ? players : [...prev, ...players]
      );
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      isLoadingRef.current = false; // Сбрасываем флаг загрузки
    }
  };

  useEffect(() => {
    fetchPlayers(page);
  }, [page]);

  const handleCardClick = (player: any) => {
    setSelectedPlayer(player);
  };

  // Обработчик прокрутки
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Проверяем, если прокрутка почти достигла низа и если не идет загрузка
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
          <p>Team: {selectedPlayer.team}</p>
        </Popup>
      )}
      {isLoadingRef.current && <LoadingPlaceholder />}
    </PlayersListWrapper>
  );
};

export default PlayersList;
