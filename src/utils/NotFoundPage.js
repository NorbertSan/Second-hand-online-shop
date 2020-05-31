import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// ICON
import NotFoundIcon from "assets/icons/notFound.svg";
import Button from "components/atoms/Button";

const StyledWrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  max-width: 480px;
  margin: auto;
  padding: 30px;
`;
const StyledTitle = styled.h2`
  text-align: center;
  font-size: 18px;
  ${({ big }) =>
    big &&
    css`
      font-size: 34px;
    `}
`;
const StyledIcon = styled.img`
  width: 100px;
  margin-bottom: 40px;
`;
const StyledButton = styled(Button)`
  margin: 6px 0;
  width: 170px;
`;

const ProductNotFound = ({ title, info }) => {
  return (
    <StyledWrapper>
      <StyledIcon src={NotFoundIcon} alt="not found icon" />
      <StyledTitle big>{title}</StyledTitle>
      <StyledTitle as="h4">{info}</StyledTitle>
      <StyledButton as={Link} to="/">
        Back to home
      </StyledButton>
      <StyledButton as={Link} to="/products" secondary="secondary">
        Browse products
      </StyledButton>
    </StyledWrapper>
  );
};

ProductNotFound.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default ProductNotFound;
