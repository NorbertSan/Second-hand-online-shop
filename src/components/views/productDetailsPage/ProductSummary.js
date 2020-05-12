import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import moment from "moment";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  background: #eee;
  padding: 15px;
  color: grey;
`;
const StyledInnerWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSize.xs};
  margin-bottom: 7px;
`;
const StyledLabel = styled.label`
  text-transform: uppercase;
  font-weight: bold;
`;
const StyledDescription = styled.p`
  margin-top: 20px;
  color: ${theme.colors.blackish};
  font-size: ${theme.fontSize.s};
`;

const ProductSummary = ({ product }) => {
  return (
    <StyledWrapper>
      <h3>{product.price} zł</h3>
      <StyledInnerWrapper>
        <StyledLi>
          <StyledLabel>Brand</StyledLabel>
          <span>{product.brand}</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Size</StyledLabel>
          <span>{product.size}</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Condition</StyledLabel>
          <span>{product.condition}</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Location</StyledLabel>
          <span>{product.writer.location}</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Views</StyledLabel>
          <span>{product.views}</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Added</StyledLabel>
          <span>{moment(product.createdAt).fromNow()}</span>
        </StyledLi>
      </StyledInnerWrapper>
      <StyledDescription>{product.description}</StyledDescription>
    </StyledWrapper>
  );
};

ProductSummary.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductSummary;
