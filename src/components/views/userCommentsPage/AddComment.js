import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// COMPONENTS
import GreyBackground from "components/atoms/GreyBackground";
import AddEditCommentFormSkeleton from "./AddEditCommentFormSkeleton";
// REDUX STUFF
import { addComment } from "redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";

const AddComment = ({ toggleAddCommentOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addCommentHandler = (data) => {
    setLoading(true);
    dispatch(
      addComment(
        { ...data, replace: comments.length >= 1 },
        toggleAddCommentOpen
      )
    );
  };
  const nickNameLoggedUser = useSelector((state) => state.user.nickName);
  const comments = useSelector((state) =>
    state.data.comments.filter(
      (comment) => comment.writer.nickName === nickNameLoggedUser
    )
  );

  return (
    <>
      <GreyBackground />
      <AddEditCommentFormSkeleton
        loading={loading}
        toggleAddCommentOpen={toggleAddCommentOpen}
        handleFunc={addCommentHandler}
        anotherComment={comments.length >= 1}
      />
    </>
  );
};

AddComment.propTypes = {
  toggleAddCommentOpen: PropTypes.func.isRequired,
};

export default AddComment;
