import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "utils/GlobalStyles";
import axios from "axios";
import AuthenticateToken from "utils/authenticateToken";

import AuthRoute from "utils/AuthRoute";
import NoAuthRoute from "utils/NoAuthRoute";
//REDUX STUFF
import { Provider } from "react-redux";
import store from "redux/store";
// COMPONENTS
import Navbar from "components/navbar/Navbar";
//pages
import homePage from "pages/homePage";
import authenticatedPage from "pages/authenticatedPage";
import clothesDetailsPage from "pages/clothesDetailsPage";
import addProductPage from "pages/addProductPage";
import userProfilePage from "pages/userProfilePage";

const BASE_URL = "http://localhost:5000/";
axios.defaults.baseURL = BASE_URL;

AuthenticateToken();

const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyles />
      <Navbar />
      <Switch>
        <Route exact path="/" component={homePage} />
        <NoAuthRoute
          exact
          path="/signup/select_type"
          component={authenticatedPage}
        />
        <Route exact path="/clothes/:id" component={clothesDetailsPage} />
        <Route exact path="/user/:nickName" component={userProfilePage} />
        <AuthRoute exact path="/add_product" component={addProductPage} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
