import styled from "styled-components";
import PlayerCard from "../molecules/PlayerCard";
import Popup from "../atoms/Popup";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerStat from "../molecules/PlayerStat";
import SearchInput from "../atoms/SearchInput";
import { usePlayers } from "../../hooks/usePlayers";

const PlayersListWrapper = styled.section`
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

const PlayersContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 800px;
  gap: 24px;
  padding: 24px;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);

    & > :first-child {
      grid-column: span 2;
      width: 100%;
    }
  }
`;

const PlayersList: React.FC = () => {
  const {
    players,
    selectedPlayer,
    playerStats,
    isLoadingStats,
    isFetchingMore,
    search,
    setSearch,
    handleCardClick,
    setSelectedPlayer,
  } = usePlayers();

  return (
    <PlayersListWrapper>
      <InnerContent>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PlayersContainer>
          {players.length > 0 ? (
            players.map((player) => (
              <PlayerCard
                variant="list"
                key={player.id}
                {...player}
                onClick={() => handleCardClick(player)}
              />
            ))
          ) : (
            <p>No players available</p>
          )}
        </PlayersContainer>
      </InnerContent>
      {selectedPlayer && (
        <Popup onClose={() => setSelectedPlayer(null)}>
          {isLoadingStats ? (
            <LoadingPlaceholder />
          ) : playerStats ? (
            <PlayerStat {...selectedPlayer} {...playerStats} />
          ) : (
            <p>No stats available</p>
          )}
        </Popup>
      )}
      {isFetchingMore && <LoadingPlaceholder />}
    </PlayersListWrapper>
  );
};

export default PlayersList;
