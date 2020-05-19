import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
// COMPONENTS
import DefaultAvatar from "utils/DefaultAvatar";
// REDUX
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  display: flex;
  margin-bottom: 10px;
  ${({ isLoggedUserAuthor }) =>
    isLoggedUserAuthor &&
    css`
      flex-direction: row-reverse;
    `}
`;
const StyledAvatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 1;
  margin: 0 5px;
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

const MessageItem = ({ message }) => {
  const loggedUserNickName = useSelector((state) => state.user.nickName);
  const [isLoggedUserAuthor, setIsLoggedUserAuthor] = useState(false);
  useEffect(() => {
    if (message.writer.nickName === loggedUserNickName)
      setIsLoggedUserAuthor(true);
  }, []);
  return (
    <StyledWrapper isLoggedUserAuthor={isLoggedUserAuthor}>
      {message.writer.avatar ? (
        <StyledAvatar
          src={`${BASE_URL}/${message.writer.avatar}`}
          alt="user avatar"
        />
      ) : (
        <DefaultAvatar productItem nickNameProvided={message.writer.nickName} />
      )}
      <StyledContent isLoggedUserAuthor={isLoggedUserAuthor}>
        {message.body}
      </StyledContent>
    </StyledWrapper>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageItem;
