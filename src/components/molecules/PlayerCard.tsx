import { Card, Image, InfoContainer, Name } from "./PlayerCard.styled";

interface TPlayerCard {
  name: string;
  imageUrl: string;
  onClick: () => void;
  variant: "card" | "list";
}

const PlayerCard: React.FC<TPlayerCard> = ({
  name,
  imageUrl,
  onClick,
  variant,
}) => {
  return (
    <Card $variant={variant} onClick={onClick}>
      <Image $variant={variant} src={imageUrl} alt={`${name} - MVP`} />
      <InfoContainer>
        <Name $variant={variant}>{name}</Name>
      </InfoContainer>
    </Card>
  );
};

export default PlayerCard;
