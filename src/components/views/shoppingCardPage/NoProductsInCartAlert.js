import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "components/atoms/Button";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTitle = styled.h3`
  text-align: center;
  margin-bottom: 50px;
`;

const NoProductsInCartAlert = () => {
  return (
    <StyledWrapper>
      <StyledTitle>No products in your shopping card</StyledTitle>
      <Button as={Link} to="/products">
        Browse
      </Button>
    </StyledWrapper>
  );
};

export default NoProductsInCartAlert;
