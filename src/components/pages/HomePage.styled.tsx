import styled from "styled-components";

export const Wrapper = styled.section`
  min-height: 100vh;
  background-color: var(--bg-dark);
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(201, 8, 42, 0.05) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(23, 64, 139, 0.05) 0%,
      transparent 40%
    );
  overflow-y: auto;
  padding-bottom: 4rem;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -1.5px;
  color: #fff;
  margin-top: 64px;
  text-align: center;
  line-height: 1;
  background: linear-gradient(to bottom, #fff 0%, #a0aec0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 40px;
  }
`;

export const StatSelector = styled.div`
  margin: 40px 0;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    gap: 8px;
    padding: 6px;
  }
`;
