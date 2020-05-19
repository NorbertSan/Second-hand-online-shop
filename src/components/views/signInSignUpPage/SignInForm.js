import React, { useState, useRef } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useHistory } from "react-router-dom";

// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { login } from "redux/actions/userActions";
// COMPONENTS
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import ValidateAlert from "components/atoms/ValidateAlert";
import Loader from "react-loader-spinner";

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
const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: start;
  font-size: ${theme.fontSize.xs};
  margin-left: 30px;
  margin-bottom: 10px;
`;
const StyledValidateAlert = styled(ValidateAlert)`
  text-align: center;
  margin-top: 10px;
`;

const SignInForm = () => {
  const loading = useSelector((state) => state.UI.loadingLogin);
  const errors = useSelector((state) => state.UI.errorsLogin);
  const dispatch = useDispatch();
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [remember, setRemember] = useState(false);
  const checkboxRef = useRef(null);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim().length > 0 && email.trim().length > 0) {
      setEmailValue("");
      setPasswordValue("");
      dispatch(login({ email, password, remember }, history));
    }
  };
  return (
    <StyledWrapper onSubmit={handleSubmit}>
      <StyledInputWrapper>
        <label htmlFor="email">Email :</label>
        <StyledInput
          spellCheck="false"
          type="text"
          value={email}
          onChange={(e) => setEmailValue(e.target.value)}
          secondary
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <label htmlFor="password">Password :</label>
        <StyledInput
          spellCheck="false"
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          secondary
        />
      </StyledInputWrapper>
      <StyledCheckboxWrapper
        onClick={(e) => {
          if (e.target !== checkboxRef.current)
            setRemember((prevState) => !prevState);
        }}
      >
        <input
          ref={checkboxRef}
          type="checkbox"
          name="remember"
          checked={remember}
          onChange={() => setRemember((prevState) => !prevState)}
        />
        <label htmlFor="remember">Remember me</label>
      </StyledCheckboxWrapper>
      <Button>
        {loading ? (
          <Loader
            type="ThreeDots"
            color={theme.colors.whiteish}
            height={15}
            width={60}
          />
        ) : (
          "Log in"
        )}
      </Button>
      {errors.general && (
        <StyledValidateAlert>{errors.general}</StyledValidateAlert>
      )}
    </StyledWrapper>
  );
};
export default SignInForm;
