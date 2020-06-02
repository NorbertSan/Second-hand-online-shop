import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BulletList } from "react-content-loader";
import FollowingItem from "./FollowingItem";

const StyledWrapper = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;
const StyledAlert = styled.p`
  text-align: center;
`;

const FollowingList = () => {
  const [loading, setLoading] = useState(true);
  const [followings, setFollowings] = useState([]);
  const fetchFollowing = async () => {
    try {
      const { data } = await axios.post("/user/following");
      setFollowings(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchFollowing();
  }, []);
  const unfollow = (user_id) => {
    setFollowings((prevState) =>
      prevState.filter((following) => following._id !== user_id)
    );
  };
  return (
    <StyledWrapper>
      {loading ? (
        <BulletList backgroundColor="#eee" />
      ) : followings.length === 0 ? (
        <StyledAlert>You do not follow anyone yet ☹</StyledAlert>
      ) : (
        followings.map((following) => (
          <FollowingItem
            key={following._id}
            following={following}
            unfollow={unfollow}
          />
        ))
      )}
    </StyledWrapper>
  );
};

export default FollowingList;
