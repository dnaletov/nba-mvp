import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// import { getMvpPlayers } from "../../services/nbaService";

const mvpData = {
  name: "Nikola Jokić",
  position: 1,
  team: "Denver Nuggets",
  points: 120,
  imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
};

const MvpWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center; /* Центрирует содержимое */
  padding: 40px 20px;
  background-color: rgb(182, 182, 182);
  color: white;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  max-width: 1000px; /* Ограничение ширины */
  margin: 0 auto; /* Выравнивание по центру */
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  text-align: left;
`;

const Name = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Position = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

const Team = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

const Points = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffcc00;
`;

const Mvp: React.FC = () => {
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
    <MvpWrapper>
      <ImageContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={mvpData.imageUrl} alt={`${mvpData.name} - MVP`} />
        </motion.div>
      </ImageContainer>

      <InfoContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Name>{mvpData.name}</Name>
          <Position>Position: {mvpData.position}</Position>
          <Team>Team: {mvpData.team}</Team>
          <Points>Points: {mvpData.points}</Points>
        </motion.div>
      </InfoContainer>
    </MvpWrapper>
  );
};

export default Mvp;
