import React from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import Button from "components/atoms/Button";

import { ReactComponent as ArrowIcon } from "assets/icons/simpleRightArrow.svg";
const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  font-weight: 300;
  height: 30px;
  font-size: 10px !important;
  transition: all 0.3s ease-in-out;
  svg {
    width: 10px;
    margin-left: 5px;
    path {
      fill: ${theme.colors.whiteish};
    }
  }
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`;

const NextButton = ({ nextStep, disabled }) => {
  return (
    <StyledButton disabled={disabled} black onClick={nextStep}>
      <span>NEXT</span>
      <ArrowIcon />
    </StyledButton>
  );
};

NextButton.propTypes = {
  nextStep: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default NextButton;
