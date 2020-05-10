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

// VIEWS
import Navbar from "components/views/navbar/Navbar";
import homePage from "components/views/homePage/homePage";
import addProductPage from "components/views/addProductPage/addProductPage";
import signInSignUpPage from "components/views/signInSignUpPage/signInSignUpPage";
import productDetailsPage from "components/views/productDetailsPage/productDetailsPage";
import userProfilePage from "components/views/userProfilePage";
import searchProductsPage from "components/views/searchProductsPage/searchProductsPage";

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
          component={signInSignUpPage}
        />
        <Route exact path="/clothes/:id" component={productDetailsPage} />
        <Route exact path="/user/:nickName" component={userProfilePage} />
        <Route path="/clothes" component={searchProductsPage} />
        <AuthRoute exact path="/add_product" component={addProductPage} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
