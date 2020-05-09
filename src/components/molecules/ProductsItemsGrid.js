import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

// COMPONENTS
import ProductItem from "./ProductItem";
import Button from "components/atoms/Button";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "redux/actions/dataActions";

const StyledWrapper = styled.ul`
  margin: 30px 0;
  padding: 0 15px 60px 15px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: 20px;
  justify-content: center;
  width: 100%;
  position: relative;
`;
const StyledButton = styled(Button)`
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
`;

const ProductsItemsGrid = () => {
  const limit = 8;
  const [skip, setSkip] = useState(0);
  const products = useSelector((state) => state.data.products);
  const [fetchMore, setFetchMore] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const variables = { skip, limit };
    getProductsHandle(variables);
  }, []);
  const loadMore = () => {
    const variables = {
      skip: skip + limit,
      limit,
    };
    getProductsHandle(variables);
    setSkip(skip + limit);
  };
  useEffect(() => {
    setFetchMore(products.length % 8 === 0);
  }, [products]);
  const getProductsHandle = (variables) => dispatch(getProducts(variables));

  return (
    <StyledWrapper>
      {products &&
        products.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      {fetchMore && (
        <StyledButton secondary onClick={loadMore}>
          Load more
        </StyledButton>
      )}
    </StyledWrapper>
  );
};

export default ProductsItemsGrid;
