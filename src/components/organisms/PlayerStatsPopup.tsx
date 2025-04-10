import Popup from "../atoms/Popup";
import LoadingPlaceholder from "../atoms/LoadingIndicator";
import PlayerStat from "../molecules/PlayerStat";
import { TPPlayer } from "../../types/players";

interface PlayerStatsPopupProps {
  player: TPPlayer | null;
  stats: any;
  isLoading: boolean;
  onClose: () => void;
}

const PlayerStatsPopup: React.FC<PlayerStatsPopupProps> = ({
  player,
  stats,
  isLoading,
  onClose,
}) => {
  if (!player) return null;

  return (
    <Popup onClose={onClose}>
      {isLoading ? (
        <LoadingPlaceholder />
      ) : stats ? (
        <PlayerStat {...player} {...stats} />
      ) : (
        <p>No stats available</p>
      )}
    </Popup>
  );
};

export default PlayerStatsPopup;
