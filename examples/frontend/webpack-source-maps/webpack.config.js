"use strict";

var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = {
  context: path.join(__dirname, "../src/es5"),
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // Preserve the source map comment in minified code.
      sourceMap: true
    }),

    new webpack.SourceMapDevToolPlugin({
      // https://webpack.github.io/docs/configuration.html#output-sourcemapfilename
      filename: "[name].js.map",

      // Output sourceMappingUrl comment.
      //
      // `[url]` is replaced with the `PATH/TO/<filename>`.
      //
      // Examples:
      // 1. Default to: `"\n//# sourceMappingURL=[url]"` for relative hosting
      append: ""
      // 2. Localhost + local repo checkout.
      // append: "\n//# sourceMappingURL=http://localhost:3000/" +
      //   "examples/frontend/webpack-source-maps/dist/js/[url]"
      // 3. Internal VPN URL.
      // append: "\n//# sourceMappingURL=http://my-vpn-url.com/PATH/[url]"
    }),

    new StatsWriterPlugin({
      filename: "../stats.json",
      fields: null
    })
  ]
};
