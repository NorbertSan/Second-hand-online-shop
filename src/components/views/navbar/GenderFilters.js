import React from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// ICONS
import WomenIcon from "assets/icons/women.svg";
import KidIcon from "assets/icons/kid.svg";
import ManIcon from "assets/icons/man.svg";

const StyledCategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 40px 0 0 0;
  padding: 0;
  list-style: none;
  align-self: start;
  width: 100%;
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
  border-radius: 50%;
  ${({ big }) =>
    big &&
    css`
      padding: 5px;
      width: 40px;
      height: 40px;
    `}
`;

const GenderFilters = ({ toggleMenuOpen }) => {
  return (
    <StyledCategoryList>
      <StyledLink
        to={`/products?&gender=Women`}
        onClick={() => toggleMenuOpen(false)}
      >
        <StyledIcon src={WomenIcon} alt="woman icon" />
        <span>Women</span>
      </StyledLink>
      <StyledLink
        to={`/products?&gender=Man`}
        onClick={() => toggleMenuOpen(false)}
      >
        <StyledIcon src={ManIcon} alt="man icon" />
        <span>Man</span>
      </StyledLink>
      <StyledLink
        to={`/products?&gender=Kid`}
        onClick={() => toggleMenuOpen(false)}
      >
        <StyledIcon src={KidIcon} alt="kid icon" />
        <span>Kid</span>
      </StyledLink>
    </StyledCategoryList>
  );
};

GenderFilters.propTypes = {
  toggleMenuOpen: PropTypes.func.isRequired,
};

export default GenderFilters;
