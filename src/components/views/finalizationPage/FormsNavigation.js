import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
//FORMS
import AddressForm from "./AddressForm";
import RecipientForm from "./RecipientForm";
import PaymentForm from "./PaymentForm";

const StyledWrapper = styled.section`
  display: flex;
  transition: transform 0.4s ease-in-out;
  transform: translateX(${(props) => (props.finalizationStep - 1) * -100}%);
`;

const FormsNavigation = ({ finalizationStep, nextStep, prevStep }) => {
  const { nickName } = useSelector((state) => state.user);
  const [recipientData, setRecipientData] = useState({
    fullName: "",
    email: "",
    telephoneNumber: "",
    nickName: "",
  });
  const [addressData, setAddressData] = useState({
    companyName: "",
    city: "",
    zipCode: "",
    buildingNumber: "",
    street: "",
  });
  useEffect(() => {
    nickName &&
      setRecipientData((prevState) => ({
        ...prevState,
        nickName,
      }));
  }, [nickName]);
  return (
    <StyledWrapper finalizationStep={finalizationStep}>
      <RecipientForm
        nonVisible={finalizationStep !== 1}
        nextStep={nextStep}
        recipientData={recipientData}
        setRecipientData={setRecipientData}
      />
      <AddressForm
        nonVisible={finalizationStep !== 2}
        nextStep={nextStep}
        prevStep={prevStep}
        addressData={addressData}
        setAddressData={setAddressData}
      />
      <PaymentForm
        addressData={addressData}
        recipientData={recipientData}
        prevStep={prevStep}
        nonVisible={finalizationStep !== 3}
      />
    </StyledWrapper>
  );
};

FormsNavigation.propTypes = {
  finalizationStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default FormsNavigation;
