import React, { useState } from "react";
import styled from "styled-components";

// COMPONENTS
import PhotosGallery from "./PhotosGallery";
import ProductSummary from "./ProductSummary";
import FuncionalityButtons from "./FuncionalityButtons";
import AboutSeller from "./AboutSeller";
import ProductNotFound from "./ProductNotFound";
import { Instagram } from "react-content-loader";
// HOOK
import useGetSingleProduct from "hooks/useGetSingleProduct";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const ClothesDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useGetSingleProduct(setProduct, setLoading, setError);
  if (error) return <ProductNotFound />;
  return (
    <StyledWrapper>
      {loading && (
        <Instagram backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
      )}
      {product && (
        <>
          <PhotosGallery product={product} />
          <ProductSummary product={product} />
          <FuncionalityButtons />
          <AboutSeller authorInfo={product.writer} />
        </>
      )}
    </StyledWrapper>
  );
};

export default ClothesDetailsPage;
