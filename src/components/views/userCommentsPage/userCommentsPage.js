import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

// ICONS
import CommentsIcon from "assets/icons/comments.svg";
import PlusIcon from "assets/icons/plusInCircle.svg";
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
  z-index: 9;
`;

const UserCommentsPage = () => {
  const { nickName } = useParams();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [isAddCommentOpen, toggleAddCommentOpen] = useState(false);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comment/user/${nickName}`);
        console.log(res.data);
        setComments(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <StyledWrapper>
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
        <AddComment
          setComments={setComments}
          toggleAddCommentOpen={toggleAddCommentOpen}
        />
      )}
    </StyledWrapper>
  );
};

export default UserCommentsPage;
