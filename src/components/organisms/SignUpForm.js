import React, { useState, useReducer, useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";

import PasswordIcon from "assets/icons/password.svg";
import KeyIcon from "assets/icons/key.svg";

// COMPONENTS
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const StyledWrapper = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1px ${theme.colors.secondary};
`;
const StyledInput = styled(Input)`
  margin-bottom: 15px;
  width: 90%;
`;
const StyledPasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;
const StyledIcon = styled.img`
  position: absolute;
  width: 12px;
  height: 12px;
  top: 30%;
  right: 20px;
  transform: translateY(-30%);
`;
const StyledHintPassword = styled.div`
  width: 90%;
  font-size: ${theme.fontSize.xs};
  weight: bold;
  color: grey;
  margin-bottom: 10px;
  text-align: start;
`;

const SignUpForm = () => {
  const [isPasswordShown, togglePasswordShown] = useState(false);
  const [isHintPasswordShown, toggleHintPasswordShown] = useState(false);
  const passwordInputRef = useRef(null);
  const [inputsContent, setInputContent] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      fullName: "",
      nickName: "",
      email: "",
      password: "",
    }
  );
  useEffect(() => {
    const listener = (e) => {
      if (passwordInputRef.current.contains(e.target)) {
        // focus on password input
        toggleHintPasswordShown(true);
      } else toggleHintPasswordShown(false);
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);
  const handleInputChange = (e) => {
    setInputContent({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <StyledWrapper autoComplete="off">
      <StyledInput
        name="fullName"
        type="text"
        value={inputsContent.fullName}
        onChange={handleInputChange}
        secondary
        placeholder="Full name"
      />
      <StyledInput
        value={inputsContent.nickName}
        onChange={handleInputChange}
        name="nickName"
        type="text"
        secondary
        placeholder="Profile name"
      />
      <StyledInput
        value={inputsContent.email}
        onChange={handleInputChange}
        name="email"
        type="text"
        secondary
        placeholder="Email"
      />
      <StyledPasswordContainer>
        <StyledInput
          value={inputsContent.password}
          onChange={handleInputChange}
          name="password"
          type={isPasswordShown ? "text" : "password"}
          secondary
          placeholder="Password"
          ref={passwordInputRef}
        />
        <StyledIcon
          onClick={() => togglePasswordShown((prevState) => !prevState)}
          src={isPasswordShown ? KeyIcon : PasswordIcon}
          alt="password"
        />
      </StyledPasswordContainer>
      {isHintPasswordShown && (
        <StyledHintPassword>
          Password must contain at least six characters, one uppercase, one
          lowercase and one digit
        </StyledHintPassword>
      )}
      <Button>Register</Button>
    </StyledWrapper>
  );
};
export default SignUpForm;
