import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Title>NBA leaders for the 2025/26 season</Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <StatSelector>
            {categories.map((c) => (
              <Button
                key={c.key}
                onClick={() => setSelectedStat(c.key)}
                active={selectedStat === c.key}
              >
                {c.label}
              </Button>
            ))}
          </StatSelector>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingPlaceholder />
            </motion.div>
          ) : isError ? (
            <motion.p
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: "var(--primary)", marginTop: "20px" }}
            >
              Error loading leaders
            </motion.p>
          ) : (
            <motion.div
              key={selectedStat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%" }}
            >
              {data && (
                <PlayerGrid
                  players={data.map(mapPlayerFromStats)}
                  onClick={handleCardClick}
                  variant="card"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
