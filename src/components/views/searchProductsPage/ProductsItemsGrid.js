import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
// HOOK
import useGetProducts from "hooks/useGetProducts";
// COMPONENTS
import ProductItem from "components/products/ProductItem";
import NoProductsAlert from "components/products/NoProductsAlert";
import ProductsSkeleton from "components/products/ProductsSkeleton";
import PageNavigation from "components/views/searchProductsPage/PageNavigation";
// REDUX
import { useSelector } from "react-redux";

const StyledWrapper = styled.ul`
  margin-top: 30px;
  padding: 0 15px 60px 15px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 220px));
  grid-gap: 20px;
  width: 100%;
  position: relative;
`;

const ProductsItemsGrid = () => {
  const products = useSelector((state) => state.data.products);
  const loading = useSelector((state) => state.UI.loadingProducts);
  const [maxPages, setMaxPages] = useState(1);
  const location = useLocation();
  const queries = queryString.parse(location.search);
  const clearPrevious = true;
  useGetProducts(queries, [location.search], clearPrevious, setMaxPages);

  return (
    <>
      <StyledWrapper>
        {loading ? (
          <ProductsSkeleton />
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductItem product={product} key={product._id} />
          ))
        ) : (
          <NoProductsAlert />
        )}
      </StyledWrapper>
      {maxPages > 1 && <PageNavigation maxPages={maxPages} />}
    </>
  );
};

ProductsItemsGrid.propTypes = {
  setPage: PropTypes.func,
  page: PropTypes.number,
};

export default ProductsItemsGrid;
