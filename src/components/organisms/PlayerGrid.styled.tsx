import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 32px;
  padding: 40px 0;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px 0;
  }
`;
