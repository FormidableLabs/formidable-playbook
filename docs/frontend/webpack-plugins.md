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

**TODO: OccurrenceOrderPlugin - determinism, watch min+gz**


##### [`DefinePlugin`](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)

* Recommended?: **Maybe**

**TODO: DefinePlugin - `process.env.NODE_ENV = production`**




##### [`lodash-webpack-plugin`](https://github.com/lodash/lodash-webpack-plugin))

* Recommended?: **Maybe**

**TODO: Write up warning from https://github.com/exogen/test-lodash-webpack-plugin**
