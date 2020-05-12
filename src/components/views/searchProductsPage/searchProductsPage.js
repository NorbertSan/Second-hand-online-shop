import React from "react";
import styled from "styled-components";

// COMPONENTS
import FiltersProducts from "./FiltersProducts";
import ProductsItemsGrid from "./ProductsItemsGrid";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;

const SearchProductsPage = () => {
  return (
    <StyledWrapper>
      <FiltersProducts />
      <ProductsItemsGrid />
    </StyledWrapper>
  );
};

export default SearchProductsPage;
