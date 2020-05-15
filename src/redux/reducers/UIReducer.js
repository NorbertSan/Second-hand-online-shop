import {
  SET_ERRORS_SIGNUP,
  LOADING_SIGN_UP,
  LOADING_LOGIN,
  LOADING_ADD_PRODUCT,
  SET_ERRORS_LOGIN,
  SET_SUCCESS_ADD_PRODUCT,
  SET_ERRORS_ADD_PRODUCT,
  CLEAR_ERRORS_ADD_PRODUCT,
  LOADING_PRODUCTS,
  SET_PRODUCTS,
  LOADING_USER,
  SET_USER_DATA,
} from "redux/types";

const initialState = {
  loadingSignUp: false,
  loadingLogin: false,
  errorsLogin: {},
  errorsSignUp: {},
  errorsAddProduct: null,
  successAddProduct: null,
  loadingAddProduct: false,
  loadingProducts: false,
  loadingUserData: false,
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
      };
    case LOADING_ADD_PRODUCT:
      return {
        ...state,
        loadingAddProduct: true,
      };
    case LOADING_PRODUCTS:
      return { ...state, loadingProducts: true };

    case SET_PRODUCTS:
      return { ...state, loadingProducts: false };
    case LOADING_USER:
      return { ...state, loadingUserData: true };

    case SET_USER_DATA:
      return {
        ...state,
        loadingUserData: false,
      };
    default:
      return { ...state };
  }
};
