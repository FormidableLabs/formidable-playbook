"use strict";

var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = {
  context: path.join(__dirname, "../src/es6"),
  entry: {
    app3: "./app3.js"
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
        loader: "babel-loader",
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
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false,    // DEMO ONLY: Don't change variable names.
      beautify: true,   // DEMO ONLY: Preserve whitespace
      output: {
        comments: true  // DEMO ONLY: Helpful comments
      },
      sourceMap: false
    }),

    new StatsWriterPlugin({
      filename: "../stats.json",
      fields: null
    })
  ]
};
