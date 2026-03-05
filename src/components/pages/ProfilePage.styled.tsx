import styled from "styled-components";

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-main);
  background-color: var(--bg-dark);
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(23, 64, 139, 0.05) 0%,
    transparent 60%
  );
  height: 100vh;
  padding: 24px;
`;

export const Button = styled.button`
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  background: var(--primary);
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(201, 8, 42, 0.3);

  &:hover {
    transform: translateY(-2px);
    background: var(--accent);
    box-shadow: 0 8px 20px rgba(201, 8, 42, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TextContainer = styled.p`
  margin-top: 24px;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-main);
  min-height: 40px;
`;
