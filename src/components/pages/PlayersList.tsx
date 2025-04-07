import styled from "styled-components";
import { useEffect } from "react";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerGrid from "../organisms/PlayerGrid";
import PlayerStatsPopup from "../organisms/PlayerStatsPopup";
import { usePlayersQuery } from "../../hooks/usePlayersQuery";
import SearchBar from "../molecules/SearchBar";

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
        <PlayerGrid players={players} onClick={handleCardClick} />
      </InnerContent>

      <PlayerStatsPopup
        player={selectedPlayer}
        stats={playerStats}
        isLoading={isLoadingStats}
        onClose={() => setSelectedPlayer(null)}
      />

      {isFetchingNextPage && <LoadingPlaceholder />}
    </Wrapper>
  );
};

export default PlayersList;
