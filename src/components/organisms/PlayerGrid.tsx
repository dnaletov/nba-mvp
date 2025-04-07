import styled from "styled-components";
import PlayerCard from "../molecules/PlayerCard";
import { Player } from "../../types/players";

const Grid = styled.div`
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

interface PlayerGridProps {
  players: Player[];
  onClick: (player: Player) => void;
}

const PlayerGrid: React.FC<PlayerGridProps> = ({ players, onClick }) => {
  if (players.length === 0) {
    return <p>No players available</p>;
  }

  return (
    <Grid>
      {players.map((player) => (
        <PlayerCard
          variant="list"
          key={player.id}
          {...player}
          onClick={() => onClick(player)}
        />
      ))}
    </Grid>
  );
};

export default PlayerGrid;
