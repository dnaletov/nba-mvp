import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Player {
  name: string;
  position: string;
  team: string;
  points: number;
  imageUrl: string;
}

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 10px;
  width: 60%;
  max-width: 900px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: white;
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

const PlayerCard: React.FC<Player> = ({
  name,
  position,
  team,
  points,
  imageUrl,
}) => {
  return (
    <Card>
      <ImageContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={imageUrl} alt={`${name} - MVP`} />
        </motion.div>
      </ImageContainer>

      <InfoContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Name>{name}</Name>
          <Position>Position: {position}</Position>
          <Team>Team: {team}</Team>
          <Points>Points: {points}</Points>
        </motion.div>
      </InfoContainer>
    </Card>
  );
};

export default PlayerCard;
