import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
import theme from "utils/theme";
import { Link } from "react-router-dom";
// ICON
import RightIcon from "assets/icons/simpleRightArrow.svg";
// COMPONENTS
import FuncionalityIcons from "./FuncionalityIcons";
import DefaultAvatar from "utils/DefaultAvatar";
import { useSelector } from "react-redux";

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
const StyledInnerWrapper = styled.div`
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
const StyledInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: grey;
    font-size: 11px;
    margin-bottom: 5px;
  }
`;
const StyledTitle = styled.h1`
  margin: 0;
  margin-bottom: 10px;
`;
const StyledIcon = styled.img`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
const StyledBio = styled.p`
  font-size: 11px;
`;
const StyledLastLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    margin: 0;
  }
`;
const StyledCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background: ${theme.colors.redish};
  ${({ online }) =>
    online &&
    css`
      background: ${theme.colors.greenish};
    `}
`;

const MainInformation = ({ userData }) => {
  // IF LESS THAN 1 MINUTE MEAN ONLINE
  const online = userData.lastLogin + 60000 > Date.now();
  const loggedUserNickName = useSelector((state) => state.user.nickName);
  return (
    <StyledWrapper>
      <StyledInnerWrapper as={Link} to={`/user/${userData.nickName}/comments`}>
        <StyledIcon src={RightIcon} alt="right icon" />
        <DefaultAvatar
          avatar={userData.avatar}
          userProfile
          nickName={userData.nickName}
        />

        <StyledInformationWrapper>
          <StyledTitle>{userData.nickName}</StyledTitle>
          <span>Name : {userData.fullName}</span>
          <span>Location : {userData.location}</span>
          <span>Joined : {moment(userData.createdAt).calendar()}</span>
          {loggedUserNickName !== userData.nickName && (
            <StyledLastLoginWrapper>
              <StyledCircle online={online} />
              <span>
                {online ? "Online" : moment(userData.lastLogin).fromNow()}
              </span>
            </StyledLastLoginWrapper>
          )}
        </StyledInformationWrapper>
      </StyledInnerWrapper>
      {userData.bio && <StyledBio>{userData.bio}</StyledBio>}
      {loggedUserNickName !== userData.nickName && (
        <FuncionalityIcons
          user_id={userData._id}
          nickName={userData.nickName}
        />
      )}
    </StyledWrapper>
  );
};
MainInformation.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default MainInformation;
