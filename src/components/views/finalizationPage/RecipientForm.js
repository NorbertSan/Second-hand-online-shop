import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import { recipientFormValidator } from "utils/validators";
// COMP
import NextButton from "./NextButton";
import Input from "components/atoms/Input";
// REDUX
import { useSelector } from "react-redux";

const StyledWrapper = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  transition: all 0.4s ease-in-out;
  ${({ nonVisible }) =>
    nonVisible &&
    css`
      pointer-events: none;
      opacity: 0;
      /* visibility: none; */
    `}
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
  justify-content: flex-end;
`;
const StyledInput = styled(Input)`
  padding-left: 3px;
  font-size: 12px;
`;

const RecipientForm = ({
  nextStep,
  recipientData,
  setRecipientData,
  nonVisible,
}) => {
  const [isNextStepDisable, setNextStepDisable] = useState(true);
  const { fullName, email } = useSelector((state) => state.user);
  useEffect(() => {
    fullName &&
      email &&
      setRecipientData((prevState) => ({
        ...prevState,
        fullName,
        email,
      }));
  }, [fullName, email, setRecipientData]);
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "telephoneNumber") value = parseInt(value.slice(0, 9));
    setRecipientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => e.preventDefault();
  useEffect(() => {
    const validateErrors = recipientFormValidator(recipientData);
    setNextStepDisable(Object.keys(validateErrors).length !== 0);
  }, [recipientData]);

  return (
    <StyledWrapper nonVisible={nonVisible} onSubmit={handleSubmit}>
      <StyledTitle>Recipient form</StyledTitle>
      <StyledFieldWrapper>
        <label htmlFor="full name">Full name *</label>
        <StyledInput
          spellCheck="false"
          value={recipientData.fullName}
          name="fullName"
          onChange={handleInputChange}
          type="text"
        />
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <label htmlFor="email">Email *</label>
        <StyledInput
          spellCheck="false"
          value={recipientData.email}
          name="email"
          onChange={handleInputChange}
          type="text"
        />
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <label htmlFor="telephone number">Telephone number *</label>
        <StyledInput
          autoComplete="new-password"
          spellCheck="false"
          value={recipientData.telephoneNumber}
          name="telephoneNumber"
          onChange={handleInputChange}
          type="number"
        />
      </StyledFieldWrapper>
      <StyledButtonWrapper>
        <NextButton nextStep={nextStep} disabled={isNextStepDisable} />
      </StyledButtonWrapper>
    </StyledWrapper>
  );
};

RecipientForm.propTypes = {
  nextStep: PropTypes.func.isRequired,
  recipientData: PropTypes.object.isRequired,
  setRecipientData: PropTypes.func.isRequired,
  nonVisible: PropTypes.bool.isRequired,
};

export default RecipientForm;
