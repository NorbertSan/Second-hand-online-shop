import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import DefaultAvatar from "utils/DefaultAvatar";
import PropTypes from "prop-types";
import Button from "components/atoms/Button";
import { useDispatch } from "react-redux";
import { unblockUser as unblockUserAction } from "redux/actions/userActions";

const StyledWrapper = styled.li`
  display: flex;
  padding: 10px;
  position: relative;
  background: #fff;
  box-shadow: 0 0 1px grey;
`;
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: ${theme.fontSize.s};
    &.fullname {
      color: grey;
      font-weight: bold;
      font-size: ${theme.fontSize.xs};
    }
  }
`;
const StyledButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
`;

const BlockedUserItem = ({ user, unblock }) => {
  const dispatch = useDispatch();
  const unblockHandle = () => {
    dispatch(unblockUserAction(user._id));
    unblock(user._id);
  };
  return (
    <StyledWrapper>
      <DefaultAvatar
        avatar={user.avatar}
        nickName={user.nickName}
        blockedUser
      />
      <UserInfoWrapper>
        <span>{user.nickName}</span>
        <span className="fullname">{user.fullName}</span>
      </UserInfoWrapper>
      <StyledButton small tertiary onClick={unblockHandle}>
        unblock
      </StyledButton>
    </StyledWrapper>
  );
};

BlockedUserItem.propTypes = {
  user: PropTypes.object.isRequired,
  unblock: PropTypes.func.isRequired,
};

export default BlockedUserItem;
