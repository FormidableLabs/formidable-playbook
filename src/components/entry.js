import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";

import Index from "../../templates/index.hbs";
import App from "./App.js";

// Client render (optional):
// `static-site-generator-webpack-plugin` supports shimming browser globals
// so instead of checking whether the document is undefined (always false),
// Check whether it’s being shimmed
if (typeof window !== "undefined" && window.__STATIC_GENERATOR !== true) { //eslint-disable-line no-undef
  render(<App />, document.getElementById("content"));
}

// Exported static site renderer:
export default (locals, callback) => {
  callback(null, Index({
    content: renderToString(<App />),
    bundleJs: locals.assets.main
  }));
};
