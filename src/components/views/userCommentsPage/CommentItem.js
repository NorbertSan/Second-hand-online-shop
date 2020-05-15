import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import theme from "utils/theme";
import { Link } from "react-router-dom";
import styled from "styled-components";
// REDUX STUFF
import { useSelector } from "react-redux";
// ICON
import { ReactComponent as Icon } from "assets/icons/star.svg";
import ThreeDotsIcon from "assets/icons/threeDots.svg";
import UserIcon from "assets/icons/NoFaceIcon.svg";
// COMPONENTS
import NickName from "components/atoms/NickName";
import DropDownMenu from "./DropDownMenu";

const stars = [1, 2, 3, 4, 5];
const StyledWrapper = styled.li`
  display: flex;
  padding: 15px;
  background: #fff;
  box-shadow: 0 0 10px 5px #eee;
  margin-bottom: 12px;
  position: relative;
`;
const StyledAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 15px;
  padding: 3px;
  border: 2px solid #eee;
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledParagraph = styled.p`
  margin: 6px 0 1px 0;
  font-size: ${theme.fontSize.xs};
`;
const StyledStarsWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 30px;
  top: 10px;
`;
const StyledStar = styled(Icon)`
  width: 14px;
  height: 14px;
  transition: all 0.2s ease-in-out;
  margin-left: 4px;
  path {
    fill: grey;
    stroke: #e5e5e5;
  }
  &.filled {
    path {
      fill: ${theme.colors.secondary};
    }
  }
`;
const StyledDateInfo = styled.span`
  font-weight: bold;
  color: grey;
  font-size: 9px;
`;
const CommentDropMenuButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  padding: 5px;
  border: none;
  background: transparent;
  z-index: 9;
`;
const StyledIcon = styled.img`
  width: 100%;
`;

const CommentItem = ({ comment }) => {
  const authUserNickName = useSelector((state) => state.user.nickName);
  const [isDropDownMenuOpen, toggleDropDownMenu] = useState(false);
  return (
    <StyledWrapper>
      {authUserNickName && authUserNickName === comment.writer.nickName && (
        <CommentDropMenuButton onClick={() => toggleDropDownMenu(true)}>
          {isDropDownMenuOpen && (
            <DropDownMenu
              comment_id={comment._id}
              toggleDropDownMenu={toggleDropDownMenu}
            />
          )}
          <StyledIcon src={ThreeDotsIcon} alt="three dots" />
        </CommentDropMenuButton>
      )}
      <StyledStarsWrapper>
        {stars.map((star) => (
          <StyledStar
            className={star <= comment.stars && "filled"}
            key={star}
            index={star}
          />
        ))}
      </StyledStarsWrapper>
      <StyledAvatar src={UserIcon} alt="user icon" />
      <StyledInnerWrapper>
        <Link to={`/user/${comment.writer.nickName}`}>
          <NickName big>{comment.writer.nickName}</NickName>
        </Link>
        <StyledParagraph>{comment.body}</StyledParagraph>
        <StyledDateInfo>{moment(comment.createdAt).fromNow()}</StyledDateInfo>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
