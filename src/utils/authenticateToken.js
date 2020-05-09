import store from "redux/store";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getLoggedUserData } from "redux/actions/userActions";
import { createToken } from "redux/actions/userActions";
import { SET_AUTHENTICATED } from "redux/types";

const AuthenticateToken = () => {
  const token = localStorage.AuthToken;
  if (!token) return;
  const decodedToken = jwtDecode(token);
  const isTokenExpired = decodedToken.exp * 1000 < Date.now();
  if (isTokenExpired) {
    // endpoint check if user checked remeber option in login for, and then create a new token and return it
    console.log("token expired, checking refersh token in db...");
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(createToken(decodedToken));
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getLoggedUserData());
  }
};

export default AuthenticateToken;
