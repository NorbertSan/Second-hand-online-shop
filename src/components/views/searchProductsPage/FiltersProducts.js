import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
// filters
import {
  sizes,
  conditions,
  types,
  productsPerPage,
} from "utils/productFilterData";
// COMPONENTS
import FilterLabel from "./FilterLabel";

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
  border: none;
  box-shadow: 0 0 1px grey;
`;

const StyledFilterList = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 7px 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const FiltersProducts = ({ page, setPage }) => {
  const [limit, setLimit] = useState(8);
  const history = useHistory();
  const [filters, setFilters] = useState({
    type: [],
    condition: [],
    size: [],
  });
  const location = useLocation();
  useEffect(() => {
    const query = queryString.parse(location.search);
    setFilters({
      type: query.type
        ? typeof query.type === "object"
          ? [...query.type]
          : [query.type]
        : [],
      condition: query.condition
        ? typeof query.condition === "object"
          ? [...query.condition]
          : [query.condition]
        : [],
      size: query.size
        ? typeof query.size === "object"
          ? [...query.size]
          : [query.size]
        : [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let newUrl = "/products?";
    Object.keys(filters).map(
      (category) =>
        filters[category].length > 0 &&
        filters[category].map((filter) => (newUrl += `&${category}=${filter}`))
    );
    newUrl += `&page=${page}`;
    newUrl += `&limit=${limit}`;
    history.push(newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, limit]);

  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPage(1);
    setFilters((prevState) => ({
      ...prevState,
      [name]: [...prevState[name], value].filter(
        (item, index, arr) => arr.indexOf(item) === index
      ),
    }));
  };

  const handleLimitChange = (e) => {
    setPage(1);
    setLimit(e.target.value);
  };

  const deleteFilter = (filterName, category) => {
    setFilters((prevState) => ({
      ...prevState,
      [category]: [...prevState[category]].filter(
        (item) => item !== filterName
      ),
    }));
  };
  return (
    <StyledWrapper>
      <StyledFormWrapper>
        <StyledSelect name="size" onChange={handleFilterChange}>
          <option value="" hidden>
            Size
          </option>
          {sizes.map((size) => (
            <option key={size.key} value={size.value}>
              {size.value}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect name="condition" onChange={handleFilterChange}>
          <option value="" hidden>
            Condition
          </option>
          {conditions.map((condition) => (
            <option key={condition.key} value={condition.value}>
              {condition.value}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect name="type" onChange={handleFilterChange}>
          <option value="" hidden>
            Type
          </option>
          {types.map((type) => (
            <option key={type.key} value={type.value}>
              {type.value}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect name="limit" onChange={handleLimitChange}>
          <option value="" hidden>
            Per page
          </option>
          {productsPerPage.map((amount) => (
            <option key={amount.key} value={amount.value}>
              {amount.value}
            </option>
          ))}
        </StyledSelect>
      </StyledFormWrapper>
      <StyledFilterList>
        {Object.keys(filters).map(
          (category) =>
            filters[category].length > 0 &&
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
    </StyledWrapper>
  );
};

FiltersProducts.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
export default FiltersProducts;
