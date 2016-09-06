var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "../src/es5"),
  entry: {
    entry: "../../webpack-code-splitting-ensure/entry.js"
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
    publicPath: "dist/js/", // Chunks need URI path prefix for our demo server
    pathinfo: true
  },
  resolve: {
    alias: {
      src: path.join(__dirname, "../src/es5")
    }
  },
  plugins: [
    // Abstract a common file between apps.
    new webpack.optimize.CommonsChunkPlugin({
      name: "entry",  // Set to entry point name.
      async: true     // Need async for extraction of common `./foo` dep.
    })
  ]
};
