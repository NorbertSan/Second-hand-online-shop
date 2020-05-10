import React from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";

// ICON
import successCheckIcon from "assets/icons/successCheck.svg";
import errorCheckIcon from "assets/icons/errorCheck.svg";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  font-weight: bold;
  ${({ success }) =>
    success &&
    css`
      color: ${theme.colors.greenish};
      border-bottom: 1px solid ${theme.colors.greenish};
    `}
  ${({ error }) =>
    error &&
    css`
      color: ${theme.colors.redish};
      border-bottom: 1px solid ${theme.colors.redish};
    `}
`;
const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

const AddProductAlert = ({ text, success, error }) => {
  return (
    <StyledWrapper success={success} error={error}>
      <StyledIcon src={success ? successCheckIcon : errorCheckIcon} />
      <span>{text}</span>
    </StyledWrapper>
  );
};

AddProductAlert.propTypes = {
  text: PropTypes.string.isRequired,
};
export default AddProductAlert;
