import React, { useState } from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
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
  ${({ sold }) =>
    sold &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;
const StyledBackButton = styled.button`
  margin: 0;
  padding: 3px;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  position: absolute;
  top: 0;
  left: 20px;
`;
const StyledIcon = styled.img`
  width: 100%;
`;
const StyledSoldAlert = styled.div`
  width: 250px;
  padding: 10px;
  text-align: center;
  top: 100px;
  margin: auto;
  background: ${theme.colors.redish};
  position: fixed;
  left: 50%;
  top: 140px;
  transform: translateX(-50%);
  color: ${theme.colors.whiteish};
  box-shadow: 0 0 3px ${theme.colors.redish};
  z-index: 3;
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
    <>
      {product.sold && (
        <StyledSoldAlert>This product is already sold</StyledSoldAlert>
      )}
      <StyledWrapper sold={product.sold}>
        <StyledBackButton
          as={Link}
          to={state && state.prevPath ? state.prevPath : "/"}
        >
          <StyledIcon src={BackIcon} alt="back icon" />
        </StyledBackButton>
        {loading ? (
          <Instagram
            backgroundColor="rgba(0,0,0,0.05)"
            foregroundColor="#eee"
          />
        ) : (
          <>
            <PhotosGallery product={product} />
            <ProductSummary product={product} />
            <FuncionalityButtons
              nickName={product.writer.nickName}
              product={product}
            />
            <AboutSeller authorInfo={product.writer} />
          </>
        )}
      </StyledWrapper>
    </>
  );
};

export default ProductDetailsPage;
