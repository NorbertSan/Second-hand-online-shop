import React, { useState, useRef } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// COMPONENTS
import GreyBackground from "components/atoms/GreyBackground";
import AddEditCommentFormSkeleton from "./AddEditCommentFormSkeleton";
// REDUX STUFF
import { addComment } from "redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
//HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";

const StyledAuthAlert = styled.div`
  position: fixed;
  bottom: 75px;
  right: 75px;
  background: #fff;
  padding: 10px;
  box-shadow: 0 0 4px grey;
  border-radius: 15px 15px 0 15px;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
  font-size: ${theme.fontSize.xs}!important;
  color: grey !important;
  font-weight: bold;
  font-style: italic;
  align-self: flex-end;
  background: #eee;
  padding: 2px 5px;
  border-radius: 10px;
  margin-top: 5px;
`;

const AddComment = ({ toggleAddCommentOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authAlertRef = useRef(null);
  const addCommentHandler = (data) => {
    setLoading(true);
    dispatch(
      addComment(
        { ...data, replace: comments.length >= 1 },
        toggleAddCommentOpen
      )
    );
  };
  useDetectClickOutside(authAlertRef, toggleAddCommentOpen);
  const nickNameLoggedUser = useSelector((state) => state.user.nickName);
  const auth = useSelector((state) => state.user.auth);
  const comments = useSelector((state) =>
    state.data.comments.filter(
      (comment) => comment.writer.nickName === nickNameLoggedUser
    )
  );

  return (
    <>
      {auth ? (
        <>
          <GreyBackground />
          <AddEditCommentFormSkeleton
            loading={loading}
            toggleAddCommentOpen={toggleAddCommentOpen}
            handleFunc={addCommentHandler}
            anotherComment={comments.length >= 1}
          />
        </>
      ) : (
        <StyledAuthAlert ref={authAlertRef}>
          <span>You are not logged in</span>
          <StyledLink to="/signup/select_type">Log in</StyledLink>
        </StyledAuthAlert>
      )}
    </>
  );
};

AddComment.propTypes = {
  toggleAddCommentOpen: PropTypes.func.isRequired,
};

export default AddComment;
