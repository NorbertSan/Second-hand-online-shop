import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//FORMS
import AdressForm from "./AdressForm";
import RecipientForm from "./RecipientForm";

const StyledWrapper = styled.section`
  display: flex;
  overflow: hidden;
`;

const FormsNavigation = ({ finalizationStep, nextStep, prevStep }) => {
  const [recipientData, setRecipientData] = useState({
    fullName: "",
    email: "",
    telephoneNumber: "",
  });
  return (
    <StyledWrapper>
      <RecipientForm
        nextStep={nextStep}
        recipientData={recipientData}
        setRecipientData={setRecipientData}
      />
      {/* <AdressForm /> */}
    </StyledWrapper>
  );
};

FormsNavigation.propTypes = {
  finalizationStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default FormsNavigation;
