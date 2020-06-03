import React, { useEffect, useState } from "react";
import theme from "utils/theme";
import axios from "axios";
import styled, { css } from "styled-components";
import { ReactComponent as RightArrow } from "assets/icons/simpleRightArrow.svg";
import BlockedUserItem from "./BlockedUserItem";

const StyledWrapper = styled.section`
  margin: 20px 0 5px 0;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 2px ${theme.colors.redish};
  border: 1px solid ${theme.colors.redish};
  padding: 10px 30px;
  justify-content: space-between;
  position: relative;
  span {
    font-weight: bold;
    color: ${theme.colors.redish};
  }
`;

const StyledIcon = styled(RightArrow)`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  right: 20px;
  transition: transform 0.1s ease-in-out;
  transform: translateY(-50%);
  path {
    fill: ${theme.colors.redish};
  }
  ${({ open }) =>
    open &&
    css`
      transform: translateY(-50%) rotate(90deg);
    `}
`;
const StyledAlert = styled.div`
  background: #fff;
  padding: 15px;
  box-shadow: 0 0 1px grey;
  text-align: center;
`;
const StyledUsersList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const BlockedUsersList = () => {
  const [blockedUsersList, setBlockedUsersList] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  const fetchBlockedUsers = async () => {
    try {
      const { data } = await axios.post("/user/blockedUsers");
      setBlockedUsersList(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBlockedUsers();
  }, []);
  const toggleListOpen = () => setListOpen((prevState) => !prevState);
  const unblock = (user_id) =>
    setBlockedUsersList((prevState) =>
      prevState.filter((blockedUser) => blockedUser._id !== user_id)
    );
  return (
    <>
      <StyledWrapper onClick={toggleListOpen}>
        <span>Blocked users</span>
        <StyledIcon open={listOpen} />
      </StyledWrapper>
      {listOpen ? (
        blockedUsersList.length === 0 ? (
          <StyledAlert>You have not blocked any users</StyledAlert>
        ) : (
          <StyledUsersList>
            {blockedUsersList.map((blockedUser) => (
              <BlockedUserItem
                unblock={unblock}
                user={blockedUser}
                key={blockedUser._id}
              />
            ))}
          </StyledUsersList>
        )
      ) : null}
    </>
  );
};

export default BlockedUsersList;
