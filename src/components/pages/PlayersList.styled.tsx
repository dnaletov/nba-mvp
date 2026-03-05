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
  margin: 0 auto;
  padding: 0 24px;
`;
