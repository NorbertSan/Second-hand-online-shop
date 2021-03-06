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
import userProfilePage from "components/views/userProfilePage/userProfilePage";
import searchProductsPage from "components/views/searchProductsPage/searchProductsPage";
import favouritesProductsPage from "components/views/favouritesProductsPage/favouritesProductsPage";
import userCommentsPage from "components/views/userCommentsPage/userCommentsPage";
import searchUserRedirect from "components/views/searchUserRedirect";
import accountSettings from "components/views/accountSettings/accountSettings";
import messagesPage from "components/views/messagesPage/messagesPage";
import conversationRoomPage from "components/views/conversationRoomPage/conversationRoomPage";
import shoppingCardPage from "components/views/shoppingCardPage/shoppingCardPage";
import finalizationPage from "components/views/finalizationPage/finalizationPage";
import purchasesPage from "components/views/purchasesPage/purchasesPage";
import salesPage from "components/views/salesPage/salesPage";

const BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = BASE_URL;

AuthenticateToken();
// TODO, CREATE SALES PAGE
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
        <Route
          exact
          path="/product/:product_id"
          component={productDetailsPage}
        />
        <Route
          exact
          path="/user/:nickName/comments"
          component={userCommentsPage}
        />
        <Route exact path="/user/:nickName" component={userProfilePage} />
        <Route path="/user" component={searchUserRedirect} />
        <Route path="/products" component={searchProductsPage} />
        <AuthRoute exact path="/add_product" component={addProductPage} />
        <AuthRoute
          exact
          path="/favourites"
          component={favouritesProductsPage}
        />
        <AuthRoute exact path="/account/settings" component={accountSettings} />
        <AuthRoute exact path="/messages" component={messagesPage} />
        <AuthRoute
          exact
          path="/messages/:nickName"
          component={conversationRoomPage}
        />
        <AuthRoute exact path="/shoppingCard" component={shoppingCardPage} />
        <AuthRoute
          exact
          path="/finalization/:product_id"
          component={finalizationPage}
        />
        <AuthRoute exact path="/account/purchases" component={purchasesPage} />
        <AuthRoute exact path="/account/sales" component={salesPage} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
