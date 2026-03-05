import React from "react";
import { useMVPForecastQuery } from "../../hooks/useMVPForecastQuery";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import {
  Container,
  SectionTitle,
  ForecastGrid,
  ForecastCard,
  RankBadge,
  PlayerInfo,
  Avatar,
  NameSection,
  Name,
  Team,
  StatsRow,
  StatItem,
  StatValue,
  StatLabel,
  ProbabilitySection,
  ProbLabelRow,
  ProbLabel,
  ProbValue,
  ProgressBase,
  ProgressFill,
} from "./MVPForecast.styled";

const MVPForecast: React.FC = () => {
  const { data, isLoading, isError } = useMVPForecastQuery();

  if (isLoading) return <LoadingPlaceholder />;
  if (isError || !data) return null;

  return (
    <Container>
      <SectionTitle>MVP Forecast 2025/26</SectionTitle>
      <ForecastGrid>
        {data.map((candidate, index) => (
          <ForecastCard
            key={candidate.PLAYER_ID}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <RankBadge $rank={index + 1}>#{index + 1}</RankBadge>
            <PlayerInfo>
              <Avatar
                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${candidate.PLAYER_ID}.png`}
                alt={candidate.PLAYER}
              />
              <NameSection>
                <Name>{candidate.PLAYER}</Name>
                <Team>
                  {candidate.TEAM} • {candidate.WIN_PCT}% Win
                </Team>
              </NameSection>
            </PlayerInfo>

            <StatsRow>
              <StatItem>
                <StatValue>{candidate.PTS}</StatValue>
                <StatLabel>PTS</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{candidate.REB}</StatValue>
                <StatLabel>REB</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{candidate.AST}</StatValue>
                <StatLabel>AST</StatLabel>
              </StatItem>
            </StatsRow>

            <ProbabilitySection>
              <ProbLabelRow>
                <ProbLabel>MVP Probability</ProbLabel>
                <ProbValue>{candidate.PROBABILITY}%</ProbValue>
              </ProbLabelRow>
              <ProgressBase>
                <ProgressFill
                  $percent={candidate.PROBABILITY}
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.PROBABILITY}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                />
              </ProgressBase>
            </ProbabilitySection>
          </ForecastCard>
        ))}
      </ForecastGrid>
    </Container>
  );
};

export default MVPForecast;
