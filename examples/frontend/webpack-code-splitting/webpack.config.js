var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "../src"),
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  plugins: [
    // Abstract a common file between apps.
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
      minChunks: 2 // force abstraction for our two apps.
    })
  ]
};
