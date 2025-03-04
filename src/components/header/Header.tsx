import React from "react";
import styled from "styled-components";
import logo from "../../assets/basketball-ball-svgrepo-com.svg";
import Links from "../links/Links";

const HeaderWrapper = styled.header`
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

const Logo = styled.div`
  cursor: pointer;
  img {
    width: 30px;
  }
`;

const Nav = styled.nav`
  flex-grow: 1;
`;

const List = styled.ul`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Links to="/">
        <Logo>
          <img src={logo} alt="MVP Leaderboard Logo" />
        </Logo>
      </Links>
      <Nav>
        <List>
          <Links to="/about">About</Links>
          <Links to="/contacts">Contacts</Links>
        </List>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
