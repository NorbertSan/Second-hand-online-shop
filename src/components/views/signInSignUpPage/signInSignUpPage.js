import React, { useState } from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";

// COMPONENTS
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const StyledWrapper = styled.section`
  margin-top: 150px;
  padding: 15px;
  text-align: center;
`;
const StyledButtons = styled.div`
  color: grey;
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledElement = styled.div`
  flex: 1;
  padding: 10px;
  ${({ active }) =>
    active &&
    css`
      border-bottom: 2px solid ${theme.colors.secondary};
      color: ${theme.colors.secondary};
      font-weight: bold;
    `}
`;
const StyledTitle = styled.h1`
  color: ${theme.colors.secondary};
`;
const StyledParagraph = styled.p`
  color: grey;
`;

const SignInSignUpPage = () => {
  const [userHasAccount, toggleForm] = useState(true);
  return (
    <StyledWrapper>
      <StyledTitle>Join to us !</StyledTitle>
      <StyledParagraph>Sell clothes you do not use</StyledParagraph>
      <StyledButtons>
        <StyledElement
          onClick={() => toggleForm(false)}
          active={!userHasAccount}
        >
          Sign up
        </StyledElement>
        <StyledElement onClick={() => toggleForm(true)} active={userHasAccount}>
          Login
        </StyledElement>
      </StyledButtons>
      {userHasAccount ? <SignInForm /> : <SignUpForm toggleForm={toggleForm} />}
    </StyledWrapper>
  );
};
export default SignInSignUpPage;
