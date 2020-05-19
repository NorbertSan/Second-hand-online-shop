import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
`;
const StyledDateInfo = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  color: grey;
`;

const ConversationSingleRoomOverview = ({ message }) => {
  const loggedUserNickName = useSelector((state) => state.user.nickName);
  const [interlocutorAvatar, setInterlocutorAvatar] = useState(null);
  const [interlocutorNickName, setInterlocutorNickName] = useState("");
  useEffect(() => {
    if (message.writer.nickName === loggedUserNickName) {
      setInterlocutorAvatar(message.writer.avatar);
      setInterlocutorNickName(message.writer.nickName);
    } else {
      setInterlocutorAvatar(message.recipient.avatar);
      setInterlocutorNickName(message.recipient.nickName);
    }
  }, []);
  return (
    <StyledWrapper as={Link} to={`/messages/${interlocutorNickName}`}>
      <StyledDateInfo>{moment(message.createdAt).fromNow()}</StyledDateInfo>
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
        <StyledMessageContent>{message.body}</StyledMessageContent>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

ConversationSingleRoomOverview.propTypes = {
  message: PropTypes.object.isRequired,
};

export default ConversationSingleRoomOverview;
