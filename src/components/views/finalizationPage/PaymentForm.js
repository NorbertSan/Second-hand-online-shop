import React from "react";
import styled, { css } from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
// COMP
import Paypal from "./Paypal";
import PrevButton from "./PrevButton";
// REDUX
import { useDispatch } from "react-redux";
import { REMOVE_SHOPPING_LIST } from "redux/types";

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

const PaymentForm = ({ prevStep, nonVisible, addressData, recipientData }) => {
  const { product_id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const createOrder = async (payment) => {
    try {
      await axios.post("/payment", {
        paymentData: payment,
        recipientData,
        product_id,
        addressData,
      });
      dispatch({ type: REMOVE_SHOPPING_LIST, payload: product_id });
      history.push("/account/purchases");
      return;
    } catch (err) {
      console.error(err);
      return;
    }
  };
  return (
    <StyledWrapper nonVisible={nonVisible}>
      <StyledTitle>Payment form</StyledTitle>
      <Paypal createOrder={createOrder} />
      <StyledButtonsWrapper>
        <PrevButton prevStep={prevStep} />
      </StyledButtonsWrapper>
    </StyledWrapper>
  );
};

PaymentForm.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nonVisible: PropTypes.bool.isRequired,
  addressData: PropTypes.object.isRequired,
  recipientData: PropTypes.object.isRequired,
};

export default PaymentForm;
