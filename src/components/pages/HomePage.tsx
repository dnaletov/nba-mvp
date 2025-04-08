import { useState } from "react";
import { useStatLeadersQuery } from "../../hooks/useStatLeadersQuery";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerGrid from "../organisms/PlayerGrid";
import { Player, RawPlayerStats } from "../../types/players";

const mapPlayerFromStats = (raw: RawPlayerStats): Player => ({
  id: raw.PLAYER_ID,
  name: raw.PLAYER,
  imageUrl: `https://cdn.nba.com/headshots/nba/latest/1040x760/${raw.PLAYER_ID}.png`,
});

const categories = [
  { key: "points", label: "Очки" },
  { key: "rebounds", label: "Подборы" },
  { key: "assists", label: "Передачи" },
] as const;

type StatType = (typeof categories)[number]["key"];

const HomePage: React.FC = () => {
  const [stat, setStat] = useState<StatType>("points");
  const { data, isLoading, isError } = useStatLeadersQuery(stat);

  return (
    <section>
      <div>
        {categories.map((c) => (
          <button key={c.key} onClick={() => setStat(c.key)}>
            {c.label}
          </button>
        ))}
      </div>

      {isLoading && <LoadingPlaceholder />}
      {isError && <p>Ошибка при загрузке данных</p>}

      {data && (
        <PlayerGrid
          players={data.map(mapPlayerFromStats)}
          onClick={() => {}}
          variant="card"
        />
      )}
    </section>
  );
};

export default HomePage;
