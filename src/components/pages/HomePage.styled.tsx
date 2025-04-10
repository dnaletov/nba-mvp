import styled from "styled-components";

export const Wrapper = styled.section`
  min-height: 100vh;
  // padding: 46px;
  background-color: rgb(182, 182, 182);
  overflow-y: auto;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const StatSelector = styled.div`
  margin: 12px;
  display: flex;
  gap: 12px;
`;
