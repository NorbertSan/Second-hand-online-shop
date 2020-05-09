import {
  LOADING_SIGN_UP,
  LOADING_LOGIN,
  SET_ERRORS_LOGIN,
  SET_USER,
  LOGOUT_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS_SIGNUP,
} from "redux/types";
import axios from "axios";

export const signUp = (data, switchToLoginForm) => async (dispatch) => {
  console.log("sign up action");
  dispatch({ type: LOADING_SIGN_UP });
  try {
    await axios.post("/user/signup", data);
    dispatch({ type: SET_ERRORS_SIGNUP, payload: {} });
    switchToLoginForm();
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_ERRORS_SIGNUP, payload: err.response.data });
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
  console.log("get logged user info");
  try {
    const res = await axios.get("/user");
    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

const setAuthorizationToken = (token) => {
  const fullToken = `Bearer ${token}`;
  localStorage.setItem("AuthToken", fullToken);
  axios.defaults.headers.common["Authorization"] = fullToken;
};

export const logout = (email) => async (dispatch) => {
  console.log("logout action");
  try {
    localStorage.removeItem("AuthToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: LOGOUT_USER });
    await axios.post("/user/logout", { email });
  } catch (err) {
    console.error(err);
  }
};

export const createToken = (decodedToken) => async (dispatch) => {
  console.log("create token action");
  try {
    const res = await axios.post("/user/token", { decodedToken });
    const newToken = res.data.newToken;
    setAuthorizationToken(newToken);
    dispatch(getLoggedUserData());
  } catch (err) {
    console.error(err);
    localStorage.removeItem("AuthToken");
    dispatch({ type: SET_UNAUTHENTICATED });
    delete axios.defaults.headers.common["Authorization"];
  }
};
