import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ErrorCheck from "assets/icons/errorCheck.svg";
// REDUX
import { useDispatch } from "react-redux";
import { REMOVE_SHOPPING_LIST } from "redux/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 6px;
  text-align: center;
  font-size: 11px;
  color: grey;
  border-bottom: 1px solid #eee;
  position: relative;
  &:hover {
    filter: invert(0.4);
  }
`;
const StyledProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
`;
const StyledRemoveButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  img {
    width: 100%;
  }
`;

const ShoppingCardProduct = ({ product }) => {
  const dispatch = useDispatch();
  const removeProduct = () =>
    dispatch({ type: REMOVE_SHOPPING_LIST, payload: product._id });
  return (
    <StyledWrapper>
      <StyledProduct>
        <img src={`${BASE_URL}/${product.images[0]}`} alt="product" />
        <span>{product.type}</span>
      </StyledProduct>
      <span>{product.writer.nickName}</span>
      <span>22.00 PLN</span>
      <span>{product.size}</span>
      <StyledRemoveButton onClick={removeProduct}>
        <img src={ErrorCheck} alt="delete icon" />
      </StyledRemoveButton>
    </StyledWrapper>
  );
};

ShoppingCardProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ShoppingCardProduct;
