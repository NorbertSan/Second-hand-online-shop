import React from "react";
import theme from "utils/theme";
import styled from "styled-components";
// ICONS
import BlueHeartIcon from "assets/icons/blueHeart.svg";
import OrangeCartIcon from "assets/icons/orangeCart.svg";
import BlackMailIcon from "assets/icons/blackMail.svg";
// COMPONENTS
import Button from "components/atoms/Button";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
`;
const StyledButton = styled(Button)`
  margin: 7px 0;
  width: 220px;
  align-self: center;
  border-width: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.blueish {
    color: ${theme.colors.primary}!important;
    border-color: ${theme.colors.primary};
  }
`;
const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FuncionalityButtons = () => (
  <StyledWrapper>
    <StyledButton tertiary>
      <span>Ask for product</span>
      <StyledIcon src={BlackMailIcon} alt="mail icon" />
    </StyledButton>
    <StyledButton secondary>
      <span>Buy Now</span>
      <StyledIcon src={OrangeCartIcon} alt="cart icon" />
    </StyledButton>
    <StyledButton className="blueish" tertiary>
      <span>Add to favourites</span>
      <StyledIcon src={BlueHeartIcon} alt="heart icon" />
    </StyledButton>
  </StyledWrapper>
);

export default FuncionalityButtons;
