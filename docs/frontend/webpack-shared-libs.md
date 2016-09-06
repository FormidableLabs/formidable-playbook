### Shared libraries

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
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##### Basic Example

Let's start with some source code (the same as we will use for the
[code splitting example](./webpack-code-splitting.md)):

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

We then add one more file:

[`lib.js`](../../examples/frontend/src/es5/lib.js)

```js
require("./foo");
```

Which doesn't _do_ anything with the `./foo` import. It instead just declares
"add this dependency" for our later use in creating a manual bundle of shared
dependencies. This explicit definition is essentially the big difference with
code splitting which automatically infers shared dependencies. For the shared
library approach in this section, we will need to manually curate and update the
libraries to include in the shared bundle.

##### Shared Lib Example

Shared libraries allow us to manually specify code in shared bundle, that can
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
```

This produces two files:

* [`dist/js/lib.js`](../../examples/frontend/webpack-shared-libs/dist/js/lib.js):
  The actual shared code bundle.
* [`dist/js/lib-manifest.json`](../../examples/frontend/webpack-shared-libs/dist/js/lib-manifest.json):
  A mapping of code part file paths to index in the shared code bundle.

**NOTE - Cross project sharing**: The biggest thing to understand for shared
libraries is that this first step can be completely independent of the second
entry point build step -- across:

* Multiple entry points in the same project / application
* Multiple entry points in _different_ projects / applications

This means that we have a truly portable, cacheable library for an entire
website or collection of sites, unlike the project-specific code splitting
solution.

Turning back to our build, we then use a webpack configuration for our entry
points which consumes the `lib-manifest.json` file to exclude the things that
are in the shared library from the resulting entry points using the
[`DllReferencePlugin`](https://webpack.github.io/docs/list-of-plugins.html#dllreferenceplugin)
([example](https://github.com/webpack/webpack/tree/master/examples/dll-user)).

[`webpack.config.js`](../../examples/frontend/webpack-shared-libs/webpack.config.js)

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
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "../src/es5"),
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

[`dist/js/lib.js`](../../examples/frontend/webpack-shared-libs/dist/js/lib.js)

```js
var lib_1c456e9656dd9be74724 =
/******/ (function(modules) { // webpackBootstrap
/******/  // SNIPPED
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************!*\
  !*** dll lib ***!
  \***************/
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__;

/***/ },
/* 1 */
/*!****************!*\
  !*** ./lib.js ***!
  \****************/
/***/ function(module, exports, __webpack_require__) {

  /**
   * Shared Library (DLL)
   *
   * Don't need to assign to variable, just the side-effect of "including"
   * desired libraries in this file.
   */
  __webpack_require__(/*! ./foo */ 2);


/***/ },
/* 2 */
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

[`dist/js/lib-manifest.json`](../../examples/frontend/webpack-shared-libs/dist/js/lib-manifest.json)

```js
{
  "name": "lib_1c456e9656dd9be74724",
  "content": {
    "./lib.js": 1,
    "./foo.js": 2
  }
}
```

[`dist/js/app1.js`](../../examples/frontend/webpack-shared-libs/dist/js/app1.js)

```js
/******/ (function(modules) { // webpackBootstrap
/******/  // SNIPPED
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./app1.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

  var foo = __webpack_require__(/*! ./foo */ 1);

  document.querySelector("#content").innerHTML += foo("app1", "App 1");


/***/ },
/* 1 */
/*!**********************************************************************!*\
  !*** delegated ./foo.js from dll-reference lib_1c456e9656dd9be74724 ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

  module.exports = (__webpack_require__(2))(2);

/***/ },
/* 2 */
/*!*******************************************!*\
  !*** external "lib_1c456e9656dd9be74724" ***!
  \*******************************************/
/***/ function(module, exports) {

  module.exports = lib_1c456e9656dd9be74724;

/***/ }
/******/ ]);
```

[`dist/js/app2.js`](../../examples/frontend/webpack-shared-libs/dist/js/app2.js)

```js
/******/ (function(modules) { // webpackBootstrap
/******/  // SNIPPED
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./app2.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

  var foo = __webpack_require__(/*! ./foo */ 1);

  document.querySelector("#content").innerHTML += foo("app2", "App 2");


/***/ },
/* 1 */
/*!**********************************************************************!*\
  !*** delegated ./foo.js from dll-reference lib_1c456e9656dd9be74724 ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

  module.exports = (__webpack_require__(2))(2);

/***/ },
/* 2 */
/*!*******************************************!*\
  !*** external "lib_1c456e9656dd9be74724" ***!
  \*******************************************/
/***/ function(module, exports) {

  module.exports = lib_1c456e9656dd9be74724;

/***/ }
/******/ ]);
```

The `lib.js` file does indeed contain our common code. In contrast to the
code splitting examples, the files created with the shared library plugins all
contain a Webpack bootstrap loader. The main trick is seeing that there is a
mapping of indirection for shared code like `./foo` in our entry point code:

Let's start at `app1`, index `0` (or `app1:0`):

```js
var foo = __webpack_require__(/*! ./foo */ 1);
```

This means that we get `foo` from `app1:1`. Looking there we see:

```js
module.exports = (__webpack_require__(2))(2);
```

this means we need to look at `app1:2` to get a function, which we then call
with the index `2`. So we get a function from `app1:2` for
`__webpack_require__(2)`:

```js
module.exports = lib_1c456e9656dd9be74724;
```

which is the exported function of shared library. Then we call into `lib:2` to
find the actual code we want for `foo.js`:

```js
  module.exports = function (id, msg) {
    return "<h1 id=\"" + id + "\">" + msg + "</h1>";
  };
```

So this is a bit of a tortured adventure of indirection, but hopefully it gets
us closer to the big picture of how the code sharing works.

Once we build these files, we can load the common chunks and both apps with the
following webpage:

[`index.html`](../../examples/frontend/webpack-shared-libs/index.html)

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="content" />
    <script src="./dist/js/lib.js"></script>
    <script src="./dist/js/app1.js"></script>
    <script src="./dist/js/app2.js"></script>
  </body>
</html>
```

##### Advantages

* **Sharing across projects**: The shared library (`lib.js`) can be reused
  across multiple projects / application servers to create 1+ uniform shared
  libraries. This should produce cache hits for the shared library even across
  totally separate applications.

* **Cache hits across deploys**: Because the shared library is manually
  specified, it does not change without actually editing the source file. This
  means that you should get cache hits even across deploys of updates to the
  overall applications until the shared library source itself changes.

* **Faster entry point builds**: You only need to build the shared library once.
  After you have the library and manifest, entry point builds should be faster
  in individual projects because shared parts are simply excluded from the
  build process.

##### Disadvantages

* **Inefficient Common Library**: Because the shared code is manually specified
  there may be parts of the common library that are only used in one entry
  point or not at all over time. This means that you should regularly inspect
  and audit the shared library to make sure it includes the right "common"
  dependencies. It is a best practice to automate such introspection and
  review.

* **Mutiple build steps**: You need at least _two_ Webpack build steps instead
  of one for code splitting / normal builds.

* **Must manually lazy load**: Unlike code splitting with `require.ensure()`,
  there is no automatic, Webpack-provided way to lazy load the shared code.
  However, this is easily done manually with a loader like:
  [`little-loader`](https://github.com/walmartlabs/little-loader). For example,
  we could lazy load our entry points in the above example with something
  like [`lazy-load.html`](../../examples/frontend/webpack-shared-libs/lazy-load.html)


  ```js
  // Use little-loader to load `lib.js` first.
  window._lload("./dist/js/lib.js", function () {
    // Then load entry points in parallel
    // (assuming we don't care about order).
    window._lload("./dist/js/app1.js");
    window._lload("./dist/js/app2.js");
  });
  ```

* **Need caution with `require.ensure()` in shared bundle**: Using
  `require.ensure()` / code splitting in the shared bundle may produce entry
  point references that assume a dependency is loaded when it is not. The
  easiest rule of thumb is to avoid `require.ensure()` in the dependencies
  in the shared bundle. (By contrast, code splitting / `require.ensure()` is
  totally fine in the application entry points.)
