import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
// COMPONENTS
import NickName from "components/atoms/NickName";
import DefaultAvatar from "utils/DefaultAvatar";
// REDUX STUFF
import { useSelector } from "react-redux";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  background: #fff;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  background: #fff;
  position: relative;
  ${({ unread }) =>
    unread &&
    css`
      background: rgba(0, 144, 158, 0.2);
    `};
`;
const StyledAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  flex-shrink: 1;
  border: 1px solid grey;
  object-fit: cover;
  margin-right: 15px;
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledMessageContent = styled.p`
  font-size: ${theme.fontSize.xs};
  color: grey;
  ${({ unread }) =>
    unread &&
    css`
      font-weight: bold;
      color: ${theme.colors.blackish};
    `}
`;
const StyledDateInfo = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  color: grey;
  ${({ unread }) =>
    unread &&
    css`
      color: ${theme.colors.blackish};
    `}
`;

const ConversationSingleRoomOverview = ({ message }) => {
  const unreadMessages = useSelector((state) => state.user.unreadMessages);
  const loggedUserNickName = useSelector((state) => state.user.nickName);
  const [interlocutorAvatar, setInterlocutorAvatar] = useState(null);
  const [interlocutorNickName, setInterlocutorNickName] = useState("");

  const [isRoomUnread, setRoomUnread] = useState(false);
  useEffect(() => {
    if (message.writer.nickName === loggedUserNickName) {
      setInterlocutorAvatar(message.recipient.avatar);
      setInterlocutorNickName(message.recipient.nickName);
    } else {
      setInterlocutorAvatar(message.writer.avatar);
      setInterlocutorNickName(message.writer.nickName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    unreadMessages &&
      unreadMessages.includes(message._id) &&
      setRoomUnread(true);
  }, [unreadMessages, message._id]);
  return (
    <StyledWrapper
      unread={isRoomUnread ? "true" : undefined}
      as={Link}
      to={`/messages/${interlocutorNickName}`}
    >
      <StyledDateInfo unread={isRoomUnread}>
        {moment(message.createdAt).fromNow()}
      </StyledDateInfo>
      {interlocutorAvatar ? (
        <StyledAvatar
          src={`${BASE_URL}/${interlocutorAvatar}`}
          alt="user avatar"
        />
      ) : (
        <DefaultAvatar comment nickNameProvided={interlocutorNickName} />
      )}
      <StyledInnerWrapper>
        <NickName black big>
          {interlocutorNickName}
        </NickName>
        <StyledMessageContent unread={isRoomUnread}>
          {message.body}
        </StyledMessageContent>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

ConversationSingleRoomOverview.propTypes = {
  message: PropTypes.object.isRequired,
};

export default ConversationSingleRoomOverview;
