import React from "react";
import { Route, IndexRoute } from "react-router";

// Components
import App from "./components/app";
import Home from "./views/Home";
import Docs from "./views/Docs";
import NotFound from "./views/NotFound";

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/frontend" component={Docs} />
    <Route path="/frontend/:article" component={Docs} />
    <Route path="/infrastructure" component={Docs} />
    <Route path="/infrastructure/:article" component={Docs} />
    <Route path="*" component={NotFound}/>
  </Route>
);
