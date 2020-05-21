import React, { useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";
// ICONS
import MailIcon from "assets/icons/blueMail.svg";
import BlueHeart from "assets/icons/blueHeart.svg";
import NotificationIcon from "assets/icons/notification.svg";
// COMPO
import NotificationsDropDown from "./NotificationsDropDown";
// REDUX
import { useSelector } from "react-redux";

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
  position: relative;
  &:hover {
    background: #eee;
  }
`;
const StyledBadge = styled.div`
  width: 15px;
  height: 15px;
  font-weight: bold;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  right: 0px;
  background: ${theme.colors.secondary};
  color: ${theme.colors.whiteish};
  font-size: ${theme.fontSize.xs};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthPanelIcons = () => {
  const unreadMessages = useSelector((state) => state.user.unreadMessages);
  const [isNotificationsOpen, toggleNotificationOpen] = useState(false);
  const unreadNotificationsNumber = useSelector(
    (state) => state.user.unreadNotificationsNumber
  );
  return (
    <StyledWrapper>
      <StyledButton as={Link} to="/messages">
        {unreadMessages && unreadMessages.length > 0 && (
          <StyledBadge>{unreadMessages.length}</StyledBadge>
        )}
        <StyledIcon src={MailIcon} alt="mail icon" />
      </StyledButton>
      <StyledButton as={Link} to="/favourites">
        <StyledIcon src={BlueHeart} alt="heart icon" />
      </StyledButton>
      <StyledButton
        style={{ outline: "none" }}
        onClick={() => toggleNotificationOpen(true)}
      >
        {isNotificationsOpen && (
          <NotificationsDropDown
            toggleNotificationOpen={toggleNotificationOpen}
          />
        )}
        {unreadNotificationsNumber > 0 && (
          <StyledBadge>{unreadNotificationsNumber}</StyledBadge>
        )}
        <StyledIcon src={NotificationIcon} alt="notification icon" />
      </StyledButton>
    </StyledWrapper>
  );
};

export default AuthPanelIcons;
