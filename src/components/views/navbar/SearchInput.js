import React, { useState, useRef } from "react";
import styled from "styled-components";
import theme from "utils/theme";
// FILTERS
import { types } from "utils/productFilterData";
// HOOK
import useSearchUsers from "hooks/useSearchUsers";
// COMPONENTS
import DownshiftInput from "./DownshiftInput";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  max-width: 960px;
  margin: auto;
  background: ${theme.colors.whiteish};
  top: 1px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 1px;
    background: #eee;
  }
  @media screen and (max-width: 960px) {
    padding-left: 10px;
  }
`;
const StyledInputSearchWrapper = styled.form`
  position: relative;
`;

const StyledDropDown = styled.select`
  padding: 7px 10px;
  margin-right: 30px;
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
  const [searchType, setSearchType] = useState("products");
  const handleTypeChange = (e) => setSearchType(e.target.value);
  const formRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [userNickNameList, setUserNickNameList] = useState([]);
  useSearchUsers(setUserNickNameList, inputValue, searchType);
  const handleInputChange = (value) => setInputValue(value);
  const handleElementChange = () => formRef.current.submit();

  return (
    <StyledWrapper>
      <StyledDropDown onChange={handleTypeChange}>
        <StyledOption value="products">Clothes</StyledOption>
        <StyledOption value="user">Users</StyledOption>
      </StyledDropDown>
      <StyledInputSearchWrapper ref={formRef} action={`/${searchType}`}>
        <DownshiftInput
          nickNameValue={inputValue}
          handleInputChange={handleInputChange}
          placeholder={
            searchType === "products" ? "Find the product" : "Enter user nick"
          }
          name={searchType === "products" ? "type" : "nickName"}
          searchList={searchType === "products" ? types : userNickNameList}
          formRef={formRef}
          handleElementChange={handleElementChange}
        />
      </StyledInputSearchWrapper>
    </StyledWrapper>
  );
};

export default SearchInput;
