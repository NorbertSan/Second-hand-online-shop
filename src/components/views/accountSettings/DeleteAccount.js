import React from "react";
import theme from "utils/theme";
import styled from "styled-components";
// ICON
import { ReactComponent as RightArrow } from "assets/icons/simpleRightArrow.svg";

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
  transform: translateY(-50%);
  path {
    fill: ${theme.colors.redish};
  }
`;

const DeleteAccount = () => {
  return (
    <StyledWrapper>
      <span>Delete account</span>
      <StyledIcon />
    </StyledWrapper>
  );
};

export default DeleteAccount;
