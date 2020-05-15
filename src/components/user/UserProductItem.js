import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { Link, useLocation } from "react-router-dom";

// COMPONENTS
import ImageSlider from "components/products/ImageSlider";

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
`;

const UserProductItem = ({ product }) => {
  const { pathname } = useLocation();
  return (
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
      </StyledProductInformation>
    </StyledWrapper>
  );
};

UserProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default UserProductItem;
