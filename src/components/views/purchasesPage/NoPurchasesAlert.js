import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import { Link } from "react-router-dom";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;
const StyledTitle = styled.h3``;

const NoPurchasesAlert = () => {
  return (
    <StyledWrapper>
      <StyledTitle>You do not have any purchases yet</StyledTitle>
      <Button black="black" as={Link} to={`/products`}>
        Browse
      </Button>
    </StyledWrapper>
  );
};

export default NoPurchasesAlert;
