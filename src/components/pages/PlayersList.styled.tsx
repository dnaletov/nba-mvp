import styled from "styled-components";

export const Wrapper = styled.section`
  min-height: 100vh;
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
