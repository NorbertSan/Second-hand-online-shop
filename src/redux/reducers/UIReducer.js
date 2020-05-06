import {
  SIGN_UP,
  LOADING_SIGN_UP,
  LOADING_LOGIN,
  SET_ERRORS_LOGIN,
} from "redux/types";

const initialState = {
  loadingSignUp: false,
  loadingLogin: false,
  errorsLogin: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SIGN_UP:
      return {
        ...state,
        loadingSignUp: true,
      };
    case SIGN_UP:
      return {
        ...state,
        loadingSignUp: false,
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
    default:
      return { ...state };
  }
};
