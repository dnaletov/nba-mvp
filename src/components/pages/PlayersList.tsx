import { useEffect } from "react";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
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
        <SearchBar value={search} onChange={setSearch} />
        {players.length === 0 ? (
          <LoadingIndicator />
        ) : (
          <PlayerGrid
            players={players}
            onClick={handleCardClick}
            variant={"list"}
          />
        )}
      </InnerContent>

      <PlayerStatsPopup
        player={selectedPlayer}
        stats={playerStats}
        isLoading={isLoadingStats}
        onClose={() => setSelectedPlayer(null)}
      />
      {/* {isFetchingNextPage && <LoadingPlaceholder />} */}
    </Wrapper>
  );
};

export default PlayersList;
