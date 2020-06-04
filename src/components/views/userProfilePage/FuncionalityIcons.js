import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// ICONS
import BlueMail from "assets/icons/blueMail.svg";
import { ReactComponent as Follow } from "assets/icons/follow.svg";
import { ReactComponent as Block } from "assets/icons/block.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollowUser as toggleFollowUserAction } from "redux/actions/userActions";
import BlockUser from "./BlockUser";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 15px 0 0;
`;
const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  width: 20px;
  height: 20px;
  padding: 0;
  margin-left: 15px;
  position: relative;
  svg {
    height: 18px;
    width: 20px;
    path {
      fill: grey;
    }
    &.active {
      path {
        fill: ${theme.colors.primary};
      }
    }
  }
  &:after {
    content: '${(props) => props.tooltip}';
    position: absolute;
    width: 60px;
    height: 20px;
    background: #fff;
    border-radius: 5px 5px 0 5px;
    box-shadow: 0 0 1px grey;
    border: 1px solid #eee;
    top: -24px;
    right: 7px;
    display:flex;
    align-items:center;
    justify-content:center;
    visibility:hidden;
    font-weight:bold;
    font-size:${theme.fontSize.xs};
    color:grey;
  }
  ${({ tooltip }) =>
    tooltip &&
    css`
      &:hover {
        &:after {
          visibility: visible;
        }
      }
    `}
`;
const StyledIcon = styled.img`
  width: 100%;
`;

const FuncionalityIcons = ({ nickName, user_id }) => {
  const dispatch = useDispatch();
  const [isAlreadyFollowing, setFollowing] = useState(false);
  const [blockUserOpen, setBlockUserOpen] = useState(false);
  const { following } = useSelector((state) => state.user);
  const toggleFollowUser = () => {
    dispatch(toggleFollowUserAction(nickName));
  };
  useEffect(() => {
    following && setFollowing(following.includes(user_id));
  }, [following, user_id]);
  return (
    <StyledWrapper>
      {blockUserOpen && (
        <BlockUser setBlockUserOpen={setBlockUserOpen} user_id={user_id} />
      )}
      <StyledButton onClick={() => setBlockUserOpen(true)} tooltip="Block">
        <Block />
      </StyledButton>
      <StyledButton tooltip="Follow" onClick={toggleFollowUser}>
        <Follow className={isAlreadyFollowing ? "active" : undefined} />
      </StyledButton>
      <StyledButton as={Link} to={`/messages/${nickName}`}>
        <StyledIcon src={BlueMail} alt="mail icon" />
      </StyledButton>
    </StyledWrapper>
  );
};

FuncionalityIcons.propTypes = {
  nickName: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
};

export default FuncionalityIcons;
