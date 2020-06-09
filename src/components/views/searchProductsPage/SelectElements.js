import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// HOOK
import useGetBrands from "hooks/useGetBrands";
// filters
import {
  sizes,
  conditions,
  types,
  genders,
  productsPerPage,
} from "utils/productFilterData";

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
  text-transform: capitalize;
`;
const StyledOption = styled.option`
  &.selected {
    background: #cbe2b0;
  }
`;

const filtersTypes = [sizes, types, conditions, genders, productsPerPage];
const filtersNames = ["size", "type", "condition", "gender", "limit"];

const SelectElements = ({ handleFilterChange, handleLimitChange, filters }) => {
  const [selectsElements, setSelectsElements] = useState([]);
  const setBrands = (brands) => {
    filtersTypes.push(brands);
    filtersNames.push("brand");
  };
  useGetBrands(setBrands);
  useEffect(() => {
    const elements = filtersTypes.reduce(
      (result, category, index) => [
        ...result,
        <StyledSelect
          key={index}
          value=""
          name={filtersNames[index]}
          onChange={
            filtersNames[index] === "limit"
              ? handleLimitChange
              : handleFilterChange
          }
        >
          <StyledOption value="" hidden>
            {filtersNames[index] === "limit" ? "per page" : filtersNames[index]}
          </StyledOption>
          {category.map((option) => (
            <StyledOption
              className={
                filters[filtersNames[index]].includes(option.value) &&
                "selected"
              }
              key={option.key}
              value={option.value}
            >
              {option.value}
            </StyledOption>
          ))}
        </StyledSelect>,
      ],
      []
    );
    setSelectsElements(elements);
  }, [filters, handleFilterChange, handleLimitChange]);
  return <StyledFormWrapper>{selectsElements}</StyledFormWrapper>;
};

SelectElements.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleLimitChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default SelectElements;
