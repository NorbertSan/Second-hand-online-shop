import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
// COMPONENTS
import NickName from "components/atoms/NickName";
import LikeButton from "./LikeButton";
import ImageSlider from "./ImageSlider";
import DefaultAvatar from "utils/DefaultAvatar";

const StyledWrapper = styled.li`
  position: relative;
  background: #eee;
  box-shadow: 0 0 3px #fff;
  padding: 3px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0px;
    height: 10px;
    width: 2px;
    background: ${theme.colors.primary};
  }
  &:before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0;
    height: 2px;
    width: 10px;
    background: ${theme.colors.primary};
  }
`;
const StyledAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px;
`;
const StyledProductInformation = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 7px;
  span {
    color: grey;
    font-size: ${theme.fontSize.xs};
    font-weight: bold;
    margin-bottom: 3px;
  }
`;

const ProductItem = ({ product }) => {
  const { pathname, search } = useLocation();
  return (
    <StyledWrapper>
      <StyledAuthorInfo as={Link} to={`/user/${product.writer.nickName}`}>
        <DefaultAvatar
          avatar={product.writer.avatar}
          productItem
          nickName={product.writer.nickName}
        />
        <NickName black>{product.writer.nickName}</NickName>
      </StyledAuthorInfo>
      <Link
        to={{
          pathname: `/product/${product._id}`,
          state: { prevPath: `${pathname}${search}` },
        }}
      >
        <ImageSlider images={product.images} />
      </Link>
      <StyledProductInformation>
        <LikeButton likes={product.likes} product_id={product._id} />
        <span>Price : {product.price.toFixed(2)} PLN</span>
        <span>Size : {product.size}</span>
        <span>Brand : {product.brand}</span>
      </StyledProductInformation>
    </StyledWrapper>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
