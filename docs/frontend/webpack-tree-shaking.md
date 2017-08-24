### Tree shaking

[Tree shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html) is a
transformation process for [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html)
whereby ESnext `export`s that are not used in a Webpack bundle can be isolated
during code bundling and removed entirely by Uglify dead code elimination.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Basic Example](#basic-example)
- [Tree Shaking Example](#tree-shaking-example)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##### Basic Example

(Example source available at: [github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/src/es6](https://github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/src/es6))

Let's start with a very basic ESnext file that exports two functions -
`red()` and `blue()`:

[`util.js`](../../examples/frontend/src/es6/util.js)

```js
export const red = (id, msg) => `<h1 id="${id}" style="color: red">${msg}</h1>`;
export const blue = (id, msg) => `<h1 id="${id}" style="color: blue">${msg}</h1>`;
```

Our applications then use either `blue()` or `red()` but not both:

[`app1.js`](../../examples/frontend/src/es6/app1.js)

```js
import { red } from "./util";

document.querySelector("#content").innerHTML += red("app1", "App 1");
```

[`app2.js`](../../examples/frontend/src/es6/app2.js)

```js
import { blue } from "./util";

document.querySelector("#content").innerHTML += blue("app2", "App 2");
```

##### Tree Shaking Example

(Example build / dist code available at: [github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/webpack-tree-shaking](https://github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/webpack-tree-shaking))

Our goal with tree shaking is to have `app1` include the code for `red()`, but
not `blue()` and have the opposite situation for `app2`. To accomplish this,
we need some specific tweaks to our Webpack configuration found at:
[`webpack.config.js`](../../examples/frontend/webpack-tree-shaking/webpack.config.js)

First, our ESnext code needs the `babel-loader` to build and we need to pass
the specific option of `modules: false` to correctly enable tree shaking:

```js
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
}
```

Next, for our compression options, we have some "real" production optimizations
as well as a few "demo only" options for purposes of this tutorial (with a
`DEMO ONLY` comment):

```js
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
  })
]
```

The extra demo options allow us to have a much more readable bundle file with
full variable names, comments, etc.

Finally, we need to specify our entry points. Typically, you can use the same
configuration to do two entry points like:

```js
// BAD: Dependencies are not isolated.
entry: {
  app1: "./app1.js",
  app2: "./app2.js"
},
```

Unfortunately, this isn't optimal when tree-shaking is involved because the
separate entry point bundles will contain any exported code used in **either**
of the entry points. To address this deficiency, we utilize a Webpack feature
of providing an **array** of configuration objects tailored to each entry point:

```js
// GOOD: Dependencies are correctly isolated.
var ENTRY_POINTS = ["app1", "app2"];

module.exports = ENTRY_POINTS.map(function (entryName) {
  var entry = {};
  entry[entryName] = "./" + entryName + ".js";

  return {
    entry: entry,
    // OTHER WEBPACK CONFIGURATION
  };
});
```

With all of this configuration finished, our output is two files:

* [`dist/js/app1.js`](../../examples/frontend/webpack-tree-shaking/dist/js/app1.js):
  The `app1` entry point, with `red()` but not `blue()` code.
* [`dist/js/app2.js`](../../examples/frontend/webpack-tree-shaking/dist/js/app1.js):
  The `app2` entry point, with `blue()` but not `red()` code.

Let's inspect the `util.js` parts of these different bundles in detail:

[`dist/js/app1.js`](../../examples/frontend/webpack-tree-shaking/dist/js/app1.js):

```js
/* 0 */
/* exports provided: red, blue */
/* exports used: red */
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(exports, "a", function() {
        return red;
    });
    /* unused harmony export blue */
    var red = function(id, msg) {
        return '<h1 id="' + id + '" style="color: red">' + msg + "</h1>";
    };
}
```

Here we see the indicators that only `red()` is exported with the comment
`/* exports used: red */` and `/* unused harmony export blue */`.

[`dist/js/app2.js`](../../examples/frontend/webpack-tree-shaking/dist/js/app2.js):

```js
/* 0 */
/* exports provided: red, blue */
/* exports used: blue */
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    /* unused harmony export red */
    /* harmony export (binding) */
    __webpack_require__.d(exports, "a", function() {
        return blue;
    });
    var blue = function(id, msg) {
        return '<h1 id="' + id + '" style="color: blue">' + msg + "</h1>";
    };
}
```

Here we see the indicators that only `blue()` is exported with the comment
`/* exports used: blue */` and `/* unused harmony export red */`.

And with that, we have the most efficient bundles that use _only_ the ES6
module exports that are actually used by the code. The functions actually used
are present in the bundles, and the other ones are removed.


##### Advantages

* **Use Multiple Export Files**: The way to "normally" only include the code
  you need is do deeply-nested `require` or `import` of the full file path to
  a single exported module. This is brittle and tedious. With tree shaking we
  can just import a root file with multiple exports and let Webpack slim down
  the code to that which is actually used.

* **Small Bundle**: Unused exported code in otherwise included files is removed.
  Yay!

##### Disadvantages

* **Webpack 2 Only**: Tree shaking is only available in Webpack 2.

* **Single Entry Points**: A minor detail, but to properly remove code, each
  Webpack configuration object should have a _single_ entry point. But, you can
  provide a mapped array of objects like in our example.

* **ES6 Modules Only**: Tree shaking does not work with normal ES5 / Node-style
  CommonJS `require`'s. Only `import`.

* **Shaky, Occasionally Buggy**: Tree shaking is still in the early stages and
  applying it to complex real world code has proved to be pretty bumpy. See
  the following issues with tree shaking correctness out in the wild:
  * https://github.com/webpack/webpack/issues/1750
  * https://github.com/lodash/babel-plugin-lodash/issues/75
  * https://github.com/rollup/rollup/issues/45
