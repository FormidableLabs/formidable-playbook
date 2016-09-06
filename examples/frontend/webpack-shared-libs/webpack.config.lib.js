var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "../src/es5"),
  entry: {
    lib: ["./lib"]
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
    library: "[name]_[hash]",
    pathinfo: true
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dist/js/[name]-manifest.json"),
      name: "[name]_[hash]"
    })
  ]
};
