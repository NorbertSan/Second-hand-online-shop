import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import moment from "moment";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  background: #eee;
  padding: 15px;
  color: grey;
`;
const StyledInnerWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSize.xs};
  margin-bottom: 7px;
`;
const StyledLabel = styled.label`
  text-transform: uppercase;
  font-weight: bold;
`;
const StyledDescription = styled.p`
  margin-top: 20px;
  color: ${theme.colors.blackish};
  font-size: ${theme.fontSize.s};
`;

const ClothesItemSummary = () => {
  return (
    <StyledWrapper>
      <h3>29,99 zł</h3>
      <StyledInnerWrapper>
        <StyledLi>
          <StyledLabel>Brand</StyledLabel>
          <span>Berschka</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Size</StyledLabel>
          <span>36.5</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Condition</StyledLabel>
          <span>New</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Location</StyledLabel>
          <span>Kielce,Poland</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Views</StyledLabel>
          <span>167</span>
        </StyledLi>
        <StyledLi>
          <StyledLabel>Added</StyledLabel>
          <span>{moment(Date.now()).fromNow()}</span>
        </StyledLi>
      </StyledInnerWrapper>
      <StyledDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        nemo numquam repellendus harum libero. Repellendus quibusdam dolore illo
        aliquid quisquam!
      </StyledDescription>
    </StyledWrapper>
  );
};

export default ClothesItemSummary;
