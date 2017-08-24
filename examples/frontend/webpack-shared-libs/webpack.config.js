"use strict";

var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

var manifest = require("./dist/js/lib-manifest.json");

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
      manifest: manifest
    }),

    new StatsWriterPlugin({
      filename: "../stats.json",
      fields: null
    })
  ]
};
