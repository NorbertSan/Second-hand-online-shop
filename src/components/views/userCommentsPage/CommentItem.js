import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import theme from "utils/theme";
import styled from "styled-components";
// ICON
import { ReactComponent as Icon } from "assets/icons/star.svg";
import UserIcon from "assets/icons/NoFaceIcon.svg";
// COMPONENTS
import NickName from "components/atoms/NickName";
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
  margin: 0;
  font-size: ${theme.fontSize.s};
`;
const StyledStarsWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 15px;
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
  font-size: ${theme.fontSize.xs};
`;

const CommentItem = ({ comment }) => {
  return (
    <StyledWrapper>
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
        <NickName large>{comment.writer.nickName}</NickName>
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
