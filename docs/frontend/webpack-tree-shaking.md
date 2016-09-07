### Tree shaking

[Tree shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html) is a
transformation process for [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html)
whereby ESnext `export`s that are not used in a Webpack bundle can be isolated
during code bundling and removed entirely by Uglify dead code elimination.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Basic Example](#basic-example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##### Basic Example

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

Our goal with tree shaking is to have `app1` include the code for `red()`, but
not `blue()` and have the opposite situation for `app2`. To accomplish this,
we need some specific tweaks to our Webpack configuration found at:
[`webpack.config.js`](../../examples/frontend/webpack-tree-shaking/webpack.config.js)

First, our ESnext code needs the `babel-loader` to build and we need to pass
the specific option of `modules: false` to correctly enable tree shaking:

```js
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [path.join(__dirname, "../src/es6")],
      loader: "babel",
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










* **TODO: NOTE**: List of open issues (like `lodash-es`).
* **TODO: NOTE**: Multiple entry points will detect code as "used" if used by
  _any_ entry point, even if completely unrelated.
