import React from "react";
import theme from "utils/theme";
import PropTypes from "prop-types";
import styled from "styled-components";
// REDUX STUFF
import { useDispatch } from "react-redux";
import { deleteComment } from "redux/actions/dataActions";

const StyledAlert = styled.div`
  padding: 20px;
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
`;
const StyledButton = styled.div`
  padding: 3px 7px;
  align-self: center;
  border: none;
  border-radius: 10px;
  background: ${theme.colors.redish};
  color: ${theme.colors.whiteish};
  font-weight: bold;
`;
const DeleteComment = ({ comment_id }) => {
  const dispatch = useDispatch();
  const deleteCommentHandle = (e) => dispatch(deleteComment(comment_id));
  return (
    <>
      <StyledAlert>
        <h4>Are you sure to delete this comment ?</h4>
        <StyledButton onClick={deleteCommentHandle}>Delete</StyledButton>
      </StyledAlert>
    </>
  );
};

DeleteComment.propTypes = {
  comment_id: PropTypes.string.isRequired,
};

export default DeleteComment;
