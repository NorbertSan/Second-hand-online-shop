import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "utils/GlobalStyles";

import Navbar from "components/navbar/Navbar";

//pages
import homePage from "pages/homePage";
import authenticatedPage from "pages/authenticatedPage";

const App = () => (
  <Router>
    <GlobalStyles />
    <Navbar />
    <Switch>
      <Route exact path="/" component={homePage} />
      <Route exact path="/signup/select_type" component={authenticatedPage} />
    </Switch>
  </Router>
);

export default App;
