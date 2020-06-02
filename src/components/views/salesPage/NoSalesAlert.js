import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "components/atoms/Button";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;

const NoSalesAlert = () => {
  return (
    <StyledWrapper>
      <h3>You do not have any sales yet.</h3>
      <Button black="black" as={Link} to={`/add_product`}>
        Sell one
      </Button>
    </StyledWrapper>
  );
};

export default NoSalesAlert;
