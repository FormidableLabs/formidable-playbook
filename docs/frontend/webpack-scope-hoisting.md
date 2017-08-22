### Scope Hoisting

Scope hoisted bundles try to place bundle modules into a global bundle scope so
as to reduce the overhead of function calls for each bundled module. The problem
and scope hoisting solutions are discussed in detail in Nolan Lawson's 2016
article
["The cost of small modules"](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Basic Example](#basic-example)
- [Scope Hoisting Example](#scope-hoisting-example)
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

Our application then uses `red()`:

[`app1.js`](../../examples/frontend/src/es6/app1.js)

```js
import { red } from "./util";

document.querySelector("#content").innerHTML += red("app1", "App 1");
```

##### Scope Hoisting Example

(Example build / dist code available at: [github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/webpack-scope-hoisting](https://github.com/FormidableLabs/formidable-playbook/tree/master/examples/frontend/webpack-scope-hoisting))

Our goal with scope hoisting is to have `app1` include only **one** webpack
module function instead of two. Out of the box, here is roughly what our modules
look like in a sample bundle:

```js
[
/* 0 */
/*!*****************!*\
  !*** ./app1.js ***!
  \*****************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(/*! ./util */ 1);


document.querySelector("#content").innerHTML += Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* red */])("app1", "App 1");

/***/ }),
/* 1 */
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/*! exports provided: red, blue */
/*! exports used: red */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return red; });
/* unused harmony export blue */
var red = function red(id, msg) {
  return "<h1 id=\"" + id + "\" style=\"color: red\">" + msg + "</h1>";
};
var blue = function blue(id, msg) {
  return "<h1 id=\"" + id + "\" style=\"color: blue\">" + msg + "</h1>";
};

/***/ })
/******/ ]
```

By default the above shows **two** module definitions (the `(function(module, __webpack_exports__, __webpack_require__)` part) -- `0` for `./app1.js` and `1` for `./util.js`.

So how do we collapse this into fewer module definitions? By enabling the module
concatenation plugin in our webpack configuration:
[`webpack.config.js`](../../examples/frontend/webpack-scope-hoisting/webpack.config.js)

```js
plugins: [
  new webpack.optimize.ModuleConcatenationPlugin()
]
```

With all of this configuration finished, our output:

* [`dist/js/app1.js`](../../examples/frontend/webpack-scope-hoisting/dist/js/app1.js):
  The `app1` entry point.
* [`dist/js/app1.min.js`](../../examples/frontend/webpack-scope-hoisting/dist/js/app1.min.js):
  A minified + prettified version of `app1` entry point.

Looking at `app1.js`:

```js
[
/* 0 */
/*!*****************************!*\
  !*** ./app1.js + 1 modules ***!
  \*****************************/
/*! exports provided:  */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is an entry point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./util.js
var red = function red(id, msg) {
  return "<h1 id=\"" + id + "\" style=\"color: red\">" + msg + "</h1>";
};
var blue = function blue(id, msg) {
  return "<h1 id=\"" + id + "\" style=\"color: blue\">" + msg + "</h1>";
};
// CONCATENATED MODULE: ./app1.js


document.querySelector("#content").innerHTML += red("app1", "App 1");

/***/ })
/******/ ]
```

we now have only **one** module definition -- `0` for `./app1.js + 1 modules`.
The separate `./util.js` is collapsed _into_ the `app1` definition. (See the `//
CONCATENATED MODULE: ./util.js` comment). Yay!


Looking at `app1.min.js` we see an even _smaller_ bundle as `uglify` is able to
remove the unused `blue` function and further inline `red` into it's function
call. That's super tight!

```js
[ /* 0 */
/*!*****************************!*\
  !*** ./app1.js + 1 modules ***!
  \*****************************/
/*! exports provided:  */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is an entry point */
/***/
function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", {
        value: !0
    });
    // CONCATENATED MODULE: ./app1.js
    document.querySelector("#content").innerHTML += function(id, msg) {
        return '<h1 id="' + id + '" style="color: red">' + msg + "</h1>";
    }("app1", "App 1");
} ]
```

##### Advantages

* **Faster**: Fewer module definition function callbacks produce faster code.

* **Small Bundle**: Reduces bundle size by inlining code into less modules.

* **Better Minification**: Uglify seems better able to compress, inline, and
  minify concatenated code than old-style module definitions.

##### Disadvantages

... none, really -- give the plugin a try!
