import React from "react";
import styled from "styled-components";
// ICONS
import StarIcon from "assets/icons/star.svg";
import BlueMail from "assets/icons/blueMail.svg";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 15px 0 0;
`;
const StyledButton = styled.button`
  border: none;
  background: transparent;
  width: 20px;
  height: 20px;
  padding: 0;
  margin-left: 15px;
`;
const StyledIcon = styled.img`
  width: 100%;
`;

const FuncionalityIcons = () => {
  return (
    <StyledWrapper>
      {/* <StyledButton>
        <StyledIcon src={StarIcon} alt="star icon" />
      </StyledButton> */}
      <StyledButton>
        <StyledIcon src={BlueMail} alt="mail icon" />
      </StyledButton>
    </StyledWrapper>
  );
};

export default FuncionalityIcons;
