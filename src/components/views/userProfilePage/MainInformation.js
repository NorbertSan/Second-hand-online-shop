import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

import dummyPhoto from "assets/images/dummyPhoto.jpg";
// ICON
import RightIcon from "assets/icons/simpleRightArrow.svg";
// COMPONENTS
import FuncionalityIcons from "./FuncionalityIcons";

const StyledWrapper = styled.section`
  display: flex;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  position: relative;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    background: rgba(0, 0, 0, 0.01);
  }
`;
const StyledAvatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 15px;
`;
const StyledInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: grey;
    font-size: 11px;
    margin-bottom: 3px;
  }
`;
const StyledTitle = styled.h1`
  margin: 10px 0;
`;
const StyledIcon = styled.img`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const MainInformation = ({ userData }) => {
  return (
    <>
      <StyledWrapper as={Link} to={`/user/${userData.nickName}/comments`}>
        <StyledIcon src={RightIcon} alt="right icon" />
        <StyledAvatar src={dummyPhoto} alt="user avatar" />
        <StyledInformationWrapper>
          <StyledTitle>{userData.nickName}</StyledTitle>
          <span>Name : {userData.fullName}</span>
          <span>Location : {userData.location}</span>
          <span>Joined : {moment(userData.createdAt).fromNow()}</span>
        </StyledInformationWrapper>
      </StyledWrapper>
      <FuncionalityIcons />
    </>
  );
};
MainInformation.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default MainInformation;
