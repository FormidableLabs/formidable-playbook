#### Shared libraries

Webpack shared libraries are slightly different in that common dependencies form
a JS bundle with a manifest of names in a first build step. Then later entry
points ingest the manifest and don't need to include the libraries. Shared
libraries can be used _across_ web page loads and builds.

<!-- MarkdownTOC autolink=true depth=5 bracket=round -->

<!-- /MarkdownTOC -->



* https://webpack.github.io/docs/list-of-plugins.html#dllplugin
  ([example](https://github.com/webpack/webpack/tree/master/examples/dll))
* https://webpack.github.io/docs/list-of-plugins.html#dllreferenceplugin
  ([example](https://github.com/webpack/webpack/tree/master/examples/dll-user))
