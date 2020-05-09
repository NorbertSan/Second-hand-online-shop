import {
  CLEAR_ERRORS_ADD_PRODUCT,
  SET_ERRORS_ADD_PRODUCT,
  SET_SUCCESS_ADD_PRODUCT,
} from "redux/types";
import axios from "axios";

export const addProduct = (data, history) => async (dispatch) => {
  console.log("add product  action");
  dispatch({ type: CLEAR_ERRORS_ADD_PRODUCT });
  try {
    await axios.post("/product/add", data);
    dispatch({ type: SET_SUCCESS_ADD_PRODUCT });
    setTimeout(() => {
      history.push("/");
    }, 1500);
  } catch (err) {
    dispatch({ type: SET_ERRORS_ADD_PRODUCT });
    console.error(err);
  }
};
