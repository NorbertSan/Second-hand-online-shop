import React from "react";
import styled from "styled-components";
import theme from "utils/theme";

const StyledWrapper = styled.select`
  padding: 7px 10px;
  border: none;
  background: #eee;
  border-radius: 5px;
  color: grey;
  border: none;
  outline:none;
  &:focus {
    border:1px solid ${theme.colors.secondary};
    /* background: ${theme.colors.secondary}; */
  }
`;
const StyledOption = styled.option`
  color: grey;
`;

const DropDownSearch = () => {
  return (
    <StyledWrapper>
      <StyledOption value="clothes">clothes</StyledOption>
      <StyledOption value="users">users</StyledOption>
    </StyledWrapper>
  );
};

export default DropDownSearch;
