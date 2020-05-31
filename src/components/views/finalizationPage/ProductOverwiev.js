import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.div`
  margin-bottom: 30px;
  background: #eee;
  padding: 10px;
  display: flex;
  color: grey;
`;
const StyledImage = styled.img`
  width: 40px;
  margin-right: 30px;
`;
const StyledContentWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const StyledPrice = styled.li`
  margin-top: 6px;
  font-weight: 300;
  font-size: ${theme.fontSize.s};
`;
const StyledLabel = styled.li`
  text-transform: uppercase;
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
`;

const ProductOverwiev = () => {
  const { product_id } = useParams();
  const history = useHistory();
  const shoppingList = useSelector((state) => state.data.shoppingList);
  const [product, setProduct] = useState(undefined);
  useEffect(() => {
    // prevent situation when product is not in shopping card, then redirect to home
    const product = shoppingList.find((product) => product._id === product_id);
    if (product) setProduct(product);
    else history.push("/");
  }, [product_id, shoppingList, history]);

  return (
    <StyledWrapper>
      {product && (
        <>
          <StyledImage
            src={`${BASE_URL}/${product.images[0]}`}
            alt="product image"
          />
          <StyledContentWrapper>
            <StyledLabel>Brand : {product.brand}</StyledLabel>
            <StyledLabel>Size : {product.size}</StyledLabel>
            <StyledPrice>{product.price.toFixed(2)} PLN</StyledPrice>
          </StyledContentWrapper>
        </>
      )}
    </StyledWrapper>
  );
};

export default ProductOverwiev;
