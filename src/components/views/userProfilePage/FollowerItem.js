import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "components/atoms/Button";
import { useDispatch } from "react-redux";
import { blockUser as blockUserAction } from "redux/actions/userActions";
import DefaultAvatar from "utils/DefaultAvatar";

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
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
`;

const FollowerItem = ({ follower, blockUser }) => {
  const dispatch = useDispatch();
  const handleBlockUser = () => {
    dispatch(blockUserAction(follower._id));
    blockUser(follower._id);
  };
  return (
    <StyledWrapper>
      <DefaultAvatar
        followItem
        avatar={follower.avatar}
        nickName={follower.nickName}
      />
      <StyledUserInfo as={Link} to={`/user/${follower.nickName}`}>
        <span>{follower.nickName}</span>
        <span className="grey">{follower.fullName}</span>
      </StyledUserInfo>
      <StyledButton small onClick={handleBlockUser}>
        BLOCK
      </StyledButton>
    </StyledWrapper>
  );
};

FollowerItem.propTypes = {
  follower: PropTypes.object.isRequired,
  blockUser: PropTypes.func.isRequired,
};

export default FollowerItem;
