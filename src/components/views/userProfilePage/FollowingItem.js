import React from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DefaultAvatar from "utils/DefaultAvatar";
import Button from "components/atoms/Button";
import { useDispatch } from "react-redux";
import { toggleFollowUser } from "redux/actions/userActions";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.li`
  display: flex;
  padding: 7px 14px;
  border-bottom: 1px solid #eee;
  align-items: center;
  position: relative;
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
const StyledButton = styled(Button)`
  background: ${theme.colors.primary};
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  border-radius: 5px;
`;

const FollowingItem = ({ following, unfollow }) => {
  const dispatch = useDispatch();
  const handleUnfollow = () => {
    dispatch(toggleFollowUser(following.nickName));
    unfollow(following._id);
  };
  return (
    <StyledWrapper>
      {following.avatar ? (
        <img src={`${BASE_URL}/${following.avatar}`} alt="avatar" />
      ) : (
        <DefaultAvatar followItem nickName={following.nickName} />
      )}
      <StyledUserInfo as={Link} to={`/user/${following.nickName}`}>
        <span>{following.nickName}</span>
        <span className="grey">{following.fullName}</span>
      </StyledUserInfo>
      <StyledButton black small onClick={handleUnfollow}>
        unfollow
      </StyledButton>
    </StyledWrapper>
  );
};

FollowingItem.propTypes = {
  following: PropTypes.object.isRequired,
  unfollow: PropTypes.func.isRequired,
};

export default FollowingItem;
