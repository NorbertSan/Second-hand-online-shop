import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";

const StyledWrapper = styled.div`
  background: #eee;
  border-radius: 20px;
  height: 30px;
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  margin: 5px;
`;

const FilterLabel = ({ label, category, deleteFilter }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteFilter(label, category);
  };
  return (
    <StyledWrapper onClick={handleDeleteClick}>
      <span>{label}</span>
    </StyledWrapper>
  );
};

FilterLabel.propTypes = {
  label: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  deleteFilter: PropTypes.func.isRequired,
};
export default FilterLabel;
