import React from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import styled, { css } from "styled-components";
// COMPONENT
import DefaultAvatar from "utils/DefaultAvatar";
// REDUX
import { useDispatch } from "react-redux";
import { markNotificationRead } from "redux/actions/userActions";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  padding: 10px 5px;
  border-bottom: 1px solid #eee;
  display: flex;
  ${({ unread }) =>
    unread &&
    css`
      background: rgba(0, 144, 158, 0.2);
    `}
`;
const StyledAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
`;
const StyledContent = styled.div`
  text-align: start;
  font-size: 11px;
  display: flex;
  flex-direction: column;
`;
const StyledNickName = styled.span`
  font-weight: bold;
  color: ${theme.colors.primary};
`;
const StyledDataInfo = styled.div`
  font-size: ${theme.fontSize.xs};
  color: grey;
  font-weight: bold;
  margin-top: 5px;
`;

const NotificationItem = ({ notification, toggleNotificationOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let description = "";
  if (notification.type === "like") description = `likes your product.`;

  const handleClick = () => {
    dispatch(markNotificationRead(notification._id));
    history.push(`/product/${notification.product}`);
    setTimeout(() => {
      toggleNotificationOpen(false);
    }, 0);
  };
  const handleCloseDropdown = () =>
    setTimeout(() => {
      toggleNotificationOpen(false);
    }, 0);

  return (
    <StyledWrapper unread={!notification.read}>
      <Link
        to={`/user/${notification.author.nickName}`}
        onClick={handleCloseDropdown}
      >
        {notification.author.avatar ? (
          <StyledAvatar
            src={`${BASE_URL}/${notification.author.avatar}`}
            alt={notification.type}
          />
        ) : (
          <DefaultAvatar nickNameProvided={notification.nickName} productItem />
        )}
      </Link>
      <StyledContent onClick={handleClick}>
        <StyledNickName>
          {notification.author.nickName} <span> {description}</span>
        </StyledNickName>
        <StyledDataInfo>
          {moment(notification.createdAt).fromNow()}
        </StyledDataInfo>
      </StyledContent>
    </StyledWrapper>
  );
};
NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  toggleNotificationOpen: PropTypes.func.isRequired,
};
export default NotificationItem;
