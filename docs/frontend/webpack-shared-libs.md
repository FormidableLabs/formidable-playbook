#### Shared libraries

Webpack shared libraries are slightly different from code splitting scenarios in
that the common dependencies are shareable across builds and require a two-part
build. In a first step, a common shared bundle and manifest is created. Then, in
a second step, entry points ingest the manifest and omit any libraries included
in the shared bundle. Shared libraries are appropriate for better long term
caching within a single app across deploys and across different projects / real
HTML pages.

<!-- MarkdownTOC autolink=true depth=5 bracket=round -->

<!-- /MarkdownTOC -->






**TODO: INCLUDE**

* https://webpack.github.io/docs/list-of-plugins.html#dllplugin
  ([example](https://github.com/webpack/webpack/tree/master/examples/dll))
* https://webpack.github.io/docs/list-of-plugins.html#dllreferenceplugin
  ([example](https://github.com/webpack/webpack/tree/master/examples/dll-user))
