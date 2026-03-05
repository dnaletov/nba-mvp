import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlayerGrid from "../organisms/PlayerGrid";
import PlayerStatsPopup from "../organisms/PlayerStatsPopup";
import { usePlayersQuery } from "../../hooks/usePlayersQuery";
import SearchBar from "../molecules/SearchBar";
import { InnerContent, Wrapper } from "./PlayersList.styled";
import LoadingIndicator from "../atoms/LoadingIndicator";

const PlayersList: React.FC = () => {
  const {
    players,
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
    search,
    setSearch,
    selectedPlayer,
    setSelectedPlayer,
    handleCardClick,
    playerStats,
    isLoadingStats,
  } = usePlayersQuery();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight * 0.95 &&
        hasMore &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isFetchingNextPage, fetchNextPage]);

  return (
    <Wrapper>
      <InnerContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <SearchBar value={search} onChange={setSearch} />
        </motion.div>

        <AnimatePresence mode="wait">
          {players.length === 0 && !isFetchingNextPage ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "40px" }}
            >
              <LoadingIndicator />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: "100%" }}
            >
              <PlayerGrid
                players={players}
                onClick={handleCardClick}
                variant={"list"}
              />
              {isFetchingNextPage && (
                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LoadingIndicator />
                </div>
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

export default PlayersList;
