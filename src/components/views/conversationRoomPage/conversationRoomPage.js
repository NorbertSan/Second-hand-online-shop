import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useParams } from "react-router-dom";
// COMPONENTS
import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from "./MessageItem";
import { BulletList } from "react-content-loader";
import SendMessageInsideRoom from "./SendMessageInsideRoom";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { sentMessage, getMessages } from "redux/actions/dataActions";

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

const ConversationRoomPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const messages = useSelector((state) => state.data.messages);
  const { nickName } = useParams();
  useEffect(() => {
    dispatch(getMessages(nickName, setLoading));
  }, []);

  return (
    <StyledWrapper>
      <StyledHeader>
        <span>{nickName}</span>
      </StyledHeader>
      {loading && <BulletList />}
      {messages.length > 0 ? (
        <StyledMessagesWrapper as={ScrollToBottom}>
          {messages.map((message, index) => (
            <MessageItem key={message._id} message={message} />
          ))}
        </StyledMessagesWrapper>
      ) : (
        <div>TODO :NO MESSAGE ALERT</div>
      )}
      <SendMessageInsideRoom />
    </StyledWrapper>
  );
};

export default ConversationRoomPage;
