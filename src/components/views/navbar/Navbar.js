import React, { useRef, useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";
// HOOK
import useScrollNavigationDetect from "hooks/useScrollNavigationDetect";
// COMPONENNTS
import HamburgerButton from "./HamburgerButton";
import Menu from "./Menu";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import AuthPanelIcons from "./AuthPanelIcons";
// REDUX STUFF
import { useSelector } from "react-redux";

const StyledWrapper = styled.header`
  width: 100vw;
  height: 10vh;
  border-bottom: 1px solid grey;
  margin-bottom: 50px;
  background: ${theme.colors.whiteish};
  transform-origin: 50% 0%;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  &.hidden {
    transform: translateY(-160%);
  }
  &.active {
    background: #fff;
    transform: translateY(0);
  }
`;
const StyledNavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  padding: 0 30px;
`;

const Navbar = () => {
  const NavbarRef = useRef(null);
  const [openMenu, toggleMenuOpen] = useState(false);
  const auth = useSelector((state) => state.user.auth);
  useScrollNavigationDetect(NavbarRef, toggleMenuOpen);
  return (
    <StyledWrapper ref={NavbarRef}>
      {openMenu && <Menu toggleMenuOpen={toggleMenuOpen} />}
      <StyledNavigationWrapper>
        <Logo as={Link} to="/" onClick={() => toggleMenuOpen(false)}>
          LOGO
        </Logo>
        {auth && <AuthPanelIcons />}
        <HamburgerButton openMenu={openMenu} toggleMenuOpen={toggleMenuOpen} />
      </StyledNavigationWrapper>
      <SearchInput />
    </StyledWrapper>
  );
};

export default Navbar;
