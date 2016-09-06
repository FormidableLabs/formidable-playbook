### Code splitting

[Code splitting](http://webpack.github.io/docs/code-splitting.html) is a Webpack
feature that enables a JS bundle within a single build to be split up and loaded
on-demand in smaller parts. Code splitting is appropriate within a single page
and build.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Basic Example](#basic-example)
- [Code Splitting Example](#code-splitting-example)
- [Automatic Splitting](#automatic-splitting)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##### Basic Example

Let's start with some source code (the same as we will use for the
[shared library](./webpack-shared-libs.md)):

[`foo.js`](../../examples/frontend/src/es5/foo.js)

```js
module.exports = function (id, msg) {
  return "<h1 id=\"" + id + "\">" + msg + "</h1>";
};
```

[`app1.js`](../../examples/frontend/src/es5/app1.js)

```js
var foo = require("./foo");

document.querySelector("#content").innerHTML += foo("app1", "App 1");
```

[`app2.js`](../../examples/frontend/src/es5/app2.js)

```js
var foo = require("./foo");

document.querySelector("#content").innerHTML += foo("app2", "App 2");
```

... so basically two separate "apps" that will add the headings `App 1` and
`App 2` to a page using the same `foo()` method...

##### Code Splitting Example

Code splitting allows us to extract the common parts of both entry points, which
in our case is the `foo.js` file. We can accomplish this with a single webpack
configuration:

[`webpack.config.js`](../../examples/frontend/webpack-code-splitting/webpack.config.js)


```js
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
    // Abstract a common file between apps.
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js"
    })
  ]
};
```

This produces three files:

* [`dist/js/commons.js`](../../examples/frontend/webpack-code-splitting/dist/js/commons.js):
  The common code between `app1` and `app2` and the bootstrap loader
  `webpackJsonp` needed to load other entry points.
* [`dist/js/app1.js`](../../examples/frontend/webpack-code-splitting/dist/js/app1.js):
  The `app1` entry point.
* [`dist/js/app2.js`](../../examples/frontend/webpack-code-splitting/dist/js/app1.js):
  The `app2` entry point.

Let's look at these files in detail:

[`dist/js/commons.js`](../../examples/frontend/webpack-code-splitting/dist/js/commons.js)

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

[`dist/js/app1.js`](../../examples/frontend/webpack-code-splitting/dist/js/app1.js)

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

[`dist/js/app2.js`](../../examples/frontend/webpack-code-splitting/dist/js/app2.js)

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

[`index.html`](../../examples/frontend/webpack-code-splitting/index.html)

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
// Note 1: must specify dep in array, then can require in callback.
// Note 2: callback param **must** be named `require`.
require.ensure(["./app1"], function (require) {
  require("./app1");
});
require.ensure(["./app2"], function (require) {
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

We have a working example available in the
[`webpack-code-splitting-ensure`](../../examples/frontend/webpack-code-splitting-ensure)
directory.

##### Advantages

* **Terse Common Bundle**: Webpack takes care of only adding the libraries to
  the common bundle that are actually common to multiple chunks / entry points.

* **Single build step**: Webpack generates the common and entry point chunks
  as part of a single build.

##### Disadvantages

* **Cannot be shared across projects**: The common bundle created with code
  splitting deals with indexes based on the entry points in a single build.
  The resulting bundle cannot be shared across projects / builds.

* **Cache hits**: Because the common bundle uses only what is defined in the
  constituent apps and is reliant on index ordering, it is unlikely to have
  repeated cache hits across code changes without significant external Webpack
  hacking.
