import styled from "styled-components";

interface TPlayerStat {
  name: string;
  age: number;
  team: string;
  points: number;
  assists: number;
  blocks: number;
  rebounds: number;
  imageUrl: string;
  onClick?: () => void;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d3748;
  border-radius: 10px;
  padding: 8px;
  max-width: 800px;
  min-width: 320px;
  text-align: center;
`;

const Name = styled.h2`
  font-size: 2rem;
  color: white;
  margin-bottom: 16px;

  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;

  @media (max-width: 767px) {
    width: 180px;
    height: 180px;
  }
`;

const InfoContainer = styled.div`
  color: white;
  text-align: left;
`;

const Text = styled.p`
  font-size: 1.8rem;
  margin: 4px;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const PlayerStat: React.FC<TPlayerStat> = ({
  name,
  imageUrl,
  team,
  age,
  points,
  assists,
  rebounds,
  blocks,
}) => {
  return (
    <Card>
      <Name>{name}</Name>
      <ContentWrapper>
        <Image src={imageUrl} alt={`${name} - MVP`} />
        <InfoContainer>
          <Text>Team: {team}</Text>
          <Text>Age: {age}</Text>
          <Text>Points: {points}</Text>
          <Text>Assists: {assists}</Text>
          <Text>Rebounds: {rebounds}</Text>
          <Text>Blocks: {blocks}</Text>
        </InfoContainer>
      </ContentWrapper>
    </Card>
  );
};

export default PlayerStat;
