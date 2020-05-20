import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import moment from "moment";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// COMPONENTS
import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from "./MessageItem";
import { BulletList } from "react-content-loader";
import SendMessageInsideRoom from "./SendMessageInsideRoom";
// ICON
import BackIcon from "assets/icons/backArrow.svg";
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
const StyledHeader = styled.header`
  position: relative;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
`;
const StyledUserName = styled.span`
  color: ${theme.colors.primary};
  position: relative;
  right: -5px;
  &:after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
    background: ${theme.colors.redish};
    ${({ online }) =>
      online &&
      css`
        background: ${theme.colors.greenish};
      `}
  }
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
const StyledOnlineInfo = styled.div`
  font-size: ${theme.fontSize.xs};
  color: grey;
  text-align: center;
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
  const messages = useSelector((state) => state.data.messages);
  const userData = useSelector((state) => state.data.userData);
  const [isOnline, setIsOnline] = useState(false);
  const { nickName } = useParams();

  // IF LESS THAN 1 MINUTE MEAN ONLINE

  useEffect(() => {
    dispatch(getMessages(nickName, setLoading));
    dispatch(setMessagesRead(nickName));
    dispatch(getUserData(nickName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    userData && setIsOnline(userData.lastLogin + 60000 > Date.now());
  }, [userData]);

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledBackButton as={Link} to="/messages">
          <img src={BackIcon} alt="left arrow" />
        </StyledBackButton>
        <Link to={`/user/${nickName}`}>
          <StyledUserName online={isOnline}>{nickName}</StyledUserName>
        </Link>
        {!isOnline && userData && (
          <StyledOnlineInfo>
            {moment(userData.lastLogin).fromNow()}
          </StyledOnlineInfo>
        )}
      </StyledHeader>
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
    </StyledWrapper>
  );
};

export default ConversationRoomPage;
