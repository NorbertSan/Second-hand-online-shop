import React from "react";
import styled from "styled-components";

//ICON
import NotFoundIcon from "assets/icons/notFound.svg";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;
const StyledIcon = styled.img`
  margin-top: 50px;
  width: 100px;
  height: 100px;
`;

const NoProductsAlert = () => {
  return (
    <StyledWrapper>
      <div>No matching products found ☹☹</div>
      <StyledIcon src={NotFoundIcon} alt="not found icon" />
    </StyledWrapper>
  );
};

export default NoProductsAlert;
