import styled from "styled-components";
import { useState } from "react";
import { useStatLeadersQuery } from "../../hooks/useStatLeadersQuery";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerGrid from "../organisms/PlayerGrid";
import { Player, RawPlayerStats } from "../../types/players";

const Wrapper = styled.section`
  min-height: 100vh;
  padding: 46px;
  background-color: rgb(182, 182, 182);
  overflow-y: auto;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const StatSelector = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  button {
    padding: 8px 16px;
    background: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;

    &.active {
      background: #000;
      color: white;
    }
  }
`;

interface StatLeadersData {
  players: RawPlayerStats[];
}

const mapPlayerFromStats = (raw: RawPlayerStats): Player => ({
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

  const playersData = data as StatLeadersData | undefined;

  return (
    <Wrapper>
      <InnerContent>
        <StatSelector>
          {categories.map((c) => (
            <button key={c.key} onClick={() => setSelectedStat(c.key)}>
              {c.label}
            </button>
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
