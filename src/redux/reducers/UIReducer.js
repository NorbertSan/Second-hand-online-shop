import {
  SET_ERRORS_SIGNUP,
  LOADING_SIGN_UP,
  LOADING_LOGIN,
  SET_ERRORS_LOGIN,
  SET_SUCCESS_ADD_PRODUCT,
  SET_ERRORS_ADD_PRODUCT,
  CLEAR_ERRORS_ADD_PRODUCT,
} from "redux/types";

const initialState = {
  loadingSignUp: false,
  loadingLogin: false,
  errorsLogin: {},
  errorsSignUp: {},
  errorsAddProduct: null,
  successAddProduct: null,
  loadingAddProduct: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SIGN_UP:
      return {
        ...state,
        loadingSignUp: true,
      };
    case SET_ERRORS_SIGNUP:
      return {
        ...state,
        loadingSignUp: false,
        errorsSignUp: action.payload,
      };
    case LOADING_LOGIN:
      return {
        ...state,
        loadingLogin: true,
      };
    case SET_ERRORS_LOGIN:
      return {
        ...state,
        loadingLogin: false,
        errorsLogin: action.payload,
      };
    case SET_SUCCESS_ADD_PRODUCT:
      return {
        ...state,
        successAddProduct: "Product upload successfully",
        loadingAddProduct: false,
      };
    case SET_ERRORS_ADD_PRODUCT:
      return {
        ...state,
        errorsAddProduct: "Something went wrong, try again later",
        loadingAddProduct: false,
      };
    case CLEAR_ERRORS_ADD_PRODUCT:
      return {
        ...state,
        successAddProduct: null,
        errorsAddProduct: null,
        loadingAddProduct: true,
      };
    default:
      return { ...state };
  }
};
