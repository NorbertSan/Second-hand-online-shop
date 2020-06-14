import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import theme from "utils/theme";
import PropTypes from "prop-types";
// COMPONENTS
import DefaultAvatar from "utils/DefaultAvatar";
import SentImages from "./SentImages";
// REDUX
import { useSelector } from "react-redux";

const StyledWrapper = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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
  const [isLoggedUserAuthor, setIsLoggedUserAuthor] = useState(false);
  const [isDateShown, toggleDateShown] = useState(false);
  useEffect(() => {
    if (message.writer.nickName === loggedUserNickName)
      setIsLoggedUserAuthor(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledWrapper>
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
        >
          <SentImages images={message.images} />
          <span>{message.body}</span>
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
