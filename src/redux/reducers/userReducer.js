import {
  SET_AUTH_USER,
  LOGOUT_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  TOGGLE_LIKE_PRODUCT,
  UPDATE_USER_INFO,
  SET_UNREAD_MESSAGES,
  SET_NOTIFICATIONS,
  CLEAR_UNREAD_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
  SET_FOLLOWING,
  SET_FOLLOWERS,
  SET_BLOCK_USER,
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
    case SET_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: action.payload,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications
          ? [...state.notifications, ...action.payload]
          : action.payload,
      };
    case CLEAR_UNREAD_NOTIFICATIONS:
      return {
        ...state,
        unreadNotificationsNumber: 0,
      };
    case SET_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.reduce((result, current) => {
          if (current._id === action.payload)
            return [...result, { ...current, read: true }];
          else return [...result, current];
        }, []),
      };
    case SET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    case SET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case SET_BLOCK_USER:
      return {
        ...state,
        blockedUsers: [action.payload, ...state.blockedUsers],
      };
    default:
      return { ...state };
  }
};
