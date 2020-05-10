import {
  LOADING_ADD_PRODUCT,
  CLEAR_ERRORS_ADD_PRODUCT,
  SET_ERRORS_ADD_PRODUCT,
  SET_SUCCESS_ADD_PRODUCT,
  SET_PRODUCTS,
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

export const getProducts = (variables) => async (dispatch) => {
  // variables contain { skip, limit, type && gender(optional)}
  console.log("get products action");
  try {
    const res = await axios.post("/product", variables);
    dispatch({ type: SET_PRODUCTS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
