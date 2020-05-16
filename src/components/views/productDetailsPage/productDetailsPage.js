import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// ICON
import BackIcon from "assets/icons/backArrow.svg";
// COMPONENTS
import PhotosGallery from "./PhotosGallery";
import ProductSummary from "./ProductSummary";
import FuncionalityButtons from "./FuncionalityButtons";
import AboutSeller from "./AboutSeller";
import NotFoundPage from "utils/NotFoundPage";
import { Instagram } from "react-content-loader";
// HOOK
import useGetSingleProduct from "hooks/useGetSingleProduct";

const StyledWrapper = styled.section`
  padding: 50px 15px 15px 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const StyledBackButton = styled.button`
  padding: 3px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  position: absolute;
  top: 0;
  left: 20px;
`;
const StyledImg = styled.img`
  width: 100%;
`;

const ProductDetailsPage = () => {
  const product = useSelector((state) => state.data.singleProduct);
  const [loading, setLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);
  useGetSingleProduct(setLoading, setProductNotFound);
  const { state } = useLocation();

  if (productNotFound)
    return (
      <NotFoundPage
        title="Product not found"
        info="User has withdrawn the product or the product has been sold (⌣́_⌣̀)"
      />
    );
  return (
    <StyledWrapper>
      <StyledBackButton
        as={Link}
        to={state && state.prevPath ? state.prevPath : "/"}
      >
        <StyledImg src={BackIcon} alt="left arrow" />
      </StyledBackButton>
      {loading ? (
        <Instagram backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
      ) : (
        <>
          <PhotosGallery product={product} />
          <ProductSummary product={product} />
          <FuncionalityButtons product_id={product._id} />
          <AboutSeller authorInfo={product.writer} />
        </>
      )}
    </StyledWrapper>
  );
};

export default ProductDetailsPage;
