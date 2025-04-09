import logo from "../../assets/basketball-ball-svgrepo-com.svg";
import Links from "../atoms/Links";
import { HeaderWrapper, List, Logo, Nav } from "./Header.styled";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Links to="/">
        <Logo>
          <img src={logo} alt="Logo" />
        </Logo>
      </Links>
      <Nav>
        <List>
          <Links to="/players">Players Info</Links>
          <Links to="/about">About</Links>
          <Links to="/contacts">Contacts</Links>
        </List>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
