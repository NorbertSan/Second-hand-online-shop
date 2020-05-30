import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "components/atoms/Button";

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: #eee;
  padding-bottom: 10px;
  margin-top: 50px;
`;

const StyledPriceWrapper = styled.div`
  margin: 15px 0 25px 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  span {
    text-transform: uppercase;
  }
`;
const StyledButton = styled(Button)`
  margin-bottom: 10px;
`;

const ShoppingCardSummary = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const shoppingList = useSelector((state) => state.data.shoppingList);
  const location = useLocation();
  useEffect(() => {
    if (shoppingList) {
      const prices = shoppingList.map((product) => parseFloat(product.price));
      const sum = prices.reduce((res, value) => res + value, 0);
      setTotalPrice(sum.toFixed(2));
    }
  }, [shoppingList]);
  return (
    <StyledWrapper>
      <StyledPriceWrapper>
        <span>Total price</span>
        <span>{totalPrice} PLN</span>
      </StyledPriceWrapper>
      <StyledButton black>Finalization</StyledButton>
      <StyledButton
        transparent="transparent"
        as={Link}
        to={
          location.state && location.state.prevState
            ? location.state.prevState
            : "/products"
        }
      >
        Back to shopping
      </StyledButton>
    </StyledWrapper>
  );
};

export default ShoppingCardSummary;
