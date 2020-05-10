import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";

const StyledWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;
const StyledLi = styled.li`
  color: grey !important;
  padding: 5px;
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  font-style: italic;
  &::after {
    content: "/";
    margin-left: 3px;
  }
`;

const TagsSection = () => {
  return (
    <StyledWrapper>
      <StyledLi as={Link} to="/">
        Home page
      </StyledLi>
      <StyledLi>Women</StyledLi>
      <StyledLi>Bershka</StyledLi>
      <StyledLi>T-shirt</StyledLi>
    </StyledWrapper>
  );
};

export default TagsSection;
