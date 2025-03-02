import React from "react";
import styled from "styled-components";
import logo from "../../assets/basketball-ball-svgrepo-com.svg";
import AnimatedLink from "../animatedLink/AnimatedLink";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #2d3748;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  max-width: 100%;
  box-sizing: border-box;
  a {
    color: white;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const List = styled.ul`
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: flex-end;
`;

const ListItem = styled.li`
  flex-shrink: 0;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <AnimatedLink to="/">
        <Logo>
          <img src={logo} alt="MVP Leaderboard Logo" />
        </Logo>
      </AnimatedLink>
      <Nav>
        <List>
          <ListItem>
            <AnimatedLink to="/about">About</AnimatedLink>
          </ListItem>
          <ListItem>
            <AnimatedLink to="/contacts">Contacts</AnimatedLink>
          </ListItem>
        </List>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
