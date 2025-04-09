import {
  Card,
  ContentWrapper,
  Image,
  InfoContainer,
  Name,
  Text,
} from "./PlayerStat.styled";

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
