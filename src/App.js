import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "utils/GlobalStyles";
import axios from "axios";

//REDUX STUFF
import { Provider } from "react-redux";
import store from "redux/store";
// COMPONENTS
import Navbar from "components/navbar/Navbar";
//pages
import homePage from "pages/homePage";
import authenticatedPage from "pages/authenticatedPage";
import clothesDetailsView from "pages/clothesDetailsView";
// BASE URL AXIOS
const BASE_URL = "http://localhost:5000";
axios.defaults.baseURL = BASE_URL;

const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyles />
      <Navbar />
      <Switch>
        <Route exact path="/" component={homePage} />
        <Route exact path="/signup/select_type" component={authenticatedPage} />
        <Route exact path="/clothes/:id" component={clothesDetailsView} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
