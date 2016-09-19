var path = require("path");
var webpack = require("webpack");

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
      // Defaults to: `"\n//# sourceMappingURL=[url]"` for relative hosting
      append: "\n//# sourceMappingURL=http://localhost:3000/" +
        "examples/frontend/webpack-source-maps/dist/js/[url]"
    })
  ]
};
