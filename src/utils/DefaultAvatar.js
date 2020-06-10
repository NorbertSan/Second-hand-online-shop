import React from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledDefaultAvatar = styled.div`
    width: 70px;
  height: 70px;
  border-radius: 50%;
  flex-shrink: 1;
  object-fit:cover;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.xl};
  position:relative;
  &:after {
    position: absolute;
    text-transform: uppercase;
    content: '${(props) => props.initial}';
    color: ${theme.colors.blackish};
  }
  ${({ comment }) =>
    comment &&
    css`
      min-width: 45px;
      max-width: 45px;
      height: 45px;
      margin-right: 15px;
      font-size: 22px;
    `}
  ${({ smallMenuIcon }) =>
    smallMenuIcon &&
    css`
      width: 40px;
      height: 40px;
      margin-right: 5px;
    `}
  ${({ userProfile }) =>
    userProfile &&
    css`
      width: 90px;
      height: 90px;
      margin-right: 15px;
      border: 1px solid ${theme.colors.blackish};
    `}
  ${({ productDetails }) =>
    productDetails &&
    css`
      width: 80px;
      height: 80px;
      border: 1px solid ${theme.colors.blackish};
      margin-right: 10px;
      font-size: 50px;
    `}
  
  ${({ changeAvatar }) =>
    changeAvatar &&
    css`
      width: 70px;
      height: 70px;
      border: 1px solid grey;
    `}
  ${({ productItem }) =>
    productItem &&
    css`
      width: 25px;
      height: 25px;
      margin: 5px;
      font-size: 16px;
      border: 1px solid grey;
    `}
  ${({ followItem }) =>
    followItem &&
    css`
      width: 25px;
      height: 25px;
      margin-right: 8px;
      font-size: 16px;
    `}
  ${({ blockedUser }) =>
    blockedUser &&
    css`
      width: 35px;
      height: 35px;
      margin-right: 8px;
      font-size: 16px;
      border: 1px solid ${theme.colors.blackish};
    `}
`;
const DefaultAvatar = ({
  avatar,
  comment,
  smallMenuIcon,
  userProfile,
  productDetails,
  changeAvatar,
  productItem,
  nickName,
  followItem,
  blockedUser,
}) => {
  return (
    <StyledDefaultAvatar
      as={avatar && "img"}
      alt="avatar"
      src={`${BASE_URL}/${avatar}`}
      productItem={productItem}
      comment={comment}
      smallMenuIcon={smallMenuIcon}
      userProfile={userProfile}
      productDetails={productDetails}
      changeAvatar={changeAvatar}
      followItem={followItem}
      blockedUser={blockedUser}
      initial={nickName && nickName.substr(0, 1)}
    />
  );
};

DefaultAvatar.propTypes = {
  comment: PropTypes.bool,
  smallMenuIcon: PropTypes.bool,
  userProfile: PropTypes.bool,
  productDetails: PropTypes.bool,
  changeAvatar: PropTypes.bool,
  followItem: PropTypes.bool,
  nickName: PropTypes.string,
};

export default DefaultAvatar;
