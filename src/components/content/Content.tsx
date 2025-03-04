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
  padding: 54px;
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
      <InnerContent>
        {playersData.map((player, index) => (
          <PlayerCard key={index} {...player} />
        ))}
      </InnerContent>
    </ContentWrapper>
  );
};

export default Content;
