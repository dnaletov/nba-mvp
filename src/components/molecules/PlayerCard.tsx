import {
  Card,
  Image,
  InfoContainer,
  Name,
  PositionLabel,
  PositionText,
  TrophyIcon,
} from "./PlayerCard.styled";

interface TPlayerCard {
  name: string;
  imageUrl: string;
  onClick: () => void;
  variant: "card" | "list";
  position?: number;
}

const PlayerCard: React.FC<TPlayerCard> = ({
  name,
  imageUrl,
  onClick,
  variant,
  position,
}) => {
  return (
    <Card $variant={variant} onClick={onClick}>
      <Image $variant={variant} src={imageUrl} alt={`${name} - MVP`} />
      <InfoContainer>
        {variant === "card" && position !== undefined && (
          <PositionLabel>
            {position === 0 && (
              <TrophyIcon
                src="https://cdn-icons-png.flaticon.com/512/2583/2583343.png"
                alt="Trophy"
              />
            )}
            <PositionText>
              {position === 0 ? "1st place" : `${position + 1}`}
            </PositionText>
          </PositionLabel>
        )}
        <Name $variant={variant}>{name}</Name>
      </InfoContainer>
    </Card>
  );
};

export default PlayerCard;
