import React, { useState } from "react";
import PropTypes from "prop-types";
// COMPONENTS
import GreyBackground from "components/atoms/GreyBackground";
import AddEditCommentFormSkeleton from "./AddEditCommentFormSkeleton";
// REDUX STUFF
import { editComment } from "redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";

const EditComment = ({ toggleDropDownMenu, comment_id }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [editCommentContent] = useSelector((state) =>
    state.data.comments.filter((comment) => comment._id === comment_id)
  );
  const editCommentHandler = (data) => {
    setLoading(true);
    dispatch(editComment(data, toggleDropDownMenu, comment_id));
  };

  return (
    <>
      <GreyBackground />
      <AddEditCommentFormSkeleton
        loading={loading}
        toggleAddCommentOpen={toggleDropDownMenu}
        handleFunc={editCommentHandler}
        commentContent={editCommentContent}
      />
    </>
  );
};

EditComment.propTypes = {
  toggleDropDownMenu: PropTypes.func.isRequired,
  comment_id: PropTypes.string.isRequired,
};

export default EditComment;
