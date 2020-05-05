import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import theme from "utils/theme";

// ICONS
import WomenIcon from "assets/icons/women.svg";
import KidIcon from "assets/icons/kid.svg";
import ManIcon from "assets/icons/man.svg";
import Button from "components/atoms/Button";

const appear = keyframes`
  0%{
    transform:translateY(-50px);
  }
  50%{
    transform:translateY(5px);
  }
  100%{
    transform:translateY(0);
  }
`;

const StyledMenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: fixed;
  top: 0;
  left: 0;
  background: ${theme.colors.whiteish};
  z-index: 999;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 15px 15px 15px;
  animation: ${appear} 0.4s ease forwards;
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;
const StyledCategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${theme.colors.secondary};
  align-self: start;
  width: 100%;
  h4 {
    color: grey;
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  padding: 17px;
  border-bottom: 1px solid ${theme.colors.secondary};
  span {
    font-weight: bold;
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSize.s};
  }
`;
const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Menu = ({ toggleMenuOpen }) => (
  <StyledBackground>
    <StyledMenuList>
      <StyledButton as={Link} to="/sell" onClick={() => toggleMenuOpen(false)}>
        Sell now
      </StyledButton>
      <StyledButton
        as={Link}
        to="/signup/select_type"
        onClick={() => toggleMenuOpen(false)}
        secondary
      >
        Sign up | Sign in
      </StyledButton>
      <StyledCategoryList>
        <h4>Category</h4>
        <StyledLink to="/women" onClick={() => toggleMenuOpen(false)}>
          <StyledIcon src={WomenIcon} alt="woman icon" />
          <span>Women</span>
        </StyledLink>
        <StyledLink to="/men" onClick={() => toggleMenuOpen(false)}>
          <StyledIcon src={ManIcon} alt="man icon" />
          <span>Men</span>
        </StyledLink>
        <StyledLink to="/kids" onClick={() => toggleMenuOpen(false)}>
          <StyledIcon src={KidIcon} alt="kid icon" />
          <span>Kid</span>
        </StyledLink>
      </StyledCategoryList>
    </StyledMenuList>
  </StyledBackground>
);

export default Menu;
