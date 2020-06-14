import React from "react";
import theme from "utils/theme";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useParams } from "react-router-dom";
// REDUX STUFF
import { useDispatch } from "react-redux";
import { deleteComment } from "redux/actions/dataActions";

const StyledWrapper = styled.div`
  padding: 15px;
  box-shadow: 0 0 3px grey;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  text-align: center;
`;
const StyledButton = styled.button`
  padding: 4px 10px;
  align-self: center;
  border: none;
  border-radius: 10px;
  background: ${theme.colors.redish};
  color: ${theme.colors.whiteish};
  font-weight: bold;
`;
const DeleteComment = ({ comment_id }) => {
  const dispatch = useDispatch();
  const { nickName } = useParams();
  const deleteCommentHandle = (e) =>
    dispatch(deleteComment(comment_id, nickName));
  return (
    <>
      <StyledWrapper>
        <h4>Are you sure to delete this comment?</h4>
        <StyledButton onClick={deleteCommentHandle}>Delete</StyledButton>
      </StyledWrapper>
    </>
  );
};

DeleteComment.propTypes = {
  comment_id: PropTypes.string.isRequired,
};

export default DeleteComment;
