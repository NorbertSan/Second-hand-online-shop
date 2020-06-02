import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// COMPONENTS
import Button from "components/atoms/Button";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const StyledTitle = styled.h4``;

const NoFavProductsAlert = () => {
  return (
    <StyledWrapper>
      <StyledTitle>You do not have favourites products</StyledTitle>
      <Button as={Link} to="/products">
        Browse
      </Button>
    </StyledWrapper>
  );
};

export default NoFavProductsAlert;
