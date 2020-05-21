import {
  LOADING_SIGN_UP,
  LOADING_LOGIN,
  SET_ERRORS_LOGIN,
  SET_AUTH_USER,
  LOGOUT_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS_SIGNUP,
  LOADING_USER,
  SET_USER_DATA,
  UPDATE_USER_INFO,
  SET_NOTIFICATIONS,
  CLEAR_UNREAD_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
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

// LOGIN
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
// GET LOGGED USER DATA
export const getLoggedUserData = () => async (dispatch) => {
  console.log("get logged user info");
  try {
    const res = await axios.get("/user");
    dispatch({
      type: SET_AUTH_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
// AUTH TOKEN
const setAuthorizationToken = (token) => {
  const fullToken = `Bearer ${token}`;
  localStorage.setItem("AuthToken", fullToken);
  axios.defaults.headers.common["Authorization"] = fullToken;
};
// LOGOUT
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
// CREATE TOKEN
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
// GET USER DATA
export const getUserData = (nickName, setUserNotFound) => async (dispatch) => {
  console.log("get user data");
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.get(`/user/${nickName}`);
    if (!res.data) {
      console.log("user not found");
      setUserNotFound && setUserNotFound(true);
    } else dispatch({ type: SET_USER_DATA, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
// SAVE USER INFO CHANGES
export const changeUserInfo = (data, setLoading, setIsChanged) => async (
  dispatch
) => {
  console.log("save changes");
  setLoading(true);
  try {
    await axios.post("/user/update_info", data);
    dispatch({ type: UPDATE_USER_INFO, payload: data });
    setLoading(false);
    setIsChanged(true);
  } catch (err) {
    console.error(err);
  }
};
// CHANGE PASSWORD
export const changePassword = (
  passwords,
  setErrors,
  setLoading,
  setSuccess
) => async (dispatch) => {
  setLoading(true);
  try {
    const res = await axios.post("/user/password", passwords);
    setLoading(false);
    setSuccess(res.data);
    setErrors({});
  } catch (err) {
    console.error(err);
    setErrors(err.response.data);
    setLoading(false);
  }
};
// DELETE ACCOUNT
export const deleteAccount = (
  password,
  setLoading,
  setError,
  history
) => async (dispatch) => {
  setLoading(true);
  try {
    await axios.post("/user/account", { password });
    dispatch({ type: SET_UNAUTHENTICATED });
    localStorage.removeItem("AuthToken");
    delete axios.defaults.headers.common["Authorization"];
    history.push("/signup/select_type");
  } catch (err) {
    console.error(err);
    setLoading(false);
    setError(err.response.data);
  }
};
// GET NOTIFICATIONS
export const getNotifications = (setLoading) => async (dispatch) => {
  setLoading(true);
  try {
    const res = await axios.get("/notification");
    console.log(res.data);
    dispatch({ type: SET_NOTIFICATIONS, payload: res.data });
    setLoading(false);
  } catch (err) {
    console.error(err);
  }
};
// CLEAR NUMBER OF USER UNREAD NOTIFICATIONS
export const clearUnreadNotifications = () => async (dispatch) => {
  try {
    await axios.put("/notification/clear_unread");
    dispatch({ type: CLEAR_UNREAD_NOTIFICATIONS });
  } catch (err) {
    console.error(err);
  }
};
// MARK NOTIFICATION READ
export const markNotificationRead = (notification_id) => async (dispatch) => {
  try {
    await axios.put("/notification/read", { notification_id });
    dispatch({ type: SET_NOTIFICATION_READ, payload: notification_id });
  } catch (err) {
    console.error(err);
  }
};
