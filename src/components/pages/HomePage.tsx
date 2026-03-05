import { useState } from "react";
import { useStatLeadersQuery } from "../../hooks/useStatLeadersQuery";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerGrid from "../organisms/PlayerGrid";
import { TPPlayer, TPRawPlayerStats } from "../../types/players";
import { InnerContent, StatSelector, Wrapper, Title } from "./HomePage.styled";
import { Button } from "../atoms/Button";
import PlayerStatsPopup from "../organisms/PlayerStatsPopup";
import { usePlayersQuery } from "../../hooks/usePlayersQuery";
import { StatType } from "../../services/nbaApi";

const mapPlayerFromStats = (raw: TPRawPlayerStats): TPPlayer => ({
  id: raw.PLAYER_ID,
  name: raw.PLAYER,
  imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${raw.PLAYER_ID}.png`,
});

const categories: { key: StatType; label: string }[] = [
  { key: "points", label: "Points" },
  { key: "rebounds", label: "Rebounds" },
  { key: "assists", label: "Assists" },
  { key: "steals", label: "Steals" },
  { key: "blocks", label: "Blocks" },
];

const HomePage: React.FC = () => {
  const {
    selectedPlayer,
    setSelectedPlayer,
    playerStats,
    isLoadingStats,
    handleCardClick,
  } = usePlayersQuery();
  const [selectedStat, setSelectedStat] = useState<StatType>("points");
  const { data, isLoading, isError } = useStatLeadersQuery(selectedStat);

  return (
    <Wrapper>
      <InnerContent>
        <Title>NBA leaders for the 2025/26 season</Title>
        <StatSelector>
          {categories.map((c) => (
            <Button
              key={c.key}
              onClick={() => setSelectedStat(c.key)}
              disabled={false}
              active={selectedStat === c.key}
            >
              {c.label}
            </Button>
          ))}
        </StatSelector>

        {isLoading && <LoadingPlaceholder />}
        {isError && <p>Error loading leaders</p>}

        {data && (
          <PlayerGrid
            players={data.map(mapPlayerFromStats)}
            onClick={handleCardClick}
            variant="card"
          />
        )}
      </InnerContent>
      <PlayerStatsPopup
        player={selectedPlayer}
        stats={playerStats}
        isLoading={isLoadingStats}
        onClose={() => setSelectedPlayer(null)}
      />
    </Wrapper>
  );
};

export default HomePage;
