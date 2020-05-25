import React from "react";
import theme from "utils/theme";
import styled from "styled-components";
// COMP
import ShoppingCardProduct from "./ShoppingCardProduct";
import NoProductsInCartAlert from "./NoProductsInCartAlert";
// REDUX
import { useSelector } from "react-redux";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.h3`
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
  color: ${theme.colors.primary};
`;
const StyledProductsWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px -1px ${theme.colors.blackish};
`;
const StyledLabels = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 3px 6px 3px 3px;
  text-align: center;
  margin-bottom: 10px;
  border-bottom: 2px solid #eee;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSize.s};
`;

const ShoppingCardPage = () => {
  const shoppingList = useSelector((state) => state.data.shoppingList);
  return (
    <StyledWrapper>
      {shoppingList.length > 0 ? (
        <>
          <StyledTitle>Shopping card</StyledTitle>
          <StyledProductsWrapper>
            <StyledLabels>
              <li>Product</li>
              <li>Seller</li>
              <li>Price</li>
              <li>Size</li>
            </StyledLabels>
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
