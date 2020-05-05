import React, { useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";

// COMPONENTS
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";

const StyledWrapper = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1px ${theme.colors.secondary};
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: flex-start;
  margin-bottom: 25px;
  label {
    color: grey;
    font-weight: bold;
    font-size: 12px;
  }
`;
const StyledInput = styled(Input)`
  width: 100%;
  padding-left: 0;
`;

const LoginForm = () => {
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  return (
    <StyledWrapper>
      <StyledInputWrapper>
        <label htmlFor="email">Email :</label>
        <StyledInput
          type="text"
          value={email}
          onChange={(e) => setEmailValue(e.target.value)}
          secondary
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <label htmlFor="password">Password :</label>
        <StyledInput
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          secondary
        />
      </StyledInputWrapper>
      <Button>Log in</Button>
    </StyledWrapper>
  );
};
export default LoginForm;
