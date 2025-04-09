import { useState } from "react";
import { useStatLeadersQuery } from "../../hooks/useStatLeadersQuery";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerGrid from "../organisms/PlayerGrid";
import { TPPlayer, TPRawPlayerStats } from "../../types/players";
import { InnerContent, StatSelector, Wrapper } from "./HomePage.styled";
import { Button } from "../atoms/Button";

interface TPStatLeadersData {
  players: TPRawPlayerStats[];
}

const mapPlayerFromStats = (raw: TPRawPlayerStats): TPPlayer => ({
  id: raw.PLAYER_ID,
  name: raw.PLAYER,
  imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${raw.PLAYER_ID}.png`,
});

const categories: {
  key: "points" | "rebounds" | "assists" /*| "steals" | "blocks"*/;
  label: string;
}[] = [
  { key: "points", label: "Points" },
  { key: "rebounds", label: "Rebounds" },
  { key: "assists", label: "Assists" },
  // { key: "steals", label: "Перехваты" },
  // { key: "blocks", label: "Блоки" },
] as const;

type StatType = (typeof categories)[number]["key"];

const HomePage: React.FC = () => {
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
            onClick={() => {}}
            variant="card"
          />
        )}
      </InnerContent>
    </Wrapper>
  );
};

export default HomePage;
