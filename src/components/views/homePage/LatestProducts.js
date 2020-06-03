import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";
// HOOK
import useGetProducts from "hooks/useGetProducts";
// COMPONENTS
import Button from "components/atoms/Button";
import ProductItem from "components/products/ProductItem";
import ProductsSkeleton from "components/products/ProductsSkeleton";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_PRODUCTS } from "redux/types";

const StyledWrapper = styled.ul`
  margin: 0;
  list-style: none;
  margin-top: 30px;
  padding: 0 15px 60px 15px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 220px));
  grid-gap: 20px;
  justify-content: center;
  width: 100%;
  position: relative;
`;
const StyledButton = styled(Button)`
  margin: 0 auto 15px;
`;
const StyledAlert = styled.div`
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

const LatestProducts = () => {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [fetchMore, setFetchMore] = useState(false);
  const latestProducts = useSelector((state) => state.data.products);
  const loading = useSelector((state) => state.UI.loadingProducts);
  const dispatch = useDispatch();
  const clearPrevious = false;
  const queries = { limit, page };
  useGetProducts(queries, [page], clearPrevious, null, setFetchMore);
  useEffect(() => {
    dispatch({ type: CLEAR_PRODUCTS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => setPage((prevState) => prevState + 1);
  return (
    <>
      <StyledWrapper>
        {latestProducts.length > 0
          ? latestProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          : !loading && (
              <StyledAlert>There is no products to sell at now ☹</StyledAlert>
            )}
        {loading && <ProductsSkeleton />}
      </StyledWrapper>

      {fetchMore && (
        <StyledButton secondary onClick={loadMore}>
          Load more
        </StyledButton>
      )}
    </>
  );
};

export default LatestProducts;
