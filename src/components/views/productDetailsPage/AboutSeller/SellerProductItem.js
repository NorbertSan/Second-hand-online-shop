import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { Link } from "react-router-dom";

// COMPONENTS
import ImageSlider from "components/products/ImageSlider";
import LikeButton from "components/products/LikeButton";

const StyledWrapper = styled.li`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px -2px grey;
`;
const StyledProductInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
  padding: 10px;
  span {
    color: grey;
    font-size: ${theme.fontSize.s};
    font-weight: bold;
  }
  div {
    position: relative;
  }
`;

const SellerProductItem = ({ product }) => {
  return (
    <StyledWrapper>
      <Link to={`/product/${product._id}`}>
        <ImageSlider images={product.images} />
      </Link>
      <StyledProductInformation>
        <span>{product.price.toFixed(2)} PLN</span>
        <div>
          <LikeButton likes={product.likes} product_id={product._id} />
        </div>
      </StyledProductInformation>
    </StyledWrapper>
  );
};

SellerProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default SellerProductItem;
