import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";

const StyledWrapper = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ddd;
  ${({ active }) =>
    active &&
    css`
       {
        border-color: ${theme.colors.blackish};
        color: ${theme.colors.whiteish};
        background: rgba(27, 27, 47, 1);
      }
    `};
`;
const StyledConnectionLine = styled.div`
  flex: 1;
  height: 3px;
  background: #ddd;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: ${theme.colors.blackish};
    transform-origin: left;
    transition: all 1s ease-in-out;
    transform: scaleX(0);
    opacity: 0.4;
  }
  ${({ active }) =>
    active &&
    css`
       {
        &::after {
          transform: scaleX(1);
          transition: transform 0.5s ease-in-out;
          opacity: 1;
        }
      }
    `}
`;

const CirclesNavigation = ({ finalizationStep }) => {
  return (
    <StyledWrapper>
      <StyledCircle active>1</StyledCircle>
      <StyledConnectionLine active={finalizationStep > 1} />
      <StyledCircle active={finalizationStep > 1}>2</StyledCircle>
      <StyledConnectionLine active={finalizationStep > 2} />
      <StyledCircle active={finalizationStep > 2}>3</StyledCircle>
    </StyledWrapper>
  );
};

CirclesNavigation.propTypes = {
  finalizationStep: PropTypes.number.isRequired,
};

export default CirclesNavigation;
