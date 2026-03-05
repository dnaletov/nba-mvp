import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 24px;
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -1.5px;
  color: #fff;
  margin: 64px 0;
  text-align: center;
  line-height: 1;
  background: linear-gradient(to bottom, #fff 0%, #a0aec0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 40px 0;
  }
`;

export const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const ForecastCard = styled(motion.div)`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle at top right,
      rgba(201, 8, 42, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const RankBadge = styled.div<{ $rank: number }>`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: ${({ $rank }) =>
    $rank === 1 ? "var(--primary)" : "rgba(255, 255, 255, 0.1)"};
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  box-shadow: ${({ $rank }) =>
    $rank === 1 ? "0 0 15px rgba(201, 8, 42, 0.4)" : "none"};
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-dark);
  border: 2px solid var(--border-color);
  object-fit: cover;
`;

export const NameSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const Team = styled.span`
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatValue = styled.span`
  font-family: var(--font-heading);
  font-weight: 700;
  color: #fff;
  font-size: 1.1rem;
`;

export const StatLabel = styled.span`
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

export const ProbabilitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProbLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProbLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProbValue = styled.span`
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 800;
`;

export const ProgressBase = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressFill = styled(motion.div)<{ $percent: number }>`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  width: ${({ $percent }) => $percent}%;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(201, 8, 42, 0.3);
`;
