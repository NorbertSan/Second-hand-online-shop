import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// ICON
import HangerIcon from "assets/icons/hanger.svg";
// COMPONENTS
import UserProductItem from "./UserProductItem";
import ProductsSkeleton from "components/products/ProductsSkeleton";
// HOOK
import useGetProductsFromIdsArray from "hooks/useGetProductsFromIdsArray";

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
const StyledIcon = styled.img`
  width: 100px;
`;
const StyledSecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProducts = ({ productsIds, nickName }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setUserProducts([]);
  }, [productsIds]);
  useGetProductsFromIdsArray(
    productsIds,
    setUserProducts,
    null,
    [nickName, productsIds],
    setLoading
  );
  return (
    <>
      {userProducts.length > 0 ? (
        <>
          <StyledTitle>{`Items user ${nickName} (${productsIds.length} products)`}</StyledTitle>
          <StyledWrapper>
            {userProducts.map((product) => (
              <UserProductItem key={product._id} product={product} />
            ))}
          </StyledWrapper>
        </>
      ) : (
        !loading && (
          <StyledSecondWrapper>
            <StyledTitle>This user do not have products on sell </StyledTitle>
            <StyledIcon src={HangerIcon} alt="hanger icon" />
          </StyledSecondWrapper>
        )
      )}
      {loading && <ProductsSkeleton />}
    </>
  );
};

UserProducts.propTypes = {
  productsIds: PropTypes.array.isRequired,
  nickName: PropTypes.string.isRequired,
};

export default UserProducts;
