import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

// ICON
import NotFoundIcon from "assets/icons/notFound.svg";
import Button from "components/atoms/Button";

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  max-width: 480px;
  margin: auto;
  padding: 30px;
`;
const StyledTitle = styled.h2`
  text-align: center;
  font-size: 18px;
  ${({ big }) =>
    big &&
    css`
      font-size: 34px;
    `}
`;
const StyledIcon = styled.img`
  width: 100px;
  margin-bottom: 40px;
`;
const StyledButton = styled(Button)`
  margin: 6px 0;
  width: 170px;
`;

const ProductNotFound = () => {
  return (
    <StyledWrapper>
      <StyledIcon src={NotFoundIcon} alt="not found icon" />
      <StyledTitle big>Product not found</StyledTitle>
      <StyledTitle as="h4">
        User has withdrawn the product or the product has been sold (⌣́_⌣̀)
      </StyledTitle>
      <StyledButton as={Link} to="/">
        Back to home
      </StyledButton>
      <StyledButton as={Link} to="/products" secondary>
        Browse
      </StyledButton>
    </StyledWrapper>
  );
};

export default ProductNotFound;
