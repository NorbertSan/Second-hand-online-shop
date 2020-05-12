import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
// HOOK
import useGetProducts from "hooks/useGetProducts";
// COMPONENTS
import ProductItem from "components/products/ProductItem";
import NoPostsAlert from "components/products/NoPostsAlert";
import ProductsSkeleton from "components/products/ProductsSkeleton";
import PageNavigation from "components/views/searchProductsPage/PageNavigation";

const StyledWrapper = styled.ul`
  margin-top: 30px;
  padding: 0 15px 60px 15px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: 20px;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const ProductsItemsGrid = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [maxPages, setMaxPages] = useState(1);
  const location = useLocation();
  const queries = queryString.parse(location.search);
  useGetProducts(
    queries,
    [location.search],
    setProducts,
    setLoading,
    setMaxPages
  );

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
          <NoPostsAlert />
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
