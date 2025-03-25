import styled from "styled-components";

interface TPlayerCard {
  name: string;
  imageUrl: string;
  onClick?: () => void;
  variant?: "card" | "list";
}

const Card = styled.div<{ $variant: "card" | "list" }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 24px;
  background-color: #2d3748;

  ${({ $variant }) =>
    $variant === "card"
      ? `
    max-width: 800px;
    min-width: 320px;
  `
      : `
    width: 100%;
    padding: 8px;
  `}
`;

const Image = styled.img<{ $variant: "card" | "list" }>`
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;

  ${({ $variant }) =>
    $variant === "card"
      ? `
    width: 150px;
    height: 150px;
  `
      : `
    width: 50px;
    height: 50px;
  `}

  @media (max-width: 768px) {
    ${({ $variant }) =>
      $variant === "card"
        ? `
    width: 130px;
    height: 130px;
  `
        : `
    width: 40px;
    height: 40px;
  `}
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  color: white;
  margin-left: 16px;
`;

const Name = styled.h2<{ $variant: "card" | "list" }>`
  margin: 2px;
  font-size: ${({ $variant }) => ($variant === "card" ? "1.5rem" : "1rem")};

  @media (max-width: 768px) {
    font-size: ${({ $variant }) => ($variant === "card" ? "1.2rem" : "0.9rem")};
  }
`;

const PlayerCard: React.FC<TPlayerCard> = ({
  name,
  imageUrl,
  onClick,
  variant = "list",
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
