import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import Button from "components/atoms/Button";
// REDUX
import { useDispatch } from "react-redux";
import { REMOVE_SHOPPING_LIST } from "redux/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  display: flex;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;
  img {
    width: 75px;
    height: 110px;
    margin-right: 10px;
    object-fit: cover;
  }
`;
const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledDescription = styled.p`
  margin: 0;
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  margin-bottom: 20px;
`;
const StyledLabel = styled.label`
  color: grey;
  font-size: ${theme.fontSize.xs};
  margin-bottom: 5px;
  ${({ price }) =>
    price &&
    css`
      font-weight: 300;
      font-size: ${theme.fontSize.s};
      margin-top: auto;
    `}
`;
const StyledRemoveButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  color: grey;
  font-size: ${theme.fontSize.xs};
`;
const StyledButton = styled(Button)`
  width: 60px;
  font-weight: 300;
  height: 22px;
  margin-top: 20px;
`;

const ShoppingCardProduct = ({ product }) => {
  const dispatch = useDispatch();
  const removeProduct = () =>
    dispatch({ type: REMOVE_SHOPPING_LIST, payload: product._id });
  return (
    <StyledWrapper>
      <img src={`${BASE_URL}/${product.images[0]}`} alt="product" />
      <StyledContentWrapper>
        <StyledDescription>
          {product.description.substr(0, 100)}
        </StyledDescription>
        <StyledLabel>Size : {product.size}</StyledLabel>
        <StyledLabel>Brand : {product.brand}</StyledLabel>
        <StyledLabel price>{product.price} PLN</StyledLabel>
        <StyledRemoveButton onClick={removeProduct}>Remove</StyledRemoveButton>
        <StyledButton
          black="black"
          small="small"
          as={Link}
          to={`/finalization/${product._id}`}
        >
          ORDER
        </StyledButton>
      </StyledContentWrapper>
    </StyledWrapper>
  );
};

ShoppingCardProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ShoppingCardProduct;
