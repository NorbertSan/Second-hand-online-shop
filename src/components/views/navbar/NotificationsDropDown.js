import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import styled from "styled-components";
import { BulletList } from "react-content-loader";
// ICON
import { ReactComponent as RightIcon } from "assets/icons/simpleRightArrow.svg";
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
const StyledSeeMore = styled.li`
  padding: 7px 0;
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  color: ${theme.colors.primary};
  display: flex;
  justify-content: Center;
`;
const StyledDownIcon = styled(RightIcon)`
  transform: rotate(90deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
  path {
    fill: ${theme.colors.primary};
  }
`;
const StyledNoNotificationsAlert = styled.div`
  padding: 15px 10px;
  color: ${theme.colors.primary};
`;

const NotificationsDropDown = ({ toggleNotificationOpen }) => {
  const limit = 6;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const notificationsRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.user.notifications);
  useEffect(() => {
    const variables = {
      limit,
      skip,
    };
    !notifications && dispatch(getNotifications(setLoading, variables));
    dispatch(clearUnreadNotifications());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    notifications &&
      setHasMore(
        notifications.length === 0 ? false : notifications.length % limit === 0
      );
  }, [notifications]);

  useDetectClickOutside(notificationsRef, toggleNotificationOpen);

  const loadMore = () => {
    const variables = {
      limit,
      skip: skip + 1,
    };
    dispatch(getNotifications(setLoading, variables));
    setSkip((prevState) => prevState + 1);
  };
  return (
    <StyledWrapper ref={notificationsRef}>
      {loading && <BulletList height={100} width={170} />}
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
        <StyledNoNotificationsAlert>
          You do not have any notifications
        </StyledNoNotificationsAlert>
      )}
      {hasMore && (
        <StyledSeeMore onClick={loadMore}>
          <span>See more</span>
          <StyledDownIcon />
        </StyledSeeMore>
      )}
    </StyledWrapper>
  );
};
NotificationsDropDown.propTypes = {
  toggleNotificationOpen: PropTypes.func.isRequired,
};

export default NotificationsDropDown;
