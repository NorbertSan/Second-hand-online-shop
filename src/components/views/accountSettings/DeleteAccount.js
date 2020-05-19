import React, { useState, useEffect } from "react";
import theme from "utils/theme";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
// ICON
import { ReactComponent as RightArrow } from "assets/icons/simpleRightArrow.svg";
// COMPONENTS
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import ValidateAlert from "components/atoms/ValidateAlert";
import Loader from "react-loader-spinner";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "redux/actions/userActions";

const StyledWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 2px ${theme.colors.redish};
  border: 1px solid ${theme.colors.redish};
  color: ${theme.colors.redish};
  font-weight: bold;
  padding: 15px 30px;
  justify-content: space-between;
  position: relative;
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
    fill: ${theme.colors.redish};
  }
  ${({ open }) =>
    open &&
    css`
      transform: translateY(-50%) rotate(90deg);
    `}
`;
const StyledDeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 3px ${theme.colors.redish};
  padding: 15px;
  margin-top: 15px;
  p {
    font-size: ${theme.fontSize.xs};
    span {
      color: ${theme.colors.redish};
      font-weight: bold;
    }
  }
`;
const StyledTitle = styled.h4`
  margin: 0;
  text-align: center;
  color: ${theme.colors.redish};
`;
const StyledField = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  label {
    color: ${theme.colors.redish};
    font-weight: bold;
    font-size: ${theme.fontSize.xs};
  }
`;
const StyledInput = styled(Input)`
  padding-left: 0;
`;
const StyledConfirmInput = styled(Input)`
  padding-left: 0;
  color: ${theme.colors.redish};
`;
const StyledButton = styled(Button)`
  color: ${theme.colors.redish};
  background: ${theme.colors.redish};
  align-self: flex-end;
  font-size: ${theme.fontSize.xs}!important;
  margin-top: 20px;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      background: #fff;
      color: ${theme.colors.blackish}!important;
      border: 1px solid ${theme.colors.blackish};
    `}
`;
const StyledValidateAlert = styled(ValidateAlert)`
  text-align: center;
  margin-top: 6px;
  font-size: ${theme.fontSize.s};
`;

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmDeleteValue, setConfirmDeleteValue] = useState("");
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const fullName = useSelector((state) => state.user.fullName);
  const textToConfirmDelete = `delete_account/${fullName}`;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (confirmDeleteValue === textToConfirmDelete) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [confirmDeleteValue]);
  const toggleDeleteForm = () => setIsDeleteFormOpen((prevState) => !prevState);
  const deleteAccountHandle = (e) => {
    console.log(e.target.value);
    dispatch(deleteAccount(password, setLoading, setErrors, history));
  };
  return (
    <>
      <StyledWrapper onClick={toggleDeleteForm}>
        <span>Delete account</span>
        <StyledIcon open={isDeleteFormOpen} />
      </StyledWrapper>
      {isDeleteFormOpen && (
        <StyledDeleteWrapper>
          <StyledTitle>Danger zone</StyledTitle>
          <StyledField>
            <label>Password:</label>
            <StyledInput
              secondary
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledField>
          <p>
            You are in danger zone. To prevent not possible to back changes you
            have to confirm it and type <span>{textToConfirmDelete}</span>
          </p>
          <StyledConfirmInput
            value={confirmDeleteValue}
            onChange={(e) => setConfirmDeleteValue(e.target.value)}
            type="text"
            secondary
          />
          <StyledButton
            disabled={isButtonDisabled}
            onClick={deleteAccountHandle}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={theme.colors.whiteish}
                height={15}
                width={70}
              />
            ) : (
              "Delete account"
            )}
          </StyledButton>
          {errors.password && (
            <StyledValidateAlert>{errors.password}</StyledValidateAlert>
          )}
        </StyledDeleteWrapper>
      )}
    </>
  );
};

export default DeleteAccount;
