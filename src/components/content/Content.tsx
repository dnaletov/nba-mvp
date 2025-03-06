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
import Popup from "../popup/Popup";

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 46px;
  background-color: rgb(182, 182, 182);
  height: 100vh;
  overflow-y: auto;
`;

const InnerContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const Content: React.FC = () => {
  const [visiblePlayers, setVisiblePlayers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openClosePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const hasMounted = useRef(false);

  const loadPlayers = (page: number) => {
    const startIndex = (page - 1) * 5;
    const nextPlayers = playersData.slice(startIndex, startIndex + 5);
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
      <InnerContent onClick={openClosePopup}>
        {visiblePlayers.map((player, index) => (
          <PlayerCard key={index} {...player} />
        ))}
        {isPopupOpen && <Popup onClose={openClosePopup} />}
        {isLoading && <p>Loading...</p>}
      </InnerContent>
    </ContentWrapper>
  );
};

export default Content;
