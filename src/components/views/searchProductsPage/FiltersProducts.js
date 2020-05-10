import React, { useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.form``;

const FiltersProducts = ({ setFiltersParent }) => {
  const [filters, setFilters] = useState({});
  return (
    <StyledWrapper onChange>
      <input type="checkbox" name="filter" value="test" />
    </StyledWrapper>
  );
};
export default FiltersProducts;
