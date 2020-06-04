import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ErrorCheck } from "assets/icons/errorCheck.svg";
// COMPONENTS
import ImageSlider from "components/products/ImageSlider";
import DeleteUserProduct from "./DeleteUserProduct";
import { useSelector } from "react-redux";

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
  position: relative;
  span {
    color: grey;
    font-size: ${theme.fontSize.s};
    font-weight: bold;
  }
`;
const StyledDeleteButton = styled.button`
  width: 18px;
  height: 18px;
  margin: 0;
  padding: 2px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: transparent;
  border: none;
`;

const UserProductItem = ({ product }) => {
  const { nickName } = useParams();
  const { nickName: loggedUserNickName, auth } = useSelector(
    (state) => state.user
  );
  const { pathname } = useLocation();
  const [isDeleteFormOpen, toggleDeleteFormOpen] = useState(false);
  return (
    <>
      <StyledWrapper>
        <Link
          to={{
            pathname: `/product/${product._id}`,
            state: { prevPath: pathname },
          }}
        >
          <ImageSlider images={product.images} />
        </Link>
        <StyledProductInformation>
          <span>{product.price.toFixed(2)} PLN</span>
          {isDeleteFormOpen && (
            <DeleteUserProduct
              toggleDeleteFormOpen={toggleDeleteFormOpen}
              product_id={product._id}
            />
          )}
          {auth && nickName === loggedUserNickName && (
            <StyledDeleteButton onClick={() => toggleDeleteFormOpen(true)}>
              <ErrorCheck />
            </StyledDeleteButton>
          )}
        </StyledProductInformation>
      </StyledWrapper>
    </>
  );
};

UserProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default UserProductItem;
