The Formidable Playbook
=======================

A practical guide for modern applications. Learn how to survive the frontend,
backend, and beyond.

<!-- MarkdownTOC autolink=true depth=4 bracket=round -->

- [The Architecture Playbook](#the-architecture-playbook)
  - [Have a single infrastructure](#have-a-single-infrastructure)
- [The Frontend Playbook](#the-frontend-playbook)
  - [Webpack plugins](#webpack-plugins)
    - [Start with good base plugins](#start-with-good-base-plugins)
    - [Code splitting](#code-splitting)
    - [Shared libraries](#shared-libraries)
    - [Source maps](#source-maps)
  - [Babel plugins](#babel-plugins)
  - [Other tools](#other-tools)
  - [Performance auditing](#performance-auditing)
- [The Backend Playbook](#the-backend-playbook)

<!-- /MarkdownTOC -->

## The Architecture Playbook

### [Have a single infrastructure](docs/infrastructure/single.md)

A unified development effort should use a single infrastructure to control all
similar projects.

## The Frontend Playbook

Our frontend infrastructure is based around [webpack][] builds, but most of the
guidelines / goals apply to any build tool.

### Webpack plugins

#### [Start with good base plugins](docs/frontend/webpack-plugins.md)

Webpack has a rich plugin ecosystem, including both
[core](https://webpack.github.io/docs/list-of-plugins.html) and
[open source](http://nipstr.com/#webpack plugin)
[modules](https://www.npmjs.com/browse/keyword/webpack-plugin) modules.
Webpack also has a straight forward interface to
[write your own plugins](https://webpack.github.io/docs/plugins.html).

A short list of plugin recommendations for best frontend performance include:

| Plugin | Recommend? | Notes |
| ------ | ---------- | ----- |
| [`UglifyJsPlugin`](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin)| Yes | Minimize code |
| [`DedupePlugin`](https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin) | Yes | Collapse identical code chunks to a single reference |
| [`OccurrenceOrderPlugin`](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin) | Maybe | Reorder module and chunk ids by occurrence count |
| [`DefinePlugin`](https://webpack.github.io/docs/list-of-plugins.html#defineplugin) | Maybe | Define constants for better optimization |
| [`lodash-webpack-plugin`](https://github.com/lodash/lodash-webpack-plugin) | Maybe | Optimize `lodash` |

#### [Code splitting](docs/frontend/webpack-code-splitting.md)

**TODO: Write up intro section / doc - https://github.com/FormidableLabs/formidable-playbook/issues/7**

#### [Shared libraries](docs/frontend/webpack-shared-libs.md)

**TODO: Write up intro section / doc - https://github.com/FormidableLabs/formidable-playbook/issues/6**

* https://webpack.github.io/docs/list-of-plugins.html#dllplugin
  ([example](https://github.com/webpack/webpack/tree/master/examples/dll))
* https://webpack.github.io/docs/list-of-plugins.html#dllreferenceplugin
  ([example](https://github.com/webpack/webpack/tree/master/examples/dll-user))

#### [Source maps](docs/frontend/webpack-source-maps.md)

**TODO: Write up intro section / doc - https://github.com/FormidableLabs/formidable-playbook/issues/10**

* TODO: GOAL - Get dev / prod friendly sourcemaps

### Babel plugins

**TODO: Write up intro section / doc - https://github.com/FormidableLabs/formidable-playbook/issues/9**

### Other tools

**TODO: tools - https://github.com/FormidableLabs/formidable-playbook/issues/8**

* TODO: little-loader for script loading

### Performance auditing

**TODO: inspectpack reports, audits - https://github.com/FormidableLabs/formidable-playbook/issues/2**

[webpack]: https://webpack.github.io/

## The Backend Playbook

**TODO: Plan, write section - https://github.com/FormidableLabs/formidable-playbook/issues/4**
