/* eslint-disable max-len */
import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import { Router, RouterContext, useRouterHistory, match } from "react-router";
import { createHistory, createMemoryHistory } from "history";

import Index from "../../templates/index.hbs";
import routes from "../routes";
import basename from "../basename";

// Client render (optional):
// `static-site-generator-webpack-plugin` supports shimming browser globals
// so instead of checking whether the document is undefined (always false),
// Check whether it’s being shimmed
if (typeof window !== "undefined" && window.__STATIC_GENERATOR !== true) { //eslint-disable-line no-undef
  const history = useRouterHistory(createHistory)({ basename });
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
