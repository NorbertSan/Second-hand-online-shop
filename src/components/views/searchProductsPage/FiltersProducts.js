import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
// filters
import {
  sizes,
  conditions,
  types,
  productsPerPage,
  genders,
} from "utils/productFilterData";
// COMPONENTS
import FilterLabel from "./FilterLabel";
import ClearFilters from "./ClearFilters";
// HOOKS
import useParseFiltersFromURL from "hooks/useParseFiltersFromURL";
import useDetectFiltersChange from "hooks/useDetectFiltersChange";

const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledFormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const StyledSelect = styled.select`
  padding: 6px;
  background: #eee;
  color: grey;
  margin-right: 10px;
  margin-bottom: 10px;
  option {
    width: 80%;
    padding: 0;
  }
`;
const StyledFilterList = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 7px 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const StyledOption = styled.option`
  &.selected {
    background: #cbe2b0;
  }
`;

const FiltersProducts = () => {
  const initialFilters = {
    type: [],
    condition: [],
    size: [],
    gender: [],
    brand: [],
    limit: [8],
    page: [1],
  };
  const [filters, setFilters] = useState(initialFilters);
  const [brands, setBrands] = useState([]);
  // GET BRANDS FROM DATABASE
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("/product/brands");
        setBrands(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBrands();
  }, []);

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
      <StyledFormWrapper>
        <StyledSelect value="" name="size" onChange={handleFilterChange}>
          <StyledOption value="" hidden>
            Size
          </StyledOption>
          {sizes.map((size) => (
            <StyledOption
              className={filters.size.includes(size.value) && "selected"}
              key={size.key}
              value={size.value}
            >
              {size.value}
            </StyledOption>
          ))}
        </StyledSelect>
        <StyledSelect value="" name="condition" onChange={handleFilterChange}>
          <StyledOption value="" hidden>
            Condition
          </StyledOption>
          {conditions.map((condition) => (
            <StyledOption
              className={
                filters.condition.includes(condition.value) && "selected"
              }
              key={condition.key}
              value={condition.value}
            >
              {condition.value}
            </StyledOption>
          ))}
        </StyledSelect>
        <StyledSelect value="" name="type" onChange={handleFilterChange}>
          <StyledOption value="" hidden>
            Type
          </StyledOption>
          {types.map((type) => (
            <StyledOption
              className={filters.type.includes(type.value) && "selected"}
              key={type.key}
              value={type.value}
            >
              {type.value}
            </StyledOption>
          ))}
        </StyledSelect>
        <StyledSelect value="" name="brand" onChange={handleFilterChange}>
          <StyledOption value="" hidden>
            Brand
          </StyledOption>
          {brands.map((brand, index) => (
            <StyledOption
              className={filters.brand.includes(brand) && "selected"}
              key={index}
              value={brand}
            >
              {brand}
            </StyledOption>
          ))}
        </StyledSelect>
        <StyledSelect value="" name="gender" onChange={handleFilterChange}>
          <StyledOption value="" hidden>
            Gender
          </StyledOption>
          {genders.map((gender) => (
            <StyledOption
              className={filters.gender.includes(gender.value) && "selected"}
              key={gender.key}
              value={gender.value}
            >
              {gender.value}
            </StyledOption>
          ))}
        </StyledSelect>
        <StyledSelect name="limit" onChange={handleLimitChange}>
          <StyledOption value="" hidden>
            Per page
          </StyledOption>
          {productsPerPage.map((amount) => (
            <StyledOption key={amount.key} value={amount.value}>
              {amount.value}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledFormWrapper>
      <StyledFilterList>
        {Object.keys(filters).map(
          (category) =>
            filters[category].length > 0 &&
            category !== "page" &&
            category !== "limit" &&
            filters[category].map((filter, index) => (
              <FilterLabel
                deleteFilter={deleteFilter}
                key={`${category}:${index}`}
                label={filter}
                category={category}
              />
            ))
        )}
      </StyledFilterList>
      <ClearFilters clearAllFilters={clearAllFilters} filters={filters} />
    </StyledWrapper>
  );
};

export default FiltersProducts;
