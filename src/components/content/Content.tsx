import React /*, { useEffect, useState }*/ from "react";
import styled from "styled-components";
import PlayerCard from "../PlayerCard/PlayerCard";
// import { getMvpPlayers } from "../../services/nbaService";

const playersData = [
  {
    name: "Nikola Jokić",
    position: "C",
    team: "Denver Nuggets",
    points: 120,
    imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
  },
  {
    name: "LeBron James",
    position: "F",
    team: "Los Angeles Lakers",
    points: 112,
    imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
  },
  {
    name: "Stephen Curry",
    position: "G",
    team: "Golden State Warriors",
    points: 110,
    imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
  },
];

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Начинаем контент сверху */
  padding: 54px; /* Паддинг для контента */
  background-color: rgb(182, 182, 182);
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  //   /* Chrome, Safari, Edge */
  //   ::-webkit-scrollbar {
  //     width: 0px; /* Скрываем ползунок */
  //   }

  //   /* Firefox */
  //   scrollbar-width: none;
  //   -ms-overflow-style: none; /* old IE/Edge */
`;

const Content: React.FC = () => {
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

  return (
    <ContentWrapper>
      {playersData.map((player, index) => (
        <PlayerCard key={index} {...player} />
      ))}
    </ContentWrapper>
  );
};

export default Content;
