import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BulletList } from "react-content-loader";
import FollowerItem from "./FollowerItem";

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

const FollowersList = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFollowers = async () => {
    try {
      const { data } = await axios.post("/user/followers");
      setFollowers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, []);
  return (
    <StyledWrapper>
      {loading ? (
        <BulletList backgroundColor="#eee" />
      ) : followers.length === 0 ? (
        <StyledAlert>You do not have any followers yet ☹</StyledAlert>
      ) : (
        followers.map((follower) => (
          <FollowerItem key={follower._id} follower={follower} />
        ))
      )}
    </StyledWrapper>
  );
};

export default FollowersList;
