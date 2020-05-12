import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
// ICON
import xIcon from "assets/icons/xIcon.svg";

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

const StyledIcon = styled.img`
  position: absolute;
  width: 6px;
  height: 6px;
  top: 5px;
  right: 5px;
`;
const FilterLabel = ({ label, category, deleteFilter }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteFilter(label, category);
  };
  return (
    <StyledWrapper onClick={handleDeleteClick}>
      <span>{label}</span>
      <StyledIcon src={xIcon} alt="close icon" />
    </StyledWrapper>
  );
};

FilterLabel.propTypes = {
  label: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  deleteFilter: PropTypes.func.isRequired,
};
export default FilterLabel;
