import React from "react";
import styled from "styled-components";
import SearchIcon from "assets/icons/search.svg";

// COMPONENTS
import Input from "components/atoms/Input";
const StyledWrapper = styled.form`
  position: relative;
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  width: 15px;
  height: 15px;
  margin: 0;
  padding: 0;
  background: transparent;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
`;
const StyledIcon = styled.img`
  width: 10px;
  height: 10px;
  z-index: -1;
`;
const StyledInput = styled(Input)`
  padding-left: 25px;
  color: grey;
`;

const SearchInput = () => {
  return (
    <StyledWrapper>
      <StyledButton type="submit">
        <StyledIcon src={SearchIcon} alt="search icon" />
      </StyledButton>
      <StyledInput placeholder="Find the item" />
    </StyledWrapper>
  );
};

export default SearchInput;
