import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// COMPONENTS
import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from "./MessageItem";
import { BulletList } from "react-content-loader";
import SendMessageInsideRoom from "./SendMessageInsideRoom";
// ICON
import BackIcon from "assets/icons/backArrow.svg";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getMessages, setMessagesRead } from "redux/actions/dataActions";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 3px #eee;
`;
const StyledHeader = styled.header`
  position: relative;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  color: ${theme.colors.primary};
`;
const StyledMessagesWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow: scroll;
`;
const StyledBackButton = styled.button`
  position: absolute;
  padding: 3px;
  padding-top: 0;
  margin: 0;
  border: none;
  background: transparent;
  width: 22px;
  height: 22px;
  top: 0px;
  left: 15px;
  img {
    width: 100%;
  }
`;

const ConversationRoomPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const messages = useSelector((state) => state.data.messages);
  const { nickName } = useParams();
  useEffect(() => {
    dispatch(getMessages(nickName, setLoading));
    dispatch(setMessagesRead(nickName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledBackButton as={Link} to="/messages">
          <img src={BackIcon} alt="left arrow" />
        </StyledBackButton>
        <span>{nickName}</span>
      </StyledHeader>
      {loading ? (
        <BulletList />
      ) : messages.length > 0 ? (
        <StyledMessagesWrapper as={ScrollToBottom}>
          {messages.map((message, index) => (
            <MessageItem
              key={message._id}
              message={message}
              lastElement={messages.length === index + 1}
            />
          ))}
        </StyledMessagesWrapper>
      ) : (
        <span> NO MESSAGES ALERT !</span>
      )}
      <SendMessageInsideRoom />
    </StyledWrapper>
  );
};

export default ConversationRoomPage;
