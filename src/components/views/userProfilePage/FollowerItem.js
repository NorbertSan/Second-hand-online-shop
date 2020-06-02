import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  display: flex;
  padding: 7px 14px;
  border-bottom: 1px solid #eee;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;
const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: ${theme.fontSize.s};
    &.grey {
      font-size: ${theme.fontSize.xs};
      color: grey;
    }
  }
`;

const FollowerItem = ({ follower }) => {
  return (
    <StyledWrapper>
      <img src={`${BASE_URL}/${follower.avatar}`} alt="avatar" />
      <StyledUserInfo as={Link} to={`/user/${follower.nickName}`}>
        <span>{follower.nickName}</span>
        <span className="grey">{follower.fullName}</span>
      </StyledUserInfo>
    </StyledWrapper>
  );
};

FollowerItem.propTypes = {
  follower: PropTypes.object.isRequired,
};

export default FollowerItem;
