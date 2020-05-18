import React from "react";
import styled, { css } from "styled-components";
import theme from "utils/theme";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const StyledDefaultAvatar = styled.div`
    width: 70px;
  height: 70px;
  border-radius: 50%;
  flex-shrink: 1;
  border: 1px solid grey;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit:cover;
  font-size: ${theme.fontSize.xl};
  &:after {
    position: absolute;
    text-transform: uppercase;
    content: '${(props) => props.initial}';
    color: grey;
  }
  ${({ comment }) =>
    comment &&
    css`
      width: 45px;
      height: 45px;
      margin-right: 15px;
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
    `}
  ${({ productDetails }) =>
    productDetails &&
    css`
      width: 80px;
      height: 80px;
      padding: 2px;
      border: 2px solid ${theme.colors.blackish};
      margin-right: 10px;
    `}
  ${({ changeAvatar }) =>
    changeAvatar &&
    css`
      width: 70px;
      height: 70px;
      border: 1px solid grey;
    `}
  
`;
const DefaultAvatar = ({
  comment,
  smallMenuIcon,
  userProfile,
  productDetails,
  changeAvatar,
}) => {
  const fullName = useSelector((state) => state.user.fullName);
  return (
    <StyledDefaultAvatar
      comment={comment}
      smallMenuIcon={smallMenuIcon}
      userProfile={userProfile}
      productDetails={productDetails}
      changeAvatar={changeAvatar}
      initial={fullName ? fullName.substr(0, 1) : ""}
    />
  );
};

DefaultAvatar.propTypes = {
  comment: PropTypes.bool,
  smallMenuIcon: PropTypes.bool,
  userProfile: PropTypes.bool,
  productDetails: PropTypes.bool,
  changeAvatar: PropTypes.bool,
};

export default DefaultAvatar;
