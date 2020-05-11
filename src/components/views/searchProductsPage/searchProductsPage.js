import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
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
  const [page, setPage] = useState(1);
  const location = useLocation();
  useEffect(() => {
    const queries = queryString.parse(location.search);
    const page = queries.page;
    setPage(parseInt(page || 1));
  }, []);
  return (
    <StyledWrapper>
      <FiltersProducts setPage={setPage} page={page} />
      <ProductsItemsGrid page={page} setPage={setPage} />
    </StyledWrapper>
  );
};

export default SearchProductsPage;
