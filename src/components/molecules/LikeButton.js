import React from "react";
import styled from "styled-components";
import theme from "utils/theme";

import LikeIcon from "assets/icons/like.svg";
const StyledWrapper = styled.div`
  width: 40px;
  height: 15px;
  position: absolute;
  top: 3px;
  right: 0px;
  display: flex;
  justify-items: flex-end;
  align-items: center;
  font-size: ${theme.fontSize.xs};
`;
const StyledIcon = styled.img`
  width: 15px;
  height: 15px;
`;
const StyledButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  margin-left: 5px;
  padding: 0;
  outline: none;
  cursor: pointer;
`;
const LikeButton = () => {
  return (
    <StyledWrapper>
      <div>12</div>
      <StyledButton>
        <StyledIcon src={LikeIcon} alt="like icon" />
      </StyledButton>
    </StyledWrapper>
  );
};

export default LikeButton;
