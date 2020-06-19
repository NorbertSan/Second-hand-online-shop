import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import theme from "utils/theme";
import PropTypes from "prop-types";
// COMPONENTS
import DefaultAvatar from "utils/DefaultAvatar";
import SentImages from "./SentImages";
import HoldSettings from "./HoldSettings";
// REDUX
import { useSelector } from "react-redux";

const StyledWrapper = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  ${({ isLoggedUserAuthor }) =>
    isLoggedUserAuthor &&
    css`
      flex-direction: row-reverse;
    `}
`;
const StyledContent = styled.div`
  padding: 5px 10px;
  min-width: 70px;
  max-width: 220px;
  font-size: ${theme.fontSize.s};
  font-weight: 300;
  border-radius: 5px;
  box-shadow: 0 0 2px grey;
  ${({ isLoggedUserAuthor }) =>
    isLoggedUserAuthor &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.whiteish};
      box-shadow: 0;
    `}
  ${({ deleted }) =>
    deleted &&
    css`
      background: #eee;
      color: ${theme.colors.blackish};
      font-style: italic;
    `}
`;
const StyledDateInfo = styled.div`
  font-size: ${theme.fontSize.xs};
  padding: 0 40px;
  margin-top: 3px;
  ${({ isLoggedUserAuthor }) =>
    isLoggedUserAuthor &&
    css`
      text-align: end;
    `}
  ${({ center }) =>
    center &&
    css`
      margin-bottom: 3px;
      text-align: center;
    `}
`;

const MessageItem = ({ message, lastElement }) => {
  const loggedUserNickName = useSelector((state) => state.user.nickName);
  const [holdOptionsOpen, setHoldOptionsOpen] = useState(false);
  const messageRef = useRef(null);
  const [isLoggedUserAuthor, setIsLoggedUserAuthor] = useState(false);
  const [isDateShown, toggleDateShown] = useState(false);
  useEffect(() => {
    let timer;
    if (message.writer.nickName === loggedUserNickName)
      setIsLoggedUserAuthor(true);

    const handleDropDown = () => clearTimeout(timer);

    const handleClick = (e) =>
      (timer = setTimeout(() => setHoldOptionsOpen(true), 400));

    if (messageRef) {
      messageRef.current.addEventListener("mouseup", handleDropDown);
      messageRef.current.addEventListener("touchend", handleDropDown);
      messageRef.current.addEventListener("mousedown", handleClick);
      messageRef.current.addEventListener("touchstart", handleClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledWrapper ref={messageRef}>
      {!message.deleted && holdOptionsOpen && (
        <HoldSettings
          message={message}
          toggleDisplay={setHoldOptionsOpen}
          isLoggedUserAuthor={isLoggedUserAuthor}
        />
      )}
      {lastElement && (
        <StyledDateInfo center isLoggedUserAuthor={isLoggedUserAuthor}>
          {moment(message.createdAt).calendar()}
        </StyledDateInfo>
      )}
      <StyledInnerWrapper isLoggedUserAuthor={isLoggedUserAuthor}>
        <DefaultAvatar
          avatar={message.writer.avatar}
          productItem
          nickName={message.writer.nickName}
        />
        <StyledContent
          onClick={() => toggleDateShown((prevState) => !prevState)}
          isLoggedUserAuthor={isLoggedUserAuthor}
          deleted={message.deleted}
        >
          <SentImages images={message.images} />
          <span>{message.deleted ? "Message removed" : message.body}</span>
        </StyledContent>
      </StyledInnerWrapper>
      {isDateShown && (
        <StyledDateInfo isLoggedUserAuthor={isLoggedUserAuthor}>
          {moment(message.createdAt).calendar()}
        </StyledDateInfo>
      )}
    </StyledWrapper>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageItem;
