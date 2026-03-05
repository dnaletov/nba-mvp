import styled from "styled-components";

export const Card = styled.div<{ $variant: "card" | "list" }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;
  padding: ${({ $variant }) => ($variant === "card" ? "32px" : "12px")};
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    img {
      transform: scale(1.1);
      border-color: var(--primary);
    }
  }
`;

export const Image = styled.img<{ $variant: "card" | "list" }>`
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border-color);
  transition: all 0.4s ease;
  background: var(--bg-dark);

  ${({ $variant }) =>
    $variant === "card"
      ? `
    width: 100px;
    height: 100px;
  `
      : `
    width: 48px;
    height: 48px;
  `}

  @media (max-width: 768px) {
    ${({ $variant }) =>
      $variant === "card"
        ? `
    width: 80px;
    height: 80px;
  `
        : `
    width: 40px;
    height: 40px;
  `}
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  color: var(--text-main);
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.h2<{ $variant: "card" | "list" }>`
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  font-size: ${({ $variant }) => ($variant === "card" ? "1.25rem" : "0.9rem")};
  line-height: 1.2;
  color: #fff;

  @media (max-width: 768px) {
    font-size: ${({ $variant }) =>
      $variant === "card" ? "1.1rem" : "0.85rem"};
  }
`;

export const PositionLabel = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
`;

export const TrophyIcon = styled.img`
  width: 14px;
  height: 14px;
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5));
`;

export const PositionText = styled.span`
  font-size: 0.75rem;
  color: #ffd700;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
