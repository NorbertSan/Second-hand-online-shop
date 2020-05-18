import {
  SET_AUTH_USER,
  LOGOUT_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  TOGGLE_LIKE_PRODUCT,
  UPDATE_USER_INFO,
} from "redux/types";

const initialState = {
  auth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        auth: true,
        ...action.payload,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        auth: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        auth: false,
      };
    case TOGGLE_LIKE_PRODUCT:
      return {
        ...state,
        likesProducts: action.payload.productsIdsList,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};
