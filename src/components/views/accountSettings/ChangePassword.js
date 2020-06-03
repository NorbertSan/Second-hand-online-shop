import React, { useState, useRef } from "react";
import theme from "utils/theme";
import styled, { css } from "styled-components";
// ICON
import { ReactComponent as RightArrow } from "assets/icons/simpleRightArrow.svg";
import CheckIcon from "assets/icons/successCheck.svg";
// COMPONENTS
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import Loader from "react-loader-spinner";
import ValidateAlert from "components/atoms/ValidateAlert";
import PasswordStrengthHint from "utils/PasswordStrengthHint";
// VALIDATOR
import { validatePassword } from "utils/validators";
// REDUX STUFF
import { useDispatch } from "react-redux";
import { changePassword as changePasswordAction } from "redux/actions/userActions";

const StyledWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 2px ${theme.colors.blackish};
  border: 1px solid ${theme.colors.blackish};
  padding: 10px 30px;
  justify-content: space-between;
  position: relative;
  span {
    font-weight: bold;
    color: ${theme.colors.blackish};
  }
`;
const StyledIcon = styled(RightArrow)`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  right: 20px;
  transition: transform 0.1s ease-in-out;
  transform: translateY(-50%);
  path {
    fill: ${theme.colors.blackish};
  }
  ${({ open }) =>
    open &&
    css`
      transform: translateY(-50%) rotate(90deg);
    `}
`;
const StyledFormWrapper = styled.form`
  padding: 15px;
  background: #fff;
  box-shadow: 0 0 3px grey;
  margin: 15px 0;
`;
const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    margin-bottom: 3px;
    font-size: ${theme.fontSize.xs};
  }
`;
const StyledButton = styled(Button)`
  margin: 0 auto;
  font-size: ${theme.fontSize.xs}!important;
`;
const StyledSuccessWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3px;
  img {
    width: 15px;
    height: 15px;
    margin-right: 6px;
  }
  span {
    color: ${theme.colors.greenish};
    font-size: ${theme.fontSize.xs};
    font-weight: bold;
  }
`;
const StyledValidateAlert = styled(ValidateAlert)`
  text-align: center;
  margin-top: 5px;
`;

const ChangePassword = () => {
  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChangePasswdOpen, setIsChangePasswdOpen] = useState(false);
  const [passwordsValues, setPasswordsValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleOnChangePassword = (e) => {
    const passwordType = e.target.name;
    const value = e.target.value;
    setPasswordsValues((prevState) => ({
      ...prevState,
      [passwordType]: value,
    }));
  };

  const togglePasswdForm = () =>
    setIsChangePasswdOpen((prevState) => !prevState);
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validatePassword(passwordsValues);
    if (Object.keys(validateErrors).length > 0) setErrors(validateErrors);
    else
      dispatch(
        changePasswordAction(passwordsValues, setErrors, setLoading, setSuccess)
      );
  };
  return (
    <>
      <StyledWrapper onClick={togglePasswdForm}>
        <span>Password</span>
        <StyledIcon open={isChangePasswdOpen} />
      </StyledWrapper>
      {isChangePasswdOpen && (
        <>
          <StyledFormWrapper onSubmit={handlePasswordSubmit}>
            <StyledField>
              <label>Old password:</label>
              <Input
                secondary
                type="password"
                name="oldPassword"
                value={passwordsValues.oldPassword}
                onChange={handleOnChangePassword}
              />
            </StyledField>
            <StyledField>
              <label>New password:</label>
              <Input
                style={{ marginBottom: 5 }}
                ref={passwordInputRef}
                secondary
                type="password"
                name="newPassword"
                value={passwordsValues.newPassword}
                onChange={handleOnChangePassword}
              />
              <PasswordStrengthHint passwordInputRef={passwordInputRef} />
            </StyledField>
            <StyledField>
              <label>Confirm new password:</label>
              <Input
                secondary
                type="password"
                name="confirmNewPassword"
                value={passwordsValues.confirmNewPassword}
                onChange={handleOnChangePassword}
              />
            </StyledField>
            <StyledButton tertiary>
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color={theme.colors.blackish}
                  height={10}
                  width={60}
                />
              ) : (
                "Change"
              )}
            </StyledButton>
            {errors.password && (
              <StyledValidateAlert>{errors.password}</StyledValidateAlert>
            )}
            {success.password && (
              <StyledSuccessWrapper>
                <img src={CheckIcon} alt="check icon" />
                <span>{success.password}</span>
              </StyledSuccessWrapper>
            )}
          </StyledFormWrapper>
        </>
      )}
    </>
  );
};

export default ChangePassword;
