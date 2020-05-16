import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";

const SearchUserRedirect = () => {
  const location = useLocation();
  const queries = queryString.parse(location.search);
  return <Redirect to={`/user/${queries.nickName || ""}`} />;
};
export default SearchUserRedirect;
