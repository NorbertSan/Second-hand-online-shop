import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { addressFormValidator } from "utils/validators";
// COMP
import Input from "components/atoms/Input";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { useSelector } from "react-redux";

const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 100%;
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
`;
const StyledFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  input {
    &:focus {
      border: 1px solid ${theme.colors.blackish};
    }
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`;
const StyledInput = styled(Input)`
  padding-left: 3px;
  font-size: 12px;
`;

const AddressForm = ({
  nonVisible,
  nextStep,
  prevStep,
  addressData,
  setAddressData,
}) => {
  const [isNextStepDisable, setNextStepDisable] = useState(true);
  const handleSubmit = (e) => e.preventDefault();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { location } = useSelector((state) => state.user);
  useEffect(() => {
    if (!location) return;
    const [city] = location.split(",");
    setAddressData((prevState) => ({
      ...prevState,
      city,
    }));
  }, [location, setAddressData]);
  const handleZipCodeChange = (e) => {
    const { value } = e.target;
    const valueWithoutSign = value.split("-").join("");
    if (!Number.isInteger(Number(valueWithoutSign))) return;
    let formatedValue = valueWithoutSign;
    if (valueWithoutSign.length > 2) {
      formatedValue = `${valueWithoutSign.substr(
        0,
        2
      )}-${valueWithoutSign.substr(2, 3)}`;
    }
    setAddressData((prevState) => ({
      ...prevState,
      zipCode: formatedValue,
    }));
  };

  useEffect(() => {
    const validateErrors = addressFormValidator(addressData);
    setNextStepDisable(Object.keys(validateErrors).length !== 0);
  }, [addressData]);

  return (
    <StyledWrapper nonVisible={nonVisible} onSubmit={handleSubmit}>
      <StyledTitle>Address form</StyledTitle>
      <StyledFieldWrapper>
        <label>Company name (if you order to office)</label>
        <StyledInput
          spellCheck="false"
          type="text"
          value={addressData.companyName}
          name="companyName"
          onChange={handleInputChange}
        />
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <label>City *</label>
        <StyledInput
          spellCheck="false"
          type="text"
          value={addressData.city}
          name="city"
          onChange={handleInputChange}
        />
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <label>Zip code *</label>
        <StyledInput
          autoComplete="new-password"
          spellCheck="false"
          placeholder="e.g 26-001"
          type="text"
          value={addressData.zipCode}
          name="zipCode"
          onChange={handleZipCodeChange}
        />
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <label>Building number *</label>
        <StyledInput
          spellCheck="false"
          type="number"
          value={addressData.buildingNumber}
          name="buildingNumber"
          onChange={handleInputChange}
        />
      </StyledFieldWrapper>
      <StyledButtonWrapper>
        <PrevButton prevStep={prevStep} />
        <NextButton nextStep={nextStep} disabled={isNextStepDisable} />
      </StyledButtonWrapper>
    </StyledWrapper>
  );
};

AddressForm.propTypes = {
  nonVisible: PropTypes.bool.isRequired,
  setAddressData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  addressData: PropTypes.object.isRequired,
};

export default AddressForm;
