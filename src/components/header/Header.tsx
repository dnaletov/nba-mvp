import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/basketball-ball-svgrepo-com.svg';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  background-color: #2d3748;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  max-width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    width: 40px;
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
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo>
          <img src={logo} alt="MVP Leaderboard Logo" />
        </Logo>
      </Link>
      <Nav>
        <List>
          <ListItem>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/about">About</Link>
            </motion.div>
          </ListItem>
          <ListItem>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/contacts">Contacts</Link>
            </motion.div>
          </ListItem>
          {/* <ListItem>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/something">Add_new_page</Link>
            </motion.div>
          </ListItem> */}
        </List>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
