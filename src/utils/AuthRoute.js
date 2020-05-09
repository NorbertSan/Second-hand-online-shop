import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.user.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? <Redirect to="/signup/select_type" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
