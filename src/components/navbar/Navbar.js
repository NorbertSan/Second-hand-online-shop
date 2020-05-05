import React, { useRef, useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";

import useScrollNavigationDetect from "hooks/useScrollNavigationDetect";
// COMPONENNTS
import HamburgerButton from "./HamburgerButton";
import DropDownSearch from "./DropDownSearch";
import Menu from "./Menu";
import SearchInput from "./SearchInput";
import Logo from "components/atoms/Logo";

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
const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background: ${theme.colors.whiteish};
`;

const Navbar = () => {
  const NavbarRef = useRef(null);
  const [openMenu, toggleMenuOpen] = useState(false);
  useScrollNavigationDetect(NavbarRef, toggleMenuOpen);
  return (
    <StyledWrapper ref={NavbarRef}>
      {openMenu && <Menu toggleMenuOpen={toggleMenuOpen} />}
      <StyledNavigationWrapper>
        <Logo as={Link} to="/" onClick={() => toggleMenuOpen(false)}>
          LOGO
        </Logo>
        <HamburgerButton openMenu={openMenu} toggleMenuOpen={toggleMenuOpen} />
      </StyledNavigationWrapper>
      <StyledSearchWrapper>
        <DropDownSearch />
        <SearchInput />
      </StyledSearchWrapper>
    </StyledWrapper>
  );
};

export default Navbar;
