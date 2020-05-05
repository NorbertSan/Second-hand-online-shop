import React from "react";
import styled from "styled-components";

import ClothesItem from "./ClothesItem";

const StyledWrapper = styled.ul`
  margin: 30px 0;
  padding: 0 15px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const ClothesItemsGrid = () => {
  return (
    <StyledWrapper>
      <ClothesItem />
      <ClothesItem />
      <ClothesItem />
      <ClothesItem />
    </StyledWrapper>
  );
};

export default ClothesItemsGrid;
