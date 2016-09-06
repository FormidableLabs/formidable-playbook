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
    filename: "[name].js",
    pathinfo: true
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "../src/es5"),
      manifest: require("./dist/js/lib-manifest.json")
    })
  ]
};
