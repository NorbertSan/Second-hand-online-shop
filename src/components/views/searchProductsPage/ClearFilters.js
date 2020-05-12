import React from "react";
import theme from "utils/theme";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "components/atoms/Button";
const StyledButton = styled(Button)`
  margin: 5px;
  border-radius: 30px;
  padding: 7px 5px;
  font-size: ${theme.fontSize.xs}!important;
  text-transform: capitalize;
  align-self: flex-start;
`;

const ClearFilters = ({ filters, clearAllFilters }) => {
  // DISCOUNT PAGE AND LIMIT FILTERS
  const filtersKeys = Object.keys(filters);
  const valuesArr = Object.values(filters).reduce((res, cur, index) => {
    if (filtersKeys[index] === "page" || filtersKeys[index] === "limit")
      return res;
    return [...res, ...cur];
  }, []);
  return (
    <>
      {valuesArr.length > 0 ? (
        <StyledButton onClick={clearAllFilters} secondary>
          Clear all filters
        </StyledButton>
      ) : null}
    </>
  );
};

ClearFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
};

export default ClearFilters;
