import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "utils/theme";
import womenSearchingClothes from "assets/images/womenSearchingClothes.jpg";

// COMPONENTS
import Button from "components/atoms/Button";
import LatestProducts from "./LatestProducts";

const StyledWrapper = styled.section``;
const StyledHero = styled.img`
  height: 300px;
`;
const StyledWellcomeInfo = styled.section`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
`;
const StyledTitle = styled.h2`
  margin-top: 60px;
  color: ${theme.colors.primary};
  text-align: center;
`;

const homePage = () => (
  <StyledWrapper>
    <StyledHero src={womenSearchingClothes} alt="womenSearchingClothes" />
    <StyledWellcomeInfo>
      <h4>Ready to show you clothes ? </h4>
      <Button as={Link} to="/add_product">
        Start selling
      </Button>
    </StyledWellcomeInfo>
    <StyledTitle>Latest adverts</StyledTitle>
    <LatestProducts />
  </StyledWrapper>
);

export default homePage;
