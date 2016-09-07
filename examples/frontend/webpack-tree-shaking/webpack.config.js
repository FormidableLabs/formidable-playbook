var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "../src/es6"),
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, "../src/es6")],
        loader: "babel",
        query: {
          presets: [
            [
              "es2015",
              {
                "modules": false
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false, // _Don't_ change variable names.
      output: {
        comments: true,
        beautify: true // Preserve whitespace
      },
      sourceMap: false
    })
  ]
};
