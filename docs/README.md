<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


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

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The Architecture Playbook

### [Have a single infrastructure](infrastructure/single.md)

A unified development effort should use a single infrastructure to control all
similar projects.

## The Frontend Playbook

Our frontend infrastructure is based around
[webpack](https://webpack.github.io/) builds, but most of the guidelines / goals
apply to any build tool.

### Webpack plugins

#### [Start with good base plugins](frontend/webpack-plugins.md)

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

#### [Code splitting](frontend/webpack-code-splitting.md)

[Code splitting](http://webpack.github.io/docs/code-splitting.html) is a Webpack
feature that enables a JS bundle within a single build to be split up and loaded
on-demand in smaller parts. Code splitting is appropriate within a single page
and build.

#### [Shared libraries](frontend/webpack-shared-libs.md)

Webpack shared libraries are slightly different from code splitting scenarios in
that the common dependencies are shareable across builds and require a two-part
build. In a first step, a common shared bundle and manifest is created. Then, in
a second step, entry points ingest the manifest and omit any libraries included
in the shared bundle. Shared libraries are appropriate for better long term
caching within a single app across deploys and across different projects / real
HTML pages.

#### [Source maps](frontend/webpack-source-maps.md)

The Webpack [SourceMapDevToolPlugin](http://webpack.github.io/docs/list-of-plugins.html#sourcemapdevtoolplugin)
creates [source maps](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info)
which allows a developer to view / debug developer-friendly source code instead
of the optimized, mangled, and minified JS bundle of a frontend web app. Source
maps should be enabled for both development and production.

### Babel plugins

**TODO: Write up intro section / doc - https://github.com/FormidableLabs/formidable-playbook/issues/9**

### Other tools

**TODO: tools - https://github.com/FormidableLabs/formidable-playbook/issues/8**

* TODO: little-loader for script loading

### Performance auditing

**TODO: inspectpack reports, audits - https://github.com/FormidableLabs/formidable-playbook/issues/2**

## The Backend Playbook

**TODO: Plan, write section - https://github.com/FormidableLabs/formidable-playbook/issues/4**
