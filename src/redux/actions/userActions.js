import {
  SIGN_UP,
  LOADING_SIGN_UP,
  LOADING_LOGIN,
  SET_ERRORS_LOGIN,
} from "redux/types";
import axios from "axios";

export const signUp = (data, switchToLoginForm) => async (dispatch) => {
  console.log("sign up action");
  dispatch({ type: LOADING_SIGN_UP });
  try {
    await axios.post("/user/signup", data);
    dispatch({ type: SIGN_UP });
    switchToLoginForm();
  } catch (err) {
    console.error(err);
    dispatch({ type: SIGN_UP });
  }
};

export const login = (data, history) => async (dispatch) => {
  console.log("login action ");
  dispatch({ type: LOADING_LOGIN });
  try {
    const res = await axios.post("/user/login", data);
    const accessToken = res.data.accessToken;
    dispatch({ type: SET_ERRORS_LOGIN, payload: {} });
    setAuthorizationToken(accessToken);
    dispatch(getLoggedUserData());
    history.push("/");
  } catch (err) {
    dispatch({ type: SET_ERRORS_LOGIN, payload: err.response.data });
  }
};

export const getLoggedUserData = () => async (dispatch) => {
  // todo get user logged data, call api, then said auth to true
};

const setAuthorizationToken = (token) => {
  const fullToken = `Bearer ${token}`;
  localStorage.setItem("AuthToken", fullToken);
  axios.defaults.headers.common["Authorization"] = fullToken;
};
