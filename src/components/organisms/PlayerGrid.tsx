import PlayerCard from "../molecules/PlayerCard";
import { TPPlayer } from "../../types/players";
import { Grid } from "./PlayerGrid.styled";

interface TPPlayerGrid {
  players: TPPlayer[];
  onClick: (player: TPPlayer) => void;
  variant: "card" | "list";
}

const PlayerGrid: React.FC<TPPlayerGrid> = ({ players, onClick, variant }) => {
  if (players.length === 0) {
    return <p>No players available</p>;
  }

  return (
    <Grid>
      {players.map((player) => (
        <PlayerCard
          variant={variant}
          key={player.id}
          {...player}
          onClick={() => onClick(player)}
        />
      ))}
    </Grid>
  );
};

export default PlayerGrid;
