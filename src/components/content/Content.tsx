// import { getMvpPlayers } from "../../services/nbaService";

// const Content: React.FC = () => {
//   const [mvpData, setMvpData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchMvpData = async () => {
//     try {
//       const data = await getMvpPlayers();
//       const mvp = data[19];
//       setMvpData({
//         name: `${mvp.firstname} ${mvp.lastname}`,
//         position: mvp.leagues.standard.pos,
//         team: "Unknown Team", // Так как у вас нет информации о команде, можно оставить временно.
//         points: "N/A", // Также у вас нет данных по очкам, но можно добавить позже.
//         imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${mvp.id}.png`, // Генерация изображения по ID игрока.
//       });
//       setLoading(false);
//     } catch (error) {
//       console.error("Ошибка при получении данных MVP", error);
//       setLoading(false); // Завершаем загрузку, даже если ошибка
//     }
//   };

//   useEffect(() => {
//     fetchMvpData(); // Загружаем данные при монтировании компонента
//   }, []);

//   if (loading) return <p>Загрузка...</p>; // Показываем индикатор загрузки

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PlayerCard from "../PlayerCard/PlayerCard";
import { playersData } from "../PlayerCard/playersData";

const ContentWrapper = styled.section`
  padding: 46px;
  background-color: rgb(182, 182, 182);
  height: 100vh;
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

const Content: React.FC = () => {
  const [visiblePlayers, setVisiblePlayers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useRef(false);

  const loadPlayers = (page: number) => {
    const startIndex = (page - 1) * 9;
    const nextPlayers = playersData.slice(startIndex, startIndex + 9);
    setVisiblePlayers((prev) => [...prev, ...nextPlayers]);
  };

  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    hasMounted.current = true;
    loadPlayers(page);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    if (scrollPercentage >= 80 && !isLoading) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadPlayers(page);
      setIsLoading(false);
    }
  }, [page]);

  return (
    <ContentWrapper onScroll={handleScroll}>
      <InnerContent>
        <PlayersContainer>
          {visiblePlayers.map((player, index) => (
            <PlayerCard key={index} {...player} />
          ))}
        </PlayersContainer>
        {isLoading && <p>Loading...</p>}
      </InnerContent>
    </ContentWrapper>
  );
};
export default Content;
