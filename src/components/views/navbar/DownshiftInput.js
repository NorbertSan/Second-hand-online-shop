import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import SearchIcon from "assets/icons/search.svg";

// COMPONENTS
import Downshift from "downshift";
import Input from "components/atoms/Input";

const StyledInput = styled(Input)`
  padding-left: 25px;
  color: ${theme.colors.blackish};
`;
const StyledWrapper = styled.div`
  position: relative;
`;
const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  width: 100%;
  box-shadow: 0 0 1px grey;
  color: grey;
`;
const StyledElement = styled.li`
  background: ${theme.colors.whiteish};
  border-top: 1px solid #eee;
  font-size: ${theme.fontSize.s};
  padding: 8px;
  color: ${theme.colors.blackish};
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
  z-index: 1;
`;
const StyledIcon = styled.img`
  width: 10px;
  height: 10px;
  z-index: -1;
`;

const DownshiftInput = ({
  searchList,
  name,
  placeholder,
  nickNameValue,
  handleInputChange,
  formRef,
}) => {
  return (
    <Downshift
      onInputValueChange={(value) => handleInputChange(value)}
      onChange={(e) => formRef.current.submit()}
      itemToString={(item) => (item ? item.value : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <StyledWrapper>
          <div
            style={{ display: "inline-block" }}
            {...getRootProps({}, { suppressRefError: true })}
          >
            <StyledButton type="submit">
              <StyledIcon src={SearchIcon} alt="search icon" />
            </StyledButton>
            <StyledInput
              placeholder={placeholder}
              name={name}
              {...getInputProps()}
              inputValue={nickNameValue}
            />
          </div>
          <StyledList {...getMenuProps()}>
            {isOpen
              ? searchList
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.value
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <StyledElement
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index
                              ? "#eee"
                              : theme.colors.whiteish,
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        },
                      })}
                    >
                      {item.value}
                    </StyledElement>
                  ))
              : null}
          </StyledList>
        </StyledWrapper>
      )}
    </Downshift>
  );
};
DownshiftInput.propTypes = {
  searchList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  nickNameValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  formRef: PropTypes.object.isRequired,
};

export default DownshiftInput;
