import React from "react";
import styled from "styled-components";
import SearchIcon from "assets/icons/search.svg";
import theme from "utils/theme";

// COMPONENTS
import Input from "components/atoms/Input";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background: ${theme.colors.whiteish};
  box-shadow: 0 0 1px grey;
`;
const StyledForm = styled.form`
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
const StyledDropDown = styled.select`
  padding: 7px 10px;
  border: none;
  background: #eee;
  border-radius: 5px;
  color: grey;
  border: none;
  outline: none;
  &:focus {
    border: 1px solid ${theme.colors.secondary};
  }
`;
const StyledOption = styled.option`
  color: grey;
`;

const SearchInput = () => {
  return (
    <StyledWrapper>
      <StyledDropDown>
        <StyledOption value="clothes">clothes</StyledOption>
        <StyledOption value="users">users</StyledOption>
      </StyledDropDown>
      <StyledForm action="/clothes">
        <StyledButton type="submit">
          <StyledIcon src={SearchIcon} alt="search icon" />
        </StyledButton>
        <StyledInput name="type" placeholder="Find the item" />
      </StyledForm>
    </StyledWrapper>
  );
};

export default SearchInput;
