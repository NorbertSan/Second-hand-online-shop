import {
  LOADING_ADD_PRODUCT,
  CLEAR_ERRORS_ADD_PRODUCT,
  SET_ERRORS_ADD_PRODUCT,
  SET_SUCCESS_ADD_PRODUCT,
  TOGGLE_LIKE_PRODUCT,
} from "redux/types";
import axios from "axios";

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
