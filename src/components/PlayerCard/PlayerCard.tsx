import React from "react";
import styled from "styled-components";

interface Player {
  name: string;
  position: string;
  team: string;
  points: number;
  imageUrl: string;
}

const Card = styled.div`
  display: flex;
  margin: 24px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 24px;
  width: 70%;
  max-width: 800px;
  min-width: 320px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 5px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: white;
  margin: 5px;
  justify-content: center;
`;

const Name = styled.h2`
  font-size: 1.5 rem;
  // font-weight: bold;
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 2.5px;
  }
`;

const Position = styled.p`
  font-size: 1.2rem;
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 2.5px;
  }
`;

const Team = styled.p`
  font-size: 1.2rem;
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 2.5px;
  }
`;

const Points = styled.p`
  font-size: 1.2rem;
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 2.5px;
  }
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
        <Image src={imageUrl} alt={`${name} - MVP`} />
      </ImageContainer>

      <InfoContainer>
        <Name>{name}</Name>
        <Position>Position: {position}</Position>
        <Team>Team: {team}</Team>
        <Points>Points: {points}</Points>
      </InfoContainer>
    </Card>
  );
};

export default PlayerCard;
