import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  clearUnreadNotifications,
} from "redux/actions/userActions";
// COMP
import NotificationItem from "./NotificationItem";

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: 30px;
  right: 0;
  width: 200px;
  background: #fff;
  box-shadow: 0 0 2px grey;
  z-index: 9;
`;

const NotificationsDropDown = ({ toggleNotificationOpen }) => {
  const notificationsRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.user.notifications);
  useEffect(() => {
    !notifications && dispatch(getNotifications(setLoading));
    dispatch(clearUnreadNotifications());
  }, []);
  useDetectClickOutside(notificationsRef, toggleNotificationOpen);
  return (
    <StyledWrapper ref={notificationsRef}>
      {loading && <div>LOADING...</div>}
      {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) => (
          <NotificationItem
            toggleNotificationOpen={toggleNotificationOpen}
            key={notification._id}
            notification={notification}
          />
        ))}
      {!loading && notifications && notifications.length === 0 && (
        <div>NO NOTIFICATIONS</div>
      )}
    </StyledWrapper>
  );
};
NotificationsDropDown.propTypes = {
  toggleNotificationOpen: PropTypes.func.isRequired,
};

export default NotificationsDropDown;
