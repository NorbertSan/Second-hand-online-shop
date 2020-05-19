import React from "react";
import styled from "styled-components";
// COMPONENTS
import SentMessage from "./SentMessage";
import ConversationRoomsOverview from "./ConversationRoomsOverview";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  background: #eee;
`;

const MessagesPage = () => {
  return (
    <StyledWrapper>
      <SentMessage />
      <ConversationRoomsOverview />
    </StyledWrapper>
  );
};

export default MessagesPage;
