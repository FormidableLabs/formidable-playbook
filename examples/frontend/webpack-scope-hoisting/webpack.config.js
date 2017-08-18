"use strict";

var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

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
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),

    new StatsWriterPlugin({
      filename: "../stats.json",
      fields: null
    })
  ]
};
