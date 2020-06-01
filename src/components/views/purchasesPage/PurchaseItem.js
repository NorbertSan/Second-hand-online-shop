import React, { useState } from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import moment from "moment";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Input from "components/atoms/Input";
import { ReactComponent as RightIcon } from "assets/icons/simpleRightArrow.svg";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
`;
const StyledMoreInfoWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 10px;
  display: none;
  ${({ open }) =>
    open &&
    css`
      display: block;
      visibility: visible;
    `};
`;
const StyledFieldWrapper = styled.li`
  display: flex;
  font-size: ${theme.fontSize.xs};
  align-items: center;
  margin-bottom: 3px;
  label {
    margin-right: 5px;
    min-width: 50px;
    font-weight: bold;
  }
  input {
    border: none;
    padding: 3px 10px;
    flex: 1;
    font-size: ${theme.fontSize.xs};
    color: ${theme.colors.blackish};
  }
  &.link input {
    font-style: italic;
  }
`;

const StyledInnerWrapper = styled.div`
  padding: 10px;
  display: flex;
  position: relative;
  z-index: 2;
  background: ${theme.colors.whiteish};
  img {
    width: 60px;
    margin-right: 30px;
  }
`;
const StyledCommonInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${theme.fontSize.xs};
  span {
    margin-bottom: 12px;
  }
`;
const StyledRightIcon = styled(RightIcon)`
  position: absolute;
  width: 12px;
  right: 30px;
  bottom: 10px;
  transform: translateY(-50%) rotate(90deg);
  ${({ open }) =>
    open &&
    css`
      transform: translateY(-50%) rotate(-90deg);
    `}
`;

const PurchaseItem = ({ purchase }) => {
  const location = useLocation();
  const [isAdditionalInfoOpen, setAdditionalInfoOpen] = useState(false);
  const formatedAddress = `${purchase.addressData.zipCode} ${purchase.addressData.city}, ${purchase.addressData.street} ${purchase.addressData.buildingNumber}`;
  return (
    <StyledWrapper>
      <StyledInnerWrapper
        onClick={() => setAdditionalInfoOpen((prevState) => !prevState)}
      >
        <img src={`${BASE_URL}/${purchase.product.images[0]}`} alt="product " />
        <StyledCommonInfo>
          <span>{moment(purchase.createdAt).calendar()}</span>
          <span>{purchase.product.price} PLN</span>
        </StyledCommonInfo>
        <StyledRightIcon open={isAdditionalInfoOpen} />
      </StyledInnerWrapper>
      <StyledMoreInfoWrapper open={isAdditionalInfoOpen}>
        <StyledFieldWrapper>
          <label htmlFor="recipient">Recipient :</label>
          <Input disabled secondary value={purchase.recipientData.fullName} />
        </StyledFieldWrapper>
        <StyledFieldWrapper>
          <label htmlFor="address">Address :</label>
          <Input disabled secondary value={formatedAddress} />
        </StyledFieldWrapper>
        <StyledFieldWrapper>
          <label htmlFor="telephone">Telephone :</label>
          <Input
            disabled
            secondary
            value={purchase.recipientData.telephoneNumber}
          />
        </StyledFieldWrapper>
        <StyledFieldWrapper
          className="link"
          as={Link}
          to={`/user/${purchase.product.writer.nickName}`}
        >
          <label htmlFor="seller">Seller :</label>
          <Input disabled secondary value={purchase.product.writer.nickName} />
        </StyledFieldWrapper>
        <StyledFieldWrapper
          className="link"
          as={Link}
          to={{
            pathname: `/product/${purchase.product._id}`,
            state: { prevPath: location.pathname },
          }}
        >
          <label htmlFor="product">Product :</label>
          <Input disabled secondary value={purchase.product.type} />
        </StyledFieldWrapper>
      </StyledMoreInfoWrapper>
    </StyledWrapper>
  );
};

PurchaseItem.propTypes = {
  purchase: PropTypes.object.isRequired,
};

export default PurchaseItem;
