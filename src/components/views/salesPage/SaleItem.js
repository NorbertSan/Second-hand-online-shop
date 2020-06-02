import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import theme from "utils/theme";
import PurchaserInformation from "./PurchaserInformation";
import PurchaserAddressInformation from "./PurchaserAddressInformation";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  display: flex;

  padding: 10px;
  border-bottom: 1px solid ${theme.colors.blackish};
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  img {
    width: 60px;
    height: 80px;
  }
  span {
    margin-top: 6px;
    text-align: center;
    font-size: ${theme.fontSize.xs};
    font-weight: bold;
    color: ${theme.colors.greenish};
  }
`;

const SaleItem = ({ sale }) => {
  const location = useLocation();
  return (
    <StyledWrapper>
      <StyledProductWrapper
        as={Link}
        to={{
          pathname: `/product/${sale.product._id}`,
          state: { prevPath: location.pathname },
        }}
      >
        <img src={`${BASE_URL}/${sale.product.images[0]}`} alt="product" />
        <span>+{sale.product.price} PLN</span>
      </StyledProductWrapper>
      <StyledContent>
        <PurchaserInformation sale={sale} />
        <PurchaserAddressInformation sale={sale} />
      </StyledContent>
    </StyledWrapper>
  );
};

SaleItem.propTypes = {
  sale: PropTypes.object.isRequired,
};

export default SaleItem;
