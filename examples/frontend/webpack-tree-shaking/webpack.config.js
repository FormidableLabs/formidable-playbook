"use strict";

var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

// Need **independent** webpack configs for tree-shaking to correctly determine
// unused libraries.
var ENTRY_POINTS = ["app1", "app2"];

module.exports = ENTRY_POINTS.map(function (entryName) {
  var entry = {};
  entry[entryName] = "./" + entryName + ".js";

  return {
    context: path.join(__dirname, "../src/es6"),
    entry: entry,
    output: {
      path: path.join(__dirname, "dist/js"),
      filename: "[name].js",
      pathinfo: true
    },
    module: {
      rules: [
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

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
        filename: "../stats-" + entryName + ".json",
        fields: null
      })
    ]
  };
});
