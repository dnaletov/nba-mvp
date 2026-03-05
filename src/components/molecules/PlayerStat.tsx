import {
  Card,
  ContentWrapper,
  Image,
  InfoContainer,
  Name,
  StatBox,
  Label,
  Value,
  TeamBadge,
  ImageContainer,
} from "./PlayerStat.styled";

interface TPlayerStat {
  name: string;
  age: number;
  team: string;
  points: number;
  assists: number;
  blocks: number;
  rebounds: number;
  steals: number;
  imageUrl: string;
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
  steals,
}) => {
  return (
    <Card>
      <Name>{name}</Name>
      <ContentWrapper>
        <ImageContainer>
          <Image src={imageUrl} alt={name} />
        </ImageContainer>
        <InfoContainer>
          <TeamBadge>{team}</TeamBadge>
          <StatBox>
            <Label>Points</Label>
            <Value>{points}</Value>
          </StatBox>
          <StatBox>
            <Label>Assists</Label>
            <Value>{assists}</Value>
          </StatBox>
          <StatBox>
            <Label>Rebounds</Label>
            <Value>{rebounds}</Value>
          </StatBox>
          <StatBox>
            <Label>Blocks</Label>
            <Value>{blocks}</Value>
          </StatBox>
          <StatBox>
            <Label>Steals</Label>
            <Value>{steals}</Value>
          </StatBox>
          <StatBox>
            <Label>Age</Label>
            <Value>{age}</Value>
          </StatBox>
        </InfoContainer>
      </ContentWrapper>
    </Card>
  );
};

export default PlayerStat;
