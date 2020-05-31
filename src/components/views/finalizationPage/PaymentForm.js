import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Paypal from "./Paypal";
import PrevButton from "./PrevButton";

const StyledWrapper = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease-in-out;
  ${({ nonVisible }) =>
    nonVisible &&
    css`
      pointer-events: none;
      opacity: 0;
    `};
`;
const StyledTitle = styled.h3`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 30px;
`;
const StyledButtonsWrapper = styled.div`
  margin-top: 30px;
  align-self: flex-start;
`;

const PaymentForm = ({ prevStep, nonVisible }) => {
  return (
    <StyledWrapper nonVisible={nonVisible}>
      <StyledTitle>Payment form</StyledTitle>
      <Paypal />
      <StyledButtonsWrapper>
        <PrevButton prevStep={prevStep} />
      </StyledButtonsWrapper>
    </StyledWrapper>
  );
};

PaymentForm.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nonVisible: PropTypes.bool.isRequired,
};

export default PaymentForm;
