import React from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";

const StyledWrapper = styled.button`
  width: 30px;
  height: 35px;
  background: none;
  outline: none;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  z-index: 9;
  div {
    transition: all 0.15s ease-in-out;
    width: 100%;
    height: 2px;
    background: ${theme.colors.blackish};
    margin: 5px 0;
  }
  ${({ openMenu }) =>
    openMenu &&
    css`
      div:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      div:nth-child(2) {
        opacity: 0;
      }
      div:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    `}
`;

const HamburgerButton = ({ openMenu, toggleMenuOpen }) => {
  return (
    <StyledWrapper
      onClick={() => toggleMenuOpen((prevState) => !prevState)}
      openMenu={openMenu}
    >
      <div />
      <div />
      <div />
    </StyledWrapper>
  );
};

HamburgerButton.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleMenuOpen: PropTypes.func.isRequired,
};

export default HamburgerButton;
