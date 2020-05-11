import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
// FILTERS
import { types } from "utils/productFilterData";
// COMPONENTS
import Downshift from "downshift";
import Input from "components/atoms/Input";

const StyledInput = styled(Input)`
  padding-left: 25px;
  color: grey;
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
`;

const DownshiftInput = ({ setFiltersParent }) => {
  return (
    <Downshift
      onChange={(selection) => {
        setFiltersParent(selection);
      }}
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
            <StyledInput
              name="type"
              placeholder="Find the item"
              {...getInputProps()}
            />
          </div>
          <StyledList {...getMenuProps()}>
            {isOpen
              ? types
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

export default DownshiftInput;
