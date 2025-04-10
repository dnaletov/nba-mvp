import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-top: 16px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Wrapper = styled.section`
  min-height: 100vh;
  background-color: rgb(182, 182, 182);
  overflow-y: auto;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatSelector = styled.div`
  margin: 12px;
  display: flex;
  gap: 12px;
`;
