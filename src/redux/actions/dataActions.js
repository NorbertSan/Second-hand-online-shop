import {
  LOADING_ADD_PRODUCT,
  CLEAR_ERRORS_ADD_PRODUCT,
  SET_ERRORS_ADD_PRODUCT,
  SET_SUCCESS_ADD_PRODUCT,
  TOGGLE_LIKE_PRODUCT,
  SET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  LOADING_COMMENTS,
  SET_MESSAGE,
  SET_CONVERSATIONS_ROOMS,
} from "redux/types";
import axios from "axios";

// ADD PRODUCT
export const addProduct = (data) => async (dispatch) => {
  console.log("add product  action");
  dispatch({ type: LOADING_ADD_PRODUCT });
  dispatch({ type: CLEAR_ERRORS_ADD_PRODUCT });
  try {
    await axios.post("/product/add", data);
    dispatch({ type: SET_SUCCESS_ADD_PRODUCT });
  } catch (err) {
    dispatch({ type: SET_ERRORS_ADD_PRODUCT });
    console.error(err);
  }
};
// TOGGLE LIKE ON PRODUCT
export const toggleLike = (product_id) => async (dispatch) => {
  console.log("toggle like action");
  try {
    const res = await axios.get(`product/${product_id}/like`);
    dispatch({
      type: TOGGLE_LIKE_PRODUCT,
      payload: {
        productsIdsList: res.data.productsIdsList,
        product_id,
        like: res.data.like, // means, true - like, false-unlike
      },
    });
  } catch (err) {
    console.error(err);
  }
};
// GET ALL COMMENTS ON SPECIFIC USER
export const getComments = (nickName) => async (dispatch) => {
  console.log("get comments");
  dispatch({ type: LOADING_COMMENTS });
  try {
    const res = await axios.get(`/comment/user/${nickName}`);
    dispatch({ type: SET_COMMENTS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
// ADD COMMENT UNDER USER PROFILE
export const addComment = (data, toggleAddCommentOpen) => async (dispatch) => {
  console.log("add comment action");
  try {
    const res = await axios.post(`/comment`, data);
    dispatch({
      type: ADD_COMMENT,
      payload: {
        comment: res.data.comment,
        commentIdToDelete: res.data.commentIdToDelete, // ID || NULL
      },
    });
    toggleAddCommentOpen(false);
  } catch (err) {
    console.error(err);
  }
};
// DELETE COMMENT UNDER USER PROFILE
export const deleteComment = (comment_id, nickName) => async (dispatch) => {
  console.log("delete comment");
  try {
    await axios.delete(`/comment/${comment_id}/${nickName}`);
    dispatch({ type: DELETE_COMMENT, payload: comment_id });
  } catch (err) {
    console.error(err);
  }
};
// EDIT COMMENT UNDER USER PROFILE
export const editComment = (data, toggleAddCommentOpen, comment_id) => async (
  dispatch
) => {
  console.log("edit comment");
  try {
    const res = await axios.put(`/comment/${comment_id}`, data);
    dispatch({ type: EDIT_COMMENT, payload: res.data });
    toggleAddCommentOpen(false);
  } catch (err) {
    console.error(err);
  }
};
// SEND MESSAGE
export const sendMessage = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/message/add", data);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};
// SET CONVERSATION ROOMS
export const getConversationRooms = (setLoading) => async (dispatch) => {
  try {
    const res = await axios.get("/message/rooms");
    dispatch({ type: SET_CONVERSATIONS_ROOMS, payload: res.data });
    console.log(res.data);
    setLoading(false);
  } catch (err) {
    console.error(err);
  }
};
