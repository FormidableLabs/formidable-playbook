#### Shared libraries

Webpack shared libraries are slightly different from code splitting scenarios in
that the common dependencies are shareable across builds and require a two-part
build. In a first step, a common shared bundle and manifest is created. Then, in
a second step, entry points ingest the manifest and omit any libraries included
in the shared bundle. Shared libraries are appropriate for better long term
caching within a single app across deploys and across different projects / real
HTML pages.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Basic Example](#basic-example)
- [Shared Lib Example](#shared-lib-example)
- [Automatic Splitting](#automatic-splitting)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##### Basic Example

Let's start with some source code (the same as we will use for the
[code splitting example](./webpack-code-splitting.md)):

[`foo.js`](../../examples/frontend/src/foo.js)

```js
module.exports = function (id, msg) {
  return "<h1 id=\"" + id + "\">" + msg + "</h1>";
};
```

[`app1.js`](../../examples/frontend/src/app1.js)

```js
var foo = require("./foo");

document.querySelector("#content").innerHTML += foo("app1", "App 1");
```

[`app2.js`](../../examples/frontend/src/app2.js)

```js
var foo = require("./foo");

document.querySelector("#content").innerHTML += foo("app2", "App 2");
```

... so basically two separate "apps" that will add the headings `App 1` and
`App 2` to a page using the same `foo()` method...

##### Shared Lib Example

Shared libraries allows us to manually specify code in shared bundle, that can
then be excluded in any other entry points (across projects). To accomplish
this we need **two** separate webpack configurations.

First, we specify how to build the shared library. We use the Webpack
[`DllPlugin`](https://webpack.github.io/docs/list-of-plugins.html#dllplugin)
([example](https://github.com/webpack/webpack/tree/master/examples/dll)) to
create a manifest for the shared library.

[`webpack.config.lib.js`](../../examples/frontend/webpack-shared-libs/webpack.config.lib.js)

```js
var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "../src"),
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
```

This produces two files:

* [`dist/js/lib.js`](../../examples/frontend/webpack-shared-libs/dist/js/lib.js):
  The actual shared code bundle.
* [`dist/js/lib-manifest.json`](../../examples/frontend/webpack-shared-libs/dist/js/lib-manifest.json):
  A mapping of code part file paths to index in the shared code bundle.

We then have a webpack configuration for our entry points which consumes the
`lib-manifest.json` file to exclude the things that are in the shared library
from the resulting entry points using the
[`DllReferencePlugin`](https://webpack.github.io/docs/list-of-plugins.html#dllreferenceplugin)
([example](https://github.com/webpack/webpack/tree/master/examples/dll-user)).

[`webpack.config.js`](../../examples/frontend/webpack-shared-libs/webpack.config.js)

```js
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
    filename: "[name].js",
    pathinfo: true
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "client"),
      manifest: require("./dist/js/lib-manifest.json")
    })
  ]
};
```

All together, this leaves us with four files:

* [`dist/js/lib.js`](../../examples/frontend/webpack-shared-libs/dist/js/lib.js)
* [`dist/js/lib-manifest.json`](../../examples/frontend/webpack-shared-libs/dist/js/lib-manifest.json)
* [`dist/js/app1.js`](../../examples/frontend/webpack-shared-libs/dist/js/app1.js):
  The `app1` entry point.
* [`dist/js/app2.js`](../../examples/frontend/webpack-shared-libs/dist/js/app1.js):
  The `app2` entry point.















Let's look at these files in detail:

[`dist/js/commons.js`](../../examples/frontend/webpack-shared-libs/dist/js/commons.js)

```js
/******/ (function(modules) { // webpackBootstrap
/******/  // SNIPPED
/******/  window["webpackJsonp"] = // DEFINITION
/******/  // SNIPPED
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/*!****************!*\
  !*** ./foo.js ***!
  \****************/
/***/ function(module, exports) {

  module.exports = function (id, msg) {
    return "<h1 id=\"" + id + "\">" + msg + "</h1>";
  };


/***/ }
/******/ ]);
```

[`dist/js/app1.js`](../../examples/frontend/webpack-shared-libs/dist/js/app1.js)

```js
webpackJsonp([0],[
/* 0 */
/*!*****************!*\
  !*** ./app1.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

  var foo = __webpack_require__(/*! ./foo */ 1);

  document.querySelector("#content").innerHTML += foo("app1", "App 1");


/***/ }
]);
```

[`dist/js/app2.js`](../../examples/frontend/webpack-shared-libs/dist/js/app2.js)

```js
webpackJsonp([1],[
/* 0 */
/*!*****************!*\
  !*** ./app2.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

  var foo = __webpack_require__(/*! ./foo */ 1);

  document.querySelector("#content").innerHTML += foo("app2", "App 2");


/***/ }
]);
```

The `commons.js` file does indeed contain our common code and bootstrap loader,
leaving us with very small `app1|2` files.

Once we build these files, we can load the common chunks and both apps with the
following webpage:

[`index.html`](../../examples/frontend/webpack-shared-libs/index.html)

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="content" />
    <script src="./dist/js/commons.js"></script>
    <script src="./dist/js/app1.js"></script>
    <script src="./dist/js/app2.js"></script>
  </body>
</html>
```

##### Automatic Splitting

In our example above, we specified two separate entry points and added `script`
tags for both. Webpack is actually intelligent enough to create entry points
_automatically_ from a single root entry point if desired.

So, we could tweak our example configuration of:

```js
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  },
```

to point to a new file that async loads both apps like:

```js
require.ensure([], function () {
  require("./app1");
});
require.ensure([], function () {
  require("./app2");
});
```

and then reconfigure Webpack to just find the hypothetical entry point:

```js
  entry: {
    entry: "./entry.js"
  },
```

and Webpack will mostly split things up the same way. This approach is
particularly useful for the very common case of React application-based routes
(via any router) so that you have (1) a common chunk of code load first, then
(2) only the specific code needed for a route to load application-wise.

##### Advantages

* **Terse Common Bundle**: Webpack takes care of only adding the libraries to
  the common bundle that are actually common to multiple chunks / entry points.
* **Single build step**: Webpack generates the common and entry point chunks
  as part of a single build.

##### Disadvantages

* **Cannot be shared across projects**: The common bundle created with code
  splitting deals with indexes based on the entry points in a single builde.
  The resulting bundle cannot be shared across projects / builds.
* **Cache hits**: Because the common bundle uses only what is defined in the
  constituent apps and is reliant on index ordering, it is unlikely to have
  repeated cache hits across code changes without significant external Webpack
  hacking.
