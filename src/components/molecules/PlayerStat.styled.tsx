import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  width: 100%;
  max-width: 800px;
  padding: 24px;
`;

export const Name = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -1px;
  color: #fff;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1;

  @media (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    z-index: -1;
    opacity: 0.5;
    filter: blur(8px);
  }
`;

export const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border-color);
  background: var(--bg-dark);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  @media (max-width: 767px) {
    width: 160px;
    height: 160px;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
`;

export const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

export const Value = styled.span`
  display: block;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
`;

export const TeamBadge = styled.div`
  grid-column: span 2;
  background: linear-gradient(90deg, var(--secondary), transparent);
  padding: 12px 20px;
  border-radius: 12px;
  border-left: 4px solid var(--primary);
  margin-bottom: 8px;

  font-family: var(--font-heading);
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.9rem;
`;
