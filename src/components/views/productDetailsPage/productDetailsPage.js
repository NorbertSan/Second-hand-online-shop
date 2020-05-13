import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

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
  const product = useSelector((state) => state.data.singleProduct);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useGetSingleProduct(setLoading, setError);
  if (error) return <ProductNotFound />;
  return (
    <StyledWrapper>
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

export default ClothesDetailsPage;
