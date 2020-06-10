import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useParams } from "react-router-dom";
// COMPONENTS
import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from "./MessageItem";
import { BulletList } from "react-content-loader";
import SendMessageInsideRoom from "./SendMessageInsideRoom";
import InterlocutorNotExist from "./InterlocutorNotExist";
import ConversationHeader from "./ConversationHeader";
// ICON
import { ReactComponent as HandIcon } from "assets/icons/hand.svg";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getMessages, setMessagesRead } from "redux/actions/dataActions";
import { getUserData } from "redux/actions/userActions";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 120px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 3px #eee;
`;
const StyledMessagesWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  max-height: 55vh;
  overflow: scroll;
`;
const StyledNoMessagesAlert = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  margin-top: 10px;
  span {
    font-size: 12px;
    color: ${theme.colors.primary};
  }
`;
const StyledHandIcon = styled(HandIcon)`
  width: 12px;
  height: 12px;
  margin-left: 10px;
  path {
    fill: ${theme.colors.primary};
  }
`;

const ConversationRoomPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [interlocutorNotFound, setInterlocutorNotFound] = useState(false);
  const messages = useSelector((state) => state.data.messages);
  const userData = useSelector((state) => state.data.userData);
  const { nickName } = useParams();

  useEffect(() => {
    dispatch(getMessages(nickName, setLoading, setInterlocutorNotFound));
    dispatch(setMessagesRead(nickName));
    dispatch(getUserData(nickName, setInterlocutorNotFound));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledWrapper>
      {interlocutorNotFound ? (
        <InterlocutorNotExist />
      ) : (
        <>
          <ConversationHeader userData={userData} nickName={nickName} />
          {loading ? (
            <BulletList />
          ) : messages.length > 0 ? (
            <StyledMessagesWrapper as={ScrollToBottom} animating={false}>
              {messages.map((message, index) => (
                <MessageItem
                  key={message._id}
                  message={message}
                  lastElement={messages.length === index + 1}
                />
              ))}
            </StyledMessagesWrapper>
          ) : (
            <StyledNoMessagesAlert>
              <span>Say hello !</span>
              <StyledHandIcon />
            </StyledNoMessagesAlert>
          )}
          <SendMessageInsideRoom />
        </>
      )}
    </StyledWrapper>
  );
};

export default ConversationRoomPage;
