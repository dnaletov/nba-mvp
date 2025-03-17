import React, { useState } from "react";
import styled from "styled-components";
import Popup from "../popup/Popup";

interface Player {
  name: string;
  position: string;
  team: string;
  points: number;
  imageUrl: string;
}

const Card = styled.div`
  display: flex;
  background-color: #2d3748;
  border-radius: 10px;
  padding: 24px;
  max-width: 800px;
  min-width: 320px;
  align-items: center;

  &:first-child {
    background-color: #1a202c; /* Темнее для первого элемента */
  }
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
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  color: white;
  margin: 5px;
`;

const Name = styled.h2`
  font-size: 1rem;
  margin: 2px;

  ${Card}:first-child & {
    font-size: 1.5rem;
    margin: 5px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 2.5px;
  }
`;

const Position = styled.p`
  font-size: 0.8rem;
  margin: 2px;

  ${Card}:first-child & {
    font-size: 1.2rem;
    margin: 5px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Team = styled.p`
  font-size: 0.8rem;
  margin: 2px;

  ${Card}:first-child & {
    font-size: 1.2rem;
    margin: 5px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Points = styled.p`
  font-size: 0.8rem;
  margin: 2px;

  ${Card}:first-child & {
    font-size: 1.2rem;
    margin: 5px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PlayerCard: React.FC<Player> = ({
  name,
  position,
  team,
  points,
  imageUrl,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openClosePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Card onClick={openClosePopup}>
      <ImageContainer>
        <Image src={imageUrl} alt={`${name} - MVP`} />
      </ImageContainer>

      <InfoContainer>
        <Name>{name}</Name>
        <Team>Team: {team}</Team>
        <Position>Position: {position}</Position>
        <Points>Points: {points}</Points>
      </InfoContainer>
      {isPopupOpen && <Popup onClose={openClosePopup} />}
    </Card>
  );
};

export default PlayerCard;
