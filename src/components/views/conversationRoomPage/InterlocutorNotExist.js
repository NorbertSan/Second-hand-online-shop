import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useParams, Link } from "react-router-dom";
import BackArrow from "assets/icons/backArrow.svg";
import MagnifierIcon from "assets/icons/magnifier.svg";

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  span {
    color: ${theme.colors.redish};
    font-weight: 900;
  }
`;
const StyledBackButton = styled.button`
  padding: 2px;
  margin: 0;
  border: none;
  background: none;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 20px;
  left: 10px;
  z-index: 9;
  img {
    width: 100%;
  }
`;
const StyledImage = styled.img`
  margin-top: 50px;
  width: 100px;
`;

const InterlocutorNotExist = () => {
  const { nickName } = useParams();
  return (
    <StyledWrapper>
      <StyledBackButton as={Link} to="/messages">
        <img src={BackArrow} alt="back arrow" />
      </StyledBackButton>
      <h2>Something went wrong</h2>
      <h5>
        User with nick <span>{nickName}</span> not found
      </h5>
      <StyledImage src={MagnifierIcon} alt="magnifier" />
    </StyledWrapper>
  );
};

export default InterlocutorNotExist;
