import React, { useState, useEffect } from "react";
import styled from "styled-components";
// ICON
import HeartSignalIcon from "assets/icons/heartSignal.svg";
// COMPONENTS
import ProductItem from "components/products/ProductItem";
import ProductsSkeleton from "components/products/ProductsSkeleton";
import NoFavProductsAlert from "./NoFavProductsAlert";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { SET_FAV_PRODUCTS, CLEAR_FAV_PRODUCTS } from "redux/types";
// HOOKS
import useGetProductsFromIdsArray from "hooks/useGetProductsFromIdsArray";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.h2`
  text-align: center;
`;
const StyledIcon = styled.img`
  width: 100px;
  align-self: center;
`;
const StyledFavProductsList = styled.ul`
  margin: 0;
  margin-top: 40px;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: 40px;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const FavouritesProductsPage = () => {
  const favProducts = useSelector((state) => state.data.favProducts);
  const productsIds = useSelector((state) => state.user.likesProducts);
  const [productsIdsRetrieve, setProductsIdsRetrieve] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const setProductsToGlobalState = (products) => {
    dispatch({
      type: SET_FAV_PRODUCTS,
      payload: products,
    });
  };
  useEffect(() => {
    dispatch({ type: CLEAR_FAV_PRODUCTS });
  }, []);
  useEffect(() => {
    productsIds && setProductsIdsRetrieve(true);
  }, [productsIds]);
  useGetProductsFromIdsArray(
    productsIds,
    null,
    setLoading,
    setProductsToGlobalState,
    [productsIdsRetrieve]
  );
  return (
    <StyledWrapper>
      <StyledTitle>Your favourites products</StyledTitle>
      <StyledIcon src={HeartSignalIcon} alt="heart signal icon" />
      <StyledFavProductsList>
        {favProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
        {loading && <ProductsSkeleton />}
        {!loading && favProducts.length === 0 && <NoFavProductsAlert />}
      </StyledFavProductsList>
    </StyledWrapper>
  );
};

export default FavouritesProductsPage;
