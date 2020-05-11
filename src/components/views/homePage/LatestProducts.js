import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// COMPONENTS
import Button from "components/atoms/Button";
import ProductItem from "components/products/ProductItem";
import ProductsSkeleton from "components/products/ProductsSkeleton";

const StyledWrapper = styled.div`
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
const StyledButton = styled(Button)`
  margin: 0 auto 15px;
`;

const LatestProducts = () => {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const variable = { limit, page };
      const res = await axios.post("/product", variable);
      setLatestProducts((prevState) => [...prevState, ...res.data.products]);
      setLoading(false);
    } catch (err) {
      console.error(err.reponse);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFetchMore(
      latestProducts.length === 0 ? true : latestProducts.length % limit !== 0
    );
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = () => setPage((prevState) => prevState + 1);

  return (
    <>
      <StyledWrapper>
        {latestProducts.length > 0 &&
          latestProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
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
