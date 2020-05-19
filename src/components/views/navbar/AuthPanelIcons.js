import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// ICONS
import MailIcon from "assets/icons/blueMail.svg";
import BlueHeart from "assets/icons/blueHeart.svg";
import NotificationIcon from "assets/icons/notification.svg";

const StyledWrapper = styled.section`
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;
const StyledIcon = styled.img`
  width: 100%;
`;
const StyledButton = styled.button`
  width: 30px;
  height: 30px;
  margin: 0 3px;
  padding: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background: #eee;
  }
`;

const AuthPanelIcons = () => {
  return (
    <StyledWrapper>
      <StyledButton as={Link} to="/messages">
        <StyledIcon src={MailIcon} alt="mail icon" />
      </StyledButton>
      <StyledButton>
        <StyledIcon src={NotificationIcon} alt="notification icon" />
      </StyledButton>
      <StyledButton as={Link} to="/favourites">
        <StyledIcon src={BlueHeart} alt="heart icon" />
      </StyledButton>
    </StyledWrapper>
  );
};

export default AuthPanelIcons;
