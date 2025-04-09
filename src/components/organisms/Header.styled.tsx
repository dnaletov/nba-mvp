import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #2d3748;
  width: 100%;
  position: fixed;
  a {
    color: white;
  }
`;

export const Logo = styled.div`
  cursor: pointer;
  img {
    width: 30px;
  }
`;

export const Nav = styled.nav`
  flex-grow: 1;
`;

export const List = styled.ul`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
`;
