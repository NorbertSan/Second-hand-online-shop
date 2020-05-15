import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// COMPONENTS
import CommentItem from "./CommentItem";
const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const CommentsList = ({ comments }) => {
  return (
    <StyledWrapper>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </StyledWrapper>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentsList;
