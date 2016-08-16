/* eslint-disable max-len */
import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import { Router, RouterContext, useRouterHistory, match } from "react-router";
import { createHistory, createMemoryHistory } from "history";
import ReactGA from "react-ga";

import Index from "../../templates/index.hbs";
import routes from "../routes";
import basename from "../basename";

// Client render (optional):
// `static-site-generator-webpack-plugin` supports shimming browser globals
// so instead of checking whether the document is undefined (always false),
// Check whether it’s being shimmed
if (typeof window !== "undefined" && window.__STATIC_GENERATOR !== true) { //eslint-disable-line no-undef
  const history = useRouterHistory(createHistory)({ basename });
  // Add Google Analytics tracking for each page
  ReactGA.initialize("UA-43290258-1");
  history.listen((location) => {
    const fullLocation = basename + location.pathname;
    ReactGA.set({ page: fullLocation });
    ReactGA.pageview(fullLocation);
  });
  render(
    <Router
      history={history}
      routes={routes}
    />,
    document.getElementById("content")
  );
}

// Exported static site renderer:
export default (locals, callback) => {
  global.navigator = {
    userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36"
  };

  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, Index({
      content: renderToString(<RouterContext {...renderProps} />),
      bundleJs: locals.assets.main,
      baseHref: `${basename}/`
    }));
  });
};
