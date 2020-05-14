import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";

// COMPONENTS
import SellerProductItem from "./SellerProductItem";
import ProductsSkeleton from "components/products/ProductsSkeleton";
// HOOK
import useGetProductsFromIdsArray from "hooks/useGetProductsFromIdsArray";

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: 40px;
  justify-content: center;
  width: 100%;
  position: relative;
`;
const StyledTitle = styled.h3`
  border-top: 1px solid grey;
  text-align: center;
  margin: 60px 0 20px 0;
  padding: 15px 0;
  font-weight: bold;
`;

const SellerProducts = ({ productsIds, nickName }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useGetProductsFromIdsArray(
    productsIds,
    setUserProducts,
    setLoading,
    null,
    []
  );
  return (
    <>
      <StyledTitle>{`Items user ${nickName} (${productsIds.length} products)`}</StyledTitle>
      <StyledWrapper>
        {userProducts.length > 0 &&
          userProducts.map((product) => (
            <SellerProductItem key={product._id} product={product} />
          ))}
        {loading && <ProductsSkeleton />}
      </StyledWrapper>
    </>
  );
};

SellerProducts.propTypes = {
  productsIds: PropTypes.array.isRequired,
  nickName: PropTypes.string.isRequired,
};

export default SellerProducts;
