import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const NoAuthRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.user.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default NoAuthRoute;
