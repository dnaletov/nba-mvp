import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 32px auto;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 16px 0;
  }
`;
