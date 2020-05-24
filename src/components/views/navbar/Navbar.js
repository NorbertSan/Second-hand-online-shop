import React, { useRef, useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import LogoIcon from "assets/images/logo.png";
// HOOK
import useScrollNavigationDetect from "hooks/useScrollNavigationDetect";
// COMPONENNTS
import HamburgerButton from "./HamburgerButton";
import Menu from "./Menu";
import SearchInput from "./SearchInput";
import AuthPanelIcons from "./AuthPanelIcons";
// REDUX STUFF
import { useSelector } from "react-redux";
// SCROLL STUFFS
import Scroll from "react-scroll";
const scroll = Scroll.animateScroll;

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
  z-index: 7;

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
const StyledLogo = styled.div`
  width: 45px;
  z-index: 20;
  display: block;
  img {
    width: 100%;
  }
`;

const Navbar = () => {
  const NavbarRef = useRef(null);
  const [openMenu, toggleMenuOpen] = useState(false);
  const auth = useSelector((state) => state.user.auth);
  useScrollNavigationDetect(NavbarRef, toggleMenuOpen);
  const handleLogoClick = () => {
    scroll.scrollToTop({ duration: 500 });
    toggleMenuOpen(false);
  };
  return (
    <StyledWrapper ref={NavbarRef}>
      {openMenu && <Menu toggleMenuOpen={toggleMenuOpen} />}
      <StyledNavigationWrapper>
        <StyledLogo as={Link} to="/" onClick={handleLogoClick}>
          <img src={LogoIcon} alt="logo" />
        </StyledLogo>
        {auth && <AuthPanelIcons />}
        <HamburgerButton openMenu={openMenu} toggleMenuOpen={toggleMenuOpen} />
      </StyledNavigationWrapper>
      <SearchInput />
    </StyledWrapper>
  );
};

export default Navbar;
