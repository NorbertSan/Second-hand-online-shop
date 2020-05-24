import React, { useRef, useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
// COMP
import Button from "components/atoms/Button";
// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";
// REDUX STUFF
import { useDispatch } from "react-redux";
import { deleteProduct } from "redux/actions/dataActions";

const StyledWrapper = styled.div`
  position: absolute;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0 0 2px ${theme.colors.blackish};
  padding: 10px 5px;
  right: 10px;
  bottom: 30px;
  z-index: 10;
  width: 160px;
  height: 100px;
  text-align: center;
  h5 {
    font-size: ${theme.fontSize.xs};
    font-weight: bold;
    color: ${theme.colors.redish};
    margin: 0;
  }
`;
const StyledButton = styled(Button)`
  padding: 3px 6px;
  font-size: ${theme.fontSize.xs}!important;
  align-self: center;
`;

const DeleteUserProduct = ({ product_id, toggleDeleteFormOpen }) => {
  const deleteFormRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product_id, setLoading));
  };
  useDetectClickOutside(deleteFormRef, toggleDeleteFormOpen);
  return (
    <StyledWrapper ref={deleteFormRef}>
      <h5>Are you sure to delete this product ?</h5>
      <StyledButton onClick={handleDeleteProduct}>Delete</StyledButton>
    </StyledWrapper>
  );
};

DeleteUserProduct.propTypes = {
  product_id: PropTypes.string.isRequired,
  toggleDeleteFormOpen: PropTypes.func.isRequired,
};

export default DeleteUserProduct;
