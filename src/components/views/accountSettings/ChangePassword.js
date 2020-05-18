import React from "react";
import theme from "utils/theme";
import styled from "styled-components";
// ICON
import { ReactComponent as RightArrow } from "assets/icons/simpleRightArrow.svg";

const StyledWrapper = styled.div`
  margin-top: 40px;
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
  transform: translateY(-50%);
  path {
    fill: ${theme.colors.blackish};
  }
`;

const ChangePassword = () => {
  return (
    <StyledWrapper>
      <span>Password</span>
      <StyledIcon />
    </StyledWrapper>
  );
};

export default ChangePassword;
