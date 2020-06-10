import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";
import moment from "moment";
import { Link } from "react-router-dom";
import BackIcon from "assets/icons/backArrow.svg";

const StyledHeader = styled.header`
  position: relative;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
`;
const StyledBackButton = styled.button`
  position: absolute;
  padding: 3px;
  padding-top: 0;
  margin: 0;
  border: none;
  background: transparent;
  width: 22px;
  height: 22px;
  top: 0px;
  left: 15px;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
  }
`;
const StyledUserName = styled.span`
  color: ${theme.colors.primary};
  position: relative;
  right: -5px;
  &:after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
    background: ${theme.colors.redish};
    ${({ online }) =>
      online &&
      css`
        background: ${theme.colors.greenish};
      `}
  }
`;
const StyledOnlineInfo = styled.div`
  font-size: ${theme.fontSize.xs};
  color: grey;
  text-align: center;
`;

const ConversationHeader = ({ userData, nickName }) => {
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    userData && setIsOnline(userData.lastLogin + 60000 > Date.now());
  }, [userData]);
  return (
    <StyledHeader>
      <StyledBackButton as={Link} to="/messages">
        <img src={BackIcon} alt="left arrow" />
      </StyledBackButton>
      <Link to={`/user/${nickName}`}>
        <StyledUserName online={isOnline}>{nickName}</StyledUserName>
      </Link>
      {!isOnline && userData && (
        <StyledOnlineInfo>
          {moment(userData.lastLogin).fromNow()}
        </StyledOnlineInfo>
      )}
    </StyledHeader>
  );
};

ConversationHeader.propTypes = {
  userData: PropTypes.object,
  nickName: PropTypes.string.isRequired,
};

export default ConversationHeader;
