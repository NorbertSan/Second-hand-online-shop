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

const NoPurchasesAlert = () => {
  return (
    <StyledWrapper>
      <h3>You do not have any purchases yet</h3>
      <Button black="black" as={Link} to={`/products`}>
        Browse
      </Button>
    </StyledWrapper>
  );
};

export default NoPurchasesAlert;
