import React, { useState } from "react";
import styled from "styled-components";
// COMPONENTS
import ClearFilters from "./ClearFilters";
import FiltersList from "./FiltersList";
import SelectElements from "./SelectElements";
// HOOKS
import useParseFiltersFromURL from "hooks/useParseFiltersFromURL";
import useDetectFiltersChange from "hooks/useDetectFiltersChange";

const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const initialFilters = {
  type: [],
  condition: [],
  size: [],
  gender: [],
  brand: [],
  limit: [8],
  page: [1],
};
const FiltersProducts = () => {
  const [filters, setFilters] = useState(initialFilters);
  useParseFiltersFromURL(setFilters, initialFilters);
  useDetectFiltersChange(filters);

  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters((prevState) => ({
      ...prevState,
      [name]: [...prevState[name], value].filter(
        (item, index, arr) => arr.indexOf(item) === index
      ),
      page: [1],
    }));
  };

  const handleLimitChange = (e) => {
    const value = [e.target.value];
    setFilters((prevState) => ({
      ...prevState,
      limit: value,
      page: [1],
    }));
  };

  const deleteFilter = (filterName, category) => {
    setFilters((prevState) => ({
      ...prevState,
      [category]: [...prevState[category]].filter(
        (item) => item !== filterName
      ),
    }));
  };

  const clearAllFilters = () => setFilters(initialFilters);
  return (
    <StyledWrapper onSubmit={(e) => e.preventDefault()}>
      <SelectElements
        handleFilterChange={handleFilterChange}
        handleLimitChange={handleLimitChange}
        filters={filters}
      />
      <FiltersList filters={filters} deleteFilter={deleteFilter} />
      <ClearFilters clearAllFilters={clearAllFilters} filters={filters} />
    </StyledWrapper>
  );
};

export default FiltersProducts;
