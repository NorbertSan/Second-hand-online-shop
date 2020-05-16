import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "redux/actions/dataActions";
// ICONS
import CommentsIcon from "assets/icons/comments.svg";
import PlusIcon from "assets/icons/plusInCircle.svg";
import BackArrowIcon from "assets/icons/backArrow.svg";
// COMPONENTS
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import { BulletList } from "react-content-loader";

const StyledWrapper = styled.section`
  padding: 50px 15px 15px 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  position: relative;
`;
const StyledTitle = styled.h2`
  margin-top: 0;
  text-align: Center;
`;
const StyledIcon = styled.img`
  width: 80px;
  margin: auto;
  ${({ small }) =>
    small &&
    css`
      width: 35px;
      height: 35px;
    `}
`;
const StyledNotCommentsAlert = styled.div`
  text-align: center;
  background: #eee;
  margin-top: 20px;
  box-shadow: 0 0 1px grey;
  padding: 10px;
`;
const StyledAddCommentButton = styled.button`
  border: none;
  border-radius: 50%;
  background: #eee;
  padding: 4px;
  width: 43px;
  height: 43px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 5;
`;
const BackButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  position: absolute;
  top: 0px;
  img {
    width: 100%;
  }
`;

const UserCommentsPage = () => {
  const { nickName } = useParams();
  const loading = useSelector((state) => state.UI.loadingComments);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.data.comments);
  const [isAddCommentOpen, toggleAddCommentOpen] = useState(false);
  useEffect(() => {
    dispatch(getComments(nickName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWrapper>
      <BackButton as={Link} to={`/user/${nickName}`}>
        <img src={BackArrowIcon} alt="left arrow" />
      </BackButton>
      <StyledTitle>Comments about user {nickName}</StyledTitle>
      {loading ? (
        <BulletList backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
      ) : comments.length > 0 ? (
        <CommentsList comments={comments} />
      ) : (
        <>
          <StyledIcon src={CommentsIcon} alt="comments icon" />
          <StyledNotCommentsAlert>
            There are no reviews yet
          </StyledNotCommentsAlert>
        </>
      )}
      <StyledAddCommentButton
        onClick={() => toggleAddCommentOpen((prevState) => !prevState)}
      >
        <StyledIcon small src={PlusIcon} alt="plus in circle icon" />
      </StyledAddCommentButton>
      {isAddCommentOpen && (
        <AddComment toggleAddCommentOpen={toggleAddCommentOpen} />
      )}
    </StyledWrapper>
  );
};

export default UserCommentsPage;
