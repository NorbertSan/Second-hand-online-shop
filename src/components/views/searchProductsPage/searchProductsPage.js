import React, { useEffect, useState } from "react";
import styled from "styled-components";

// COMPONENTS
// import ProductsItemsGrid from "components/molecules/ProductsItemsGrid";
import FiltersProducts from "./FiltersProducts";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;

const SearchProductsPage = () => {
  const [filters, setFilters] = useState({});
  return (
    <StyledWrapper>
      <FiltersProducts setFiltersParent={setFilters} />
      {/* <ProductsItemsGrid /> */}
    </StyledWrapper>
  );
};

export default SearchProductsPage;
