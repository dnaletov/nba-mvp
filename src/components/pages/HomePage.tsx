import { useState } from "react";
import { useStatLeadersQuery } from "../../hooks/useStatLeadersQuery";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerGrid from "../organisms/PlayerGrid";
import { TPPlayer, TPRawPlayerStats } from "../../types/players";
import { InnerContent, StatSelector, Wrapper } from "./HomePage.styled";
import { Button } from "../atoms/Button";
import PlayerStatsPopup from "../organisms/PlayerStatsPopup";
import { usePlayersQuery } from "../../hooks/usePlayersQuery";

interface TPStatLeadersData {
  players: TPRawPlayerStats[];
}

const mapPlayerFromStats = (raw: TPRawPlayerStats): TPPlayer => ({
  id: raw.PLAYER_ID,
  name: raw.PLAYER,
  imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${raw.PLAYER_ID}.png`,
});

const categories = [
  { key: "points", label: "Points" },
  { key: "rebounds", label: "Rebounds" },
  { key: "assists", label: "Assists" },
  { key: "steals", label: "Steals" },
  { key: "blocks", label: "Blocks" },
] as const;

type StatType = (typeof categories)[number]["key"];

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

  const playersData = data as TPStatLeadersData | undefined;

  return (
    <Wrapper>
      <InnerContent>
        <StatSelector>
          {categories.map((c) => (
            <Button
              key={c.key}
              onClick={() => setSelectedStat(c.key)}
              disabled={selectedStat === c.key}
            >
              {c.label}
            </Button>
          ))}
        </StatSelector>

        {isLoading && <LoadingPlaceholder />}
        {isError && <p>Error</p>}

        {playersData && (
          <PlayerGrid
            players={playersData.players.map(mapPlayerFromStats)}
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
