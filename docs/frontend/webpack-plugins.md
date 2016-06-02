#### Start with good base plugins

Webpack has a rich plugin ecosystem, including both
[core](https://webpack.github.io/docs/list-of-plugins.html) and
[open source](http://nipstr.com/#webpack plugin)
[modules](https://www.npmjs.com/browse/keyword/webpack-plugin) modules.
Webpack also has a straight forward interface to
[write your own plugins](https://webpack.github.io/docs/plugins.html).

##### [`UglifyJsPlugin`](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin)

* Recommended?: **Yes**

The `UglifyJsPlugin` minimizes code using
[Uglifyjs](https://github.com/mishoo/UglifyJS2) and with most options proxied
through to the plugin.

Typical configuration:

```js
new webpack.optimize.UglifyJsPlugin()
```

##### [`DedupePlugin`](https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin)

* Recommended?: **Yes**

Collapse identical code chunks to a single reference. The plugin looks for
identical occurrences of the same code and replaces real code chunks in the
bundle with integer references (think pointers in C/C++) to find an earlier
instance of the same code.

Typical configuration:

```js
new webpack.optimize.DedupePlugin()
```

**Note**: This "deduplication" is separate from the deduplication that `npm`
performs while flattening the dependency tree in `node_modules`. It is just
a scan by webpack to coalesce identical code chunks to a single reference.

**TODO: inspectpack duplicates reference + note*

##### [`OccurrenceOrderPlugin`](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)

* Recommended?: **Maybe**

Reorder module / chunk ids by order of most-to-least occurring. This reduces
raw code size since smaller integer indexes are `require`-ed more. Also makes
the order of modules deterministic.

Typical configuration:

```js
new webpack.optimize.OccurrenceOrderPlugin()
```

**Assessment**: The size gains are often not significant, and can make the
ultimate minified + gzipped bundle size actually _larger_. And this calculus
can change over time, so generally speaking size should not be a motivating
factor for enabling this plugin. However, if you need a deterministic ordering
of chunks and modules, this plugin is appropriate.

##### [`DefinePlugin`](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)

* Recommended?: **Maybe**

Add raw replacement strings for free variables in code. This literally rewrites
your source code with replacements. With a bit of strategy and a project
convention you can opportunistically have code paths removed / variables
replaced for a bespoke optimized production build.

Additionally, many frameworks / tools such as React, expect a definition of
`"process.env.NODE_ENV": JSON.stringify("production")` for the most optimized
build of included code.

Example configuration:

```js
new webpack.optimize.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production"), // or "\"production\""
  "DEBUG": false // or "false"
})
```

**Note**: to expand a variable to a quoted string, you must use
`JSON.stringify`.

If we had this source:

```js
if (process.env.NODE_ENV === "production") {
  console.log("I'm in prod!");
}

if (DEBUG) {
  console.log("Explicit debug switch");
}
```

with the above configuration, the output would be:

```js
if ("production" === "production") {
  console.log("I'm in prod!");
}

if (false) {
  console.log("Explicit debug switch");
}
```

which with minification would become:

```js
console.log("I'm in prod!");
```

##### [`lodash-webpack-plugin`](https://github.com/lodash/lodash-webpack-plugin)

* Recommended?: **Maybe**

**TODO: Write up warning from https://github.com/exogen/test-lodash-webpack-plugin**
