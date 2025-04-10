import styled from "styled-components";

export const Card = styled.div<{ $variant: "card" | "list" }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 24px;
  background-color: #2d3748;
  position: relative;

  ${({ $variant }) =>
    $variant === "card"
      ? `
    max-width: 800px;
    min-width: 320px;
  `
      : `
    width: 100%;
    padding: 8px;
  `};
`;

export const Image = styled.img<{ $variant: "card" | "list" }>`
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

export const InfoContainer = styled.div`
  flex: 1;
  color: white;
  margin-left: 16px;
`;

export const Name = styled.h2<{ $variant: "card" | "list" }>`
  margin: 2px;
  font-size: ${({ $variant }) => ($variant === "card" ? "1.5rem" : "1rem")};

  @media (max-width: 768px) {
    font-size: ${({ $variant }) => ($variant === "card" ? "1.2rem" : "0.9rem")};
  }
`;

export const PositionLabel = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #1a202c;
  padding: 4px 8px;
  border-radius: 6px;
`;

export const TrophyIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const PositionText = styled.span`
  font-size: 1rem;
  color: #ffd700;
  font-weight: bold;
`;
