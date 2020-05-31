import React from "react";
import styled from "styled-components";
// COMP
import ShoppingCardProduct from "./ShoppingCardProduct";
import NoProductsInCartAlert from "./NoProductsInCartAlert";
// REDUX
import { useSelector } from "react-redux";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 120px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.h3`
  text-align: center;
  margin: 0;
  margin-bottom: 30px;
`;
const StyledProductsWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const ShoppingCardPage = () => {
  const shoppingList = useSelector((state) => state.data.shoppingList);
  return (
    <StyledWrapper>
      {shoppingList.length > 0 ? (
        <>
          <StyledTitle>Shopping card ({shoppingList.length})</StyledTitle>
          <StyledProductsWrapper>
            {shoppingList.map((product) => (
              <ShoppingCardProduct key={product._id} product={product} />
            ))}
          </StyledProductsWrapper>
        </>
      ) : (
        <NoProductsInCartAlert />
      )}
    </StyledWrapper>
  );
};

export default ShoppingCardPage;
