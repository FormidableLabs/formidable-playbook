### Source maps

The Webpack [SourceMapDevToolPlugin](http://webpack.github.io/docs/list-of-plugins.html#sourcemapdevtoolplugin)
creates [source maps](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info)
which allows a developer to view / debug developer-friendly source code instead
of the optimized, mangled, and minified JS bundle of a frontend web app. Source
maps should be enabled for both development and production.

<!-- START doctoc -->
<!-- END doctoc -->

##### Basic Example

(Example source available at: [github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/src/es5](https://github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/src/es5))

Let's start with the familiar source code used in our
[shared library](./webpack-shared-libs.md)) and
[code splitting example](./webpack-source-maps.md)) examples.


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

##### Source Maps Primer

Modern JavaScript on the frontend practically _guarantees_ that the original
source code developers write is different from the code distributed and
executed on web browsers. These days, code is likely to be transformed by things
like:

* Babel transforms of ESnext/JSX code to ES5 code.
* Developer-friendly full code to minified gibberish for smaller download size
  and some protection of application IP.

The skew between what developers write and what a browser executes makes
debugging JavaScript applications quite tedious and complicated. Fortunately,
modern browsers implement **source maps** whereby minified code can be
mapped to real developer sources before execution to give developers a much
better debugging experience.

If you are not familiar with how source maps work, please take a moment to
review a couple introductory articles:

* http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
* https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info
* https://blog.sentry.io/2015/10/29/debuggable-javascript-with-source-maps.html

The brief summary of how source maps work is as follows:

* During bundling, an application is configured to output a source mapping file
  corresponding to the application bundle.
* The real application bundle is downloaded and parsed by a browser.
* If the browser encounters a special control comment like:
  `//# sourceMappingURL=PATH/TO/bundle.js.map` **and** the developer console
  is open, then the source map file is downloaded from the URL in the control
  comment.
* Once downloaded, the mapped file is swapped in and debuggable in place of the
  real (probably unreadable) application bundle.

This functionality is useful in both development and production. In
**development** an application may not be minified, but it is bundled into a
single / couple of application chunks. Source maps can give developers a
debugging experience corresponding to the _actual raw source files_ at issue.
[SurviveJS](http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/)
provides a very good tutorial in utilizing source maps for easier development
and we won't touch on the topic further, as we're focused on the production
story for this current document.

In **production** source maps are the lifeline that allows application
developers to not have to make sense of gobs of minified variables and code.
The source maps are not just a convenience, they're practically essential for
being able to debug a production app for any sizeable bundle in the modern
web. The rest of this page will examine enabling your critical "out" for bugs
you find in production.

##### Source Map Example

(Example build / dist code available at: [github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/webpack-source-maps](https://github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/webpack-source-maps))

Our webpack configuration uses the
[`SourceMapDevToolPlugin`](https://webpack.github.io/docs/list-of-plugins.html#sourcemapdevtoolplugin)
directly for maximum flexibility. Note however that there are many catch-all
[`devtool` options](https://webpack.github.io/docs/configuration.html#devtool)
for simpler / development configuration. In our case here, we:

- Enable minification with the `UglifyJsPlugin` so that we have a good example
  to see the impact of source maps with.
- Override the `append` option to `SourceMapDevToolPlugin` so that we can insert
  a full URL in the outputted `//# sourceMappingURL` comment.

[`webpack.config.js`](../../examples/frontend/webpack-source-maps/webpack.config.js)

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
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // Preserve the source map comment in minified code.
      sourceMap: true
    }),
    new webpack.SourceMapDevToolPlugin({
      // https://webpack.github.io/docs/configuration.html#output-sourcemapfilename
      filename: "[name].js.map",

      // Output sourceMappingUrl comment.
      // Defaults to: `"\n//# sourceMappingURL=[url]"` for relative hosting
      append: "\n//# sourceMappingURL=http://localhost:3000/" +
        "examples/frontend/webpack-source-maps/dist/js/[url]"
    })
  ]
};
```

This produces four files:

* [`dist/js/app1.js`](../../examples/frontend/webpack-source-maps/dist/js/app1.js):
  The `app1` entry point.
* [`dist/js/app1.js.map`](../../examples/frontend/webpack-source-maps/dist/js/app1.js.map):
  The `app1` source map file.
* [`dist/js/app2.js`](../../examples/frontend/webpack-source-maps/dist/js/app1.js):
  The `app2` entry point.
* [`dist/js/app2.js.map`](../../examples/frontend/webpack-source-maps/dist/js/app2.js.map):
  The `app2` source map file.

Let's look at these files in detail:

[`dist/js/app1.js`](../../examples/frontend/webpack-source-maps/dist/js/app1.js)

```js
TODO HERE
```











[`dist/js/app2.js`](../../examples/frontend/webpack-source-maps/dist/js/app2.js)

```js
webpackJsonp([0],{

/***/ 2:
/* unknown exports provided */
/* all exports used */
/*!*****************!*\
  !*** ./app2.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

var foo = __webpack_require__(/*! ./foo */ 0);

document.querySelector("#content").innerHTML += foo("app2", "App 2");


/***/ }

},[2]);
```

The `commons.js` file does indeed contain our common code and bootstrap loader,
leaving us with very small `app1|2` files.

Once we build these files, we can load the common chunks and both apps with the
following webpage:

[`index.html`](../../examples/frontend/webpack-source-maps/index.html)

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="content" />
    <script src="./dist/js/app1.js"></script>
    <script src="./dist/js/app2.js"></script>
  </body>
</html>
```

<!-- * TODO: https://github.com/FormidableLabs/formidable-playbook/issues/10  -->
<!-- * TODO: GOAL - Get dev / prod friendly sourcemaps -->

**TODO: NOTES**

- Maps contain full source. Need to be protected in prod.
- Make available in prod via VPN.
- Make available in prod via git checkout.
