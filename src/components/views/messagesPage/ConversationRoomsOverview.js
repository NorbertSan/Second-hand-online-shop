import React, { useState, useEffect } from "react";
import styled from "styled-components";
// COMPONENTS
import { BulletList } from "react-content-loader";
import ConversationSingleRoomOverview from "./ConversationSingleRoomOverview";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getConversationRooms } from "redux/actions/dataActions";
const StyledWrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ConversationRoomsOverview = () => {
  const [loading, setLoading] = useState(true);
  const conversationRooms = useSelector(
    (state) => state.data.conversationRooms
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversationRooms(setLoading));
  }, [dispatch]);
  if (loading)
    return (
      <BulletList backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
    );
  return (
    <StyledWrapper>
      {conversationRooms.length > 0 ? (
        conversationRooms.map((room) => (
          <ConversationSingleRoomOverview key={room._id} message={room} />
        ))
      ) : (
        <div>no messages</div>
      )}
    </StyledWrapper>
  );
};

export default ConversationRoomsOverview;
