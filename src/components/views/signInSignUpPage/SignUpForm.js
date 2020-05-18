import React, { useState, useReducer, useRef } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { signUpValidator } from "utils/validators";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "redux/actions/userActions";
// HOOKS
import useLocationUserFetch from "hooks/useLocationUserFetch";
// ICONS
import PasswordIcon from "assets/icons/password.svg";
import KeyIcon from "assets/icons/key.svg";
// COMPONENTS
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import ValidateAlert from "components/atoms/ValidateAlert";
import Loader from "react-loader-spinner";
import PasswordStrengthHint from "utils/PasswordStrengthHint";

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
const StyledValidateAlert = styled(ValidateAlert)`
  margin-top: 10px;
  text-align: center;
`;

const SignUpForm = ({ toggleForm }) => {
  const loading = useSelector((state) => state.UI.loadingSignUp);
  const serverErrors = useSelector((state) => state.UI.errorsSignUp);
  const dispatch = useDispatch();
  const [errors, setInputErrors] = useState({});
  const [isPasswordShown, togglePasswordShown] = useState(false);
  const [location, setUserLocation] = useState("");
  const passwordInputRef = useRef(null);
  useLocationUserFetch(setUserLocation);
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
  const handleInputChange = (e) => {
    if (e.target.value.length < 30) {
      setInputContent({
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputErrors({});
    const errorsFromValidate = signUpValidator({ ...inputsContent, location });
    if (Object.keys(errorsFromValidate).length > 0)
      setInputErrors(errorsFromValidate);
    else
      dispatch(signUp({ ...inputsContent, location }, () => toggleForm(true)));
  };
  return (
    <StyledWrapper autoComplete="off" onSubmit={handleSubmit}>
      <StyledInput
        name="fullName"
        type="text"
        value={inputsContent.fullName}
        onChange={handleInputChange}
        secondary
        placeholder="Full name"
      />
      {errors.fullName && <ValidateAlert>{errors.fullName}</ValidateAlert>}
      <StyledInput
        value={inputsContent.nickName}
        onChange={handleInputChange}
        name="nickName"
        type="text"
        secondary
        placeholder="Profile name"
      />
      {errors.nickName && <ValidateAlert>{errors.nickName}</ValidateAlert>}
      <StyledInput
        value={inputsContent.email}
        onChange={handleInputChange}
        name="email"
        type="text"
        secondary
        placeholder="Email"
      />
      {errors.email && <ValidateAlert>{errors.email}</ValidateAlert>}
      <StyledInput
        value={location}
        onChange={(e) => setUserLocation(e.target.value)}
        name="location"
        type="text"
        secondary
        placeholder="Location"
      />
      {errors.location && <ValidateAlert>{errors.location}</ValidateAlert>}
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
        {errors.password && <ValidateAlert>{errors.password}</ValidateAlert>}
        <StyledIcon
          onClick={() => togglePasswordShown((prevState) => !prevState)}
          src={isPasswordShown ? KeyIcon : PasswordIcon}
          alt="password"
        />
      </StyledPasswordContainer>
      <PasswordStrengthHint passwordInputRef={passwordInputRef} />
      <Button>
        {loading ? (
          <Loader
            type="ThreeDots"
            color={theme.colors.whiteish}
            height={15}
            width={70}
          />
        ) : (
          "Register"
        )}
      </Button>
      {serverErrors.general && (
        <StyledValidateAlert>{serverErrors.general}</StyledValidateAlert>
      )}
    </StyledWrapper>
  );
};
export default SignUpForm;
