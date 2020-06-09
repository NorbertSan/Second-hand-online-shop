import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FilterLabel from "./FilterLabel";

const StyledWrapper = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 7px 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const FiltersList = ({ filters, deleteFilter }) => {
  return (
    <StyledWrapper>
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
    </StyledWrapper>
  );
};

FiltersList.propTypes = {
  filters: PropTypes.object.isRequired,
  deleteFilter: PropTypes.func.isRequired,
};

export default FiltersList;
