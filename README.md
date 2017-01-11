This is our playbook. It is the foundation that allows us to architect & design systems that move our client projects forward.  In it, you will find practical approaches for building frontend & backend javascript applications. This is a living document, and we intend to share our knowledge as we continue to work towards making the web a better place.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [The Architecture Playbook](#the-architecture-playbook)
    - [Have a single infrastructure](#have-a-single-infrastructure)
- [The Frontend Playbook](#the-frontend-playbook)
  - [Webpack plugins](#webpack-plugins)
    - [Start with good base plugins](#start-with-good-base-plugins)
    - [Code splitting](#code-splitting)
    - [Shared libraries](#shared-libraries)
    - [Tree shaking](#tree-shaking)
    - [Source maps](#source-maps)
    - [Progressive web applications](#progressive-web-applications)
  - [Babel plugins - In Progress](#babel-plugins---in-progress)
  - [Other tools - In Progress](#other-tools---in-progress)
  - [Performance auditing - In Progress](#performance-auditing---in-progress)
- [The Backend Playbook - In Progress](#the-backend-playbook---in-progress)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The Architecture Playbook

#### [Have a single infrastructure](docs/infrastructure/single.md)

A unified development effort should use a single infrastructure to control all
similar projects.

## The Frontend Playbook

Our frontend infrastructure is based around
[webpack](https://webpack.github.io/) builds, but most of the guidelines / goals
apply to any build tool.

### Webpack plugins

#### [Start with good base plugins](docs/frontend/webpack-plugins.md)

Webpack has a rich plugin ecosystem, including both
[core](https://webpack.github.io/docs/list-of-plugins.html) and
[open source modules](https://www.npmjs.com/browse/keyword/webpack-plugin).
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

[Code splitting](http://webpack.github.io/docs/code-splitting.html) is a Webpack
feature that enables a JS bundle within a single build to be split up and loaded
on-demand in smaller parts. Code splitting is appropriate within a single page
and build.

#### [Shared libraries](docs/frontend/webpack-shared-libs.md)

Webpack shared libraries are slightly different from code splitting scenarios in
that the common dependencies are shareable across builds and require a two-part
build. In a first step, a common shared bundle and manifest is created. Then, in
a second step, entry points ingest the manifest and omit any libraries included
in the shared bundle. Shared libraries are appropriate for better long term
caching within a single app across deploys and across different projects / real
HTML pages.

#### [Tree shaking](docs/frontend/webpack-tree-shaking.md)

[Tree shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html) is a
transformation process for [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html)
whereby ESnext `export`s that are not used in a Webpack bundle can be isolated
during code bundling and removed entirely by Uglify dead code elimination.

#### [Source maps](docs/frontend/webpack-source-maps.md)

The Webpack [SourceMapDevToolPlugin](http://webpack.github.io/docs/list-of-plugins.html#sourcemapdevtoolplugin)
creates [source maps](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info)
which allows a developer to view / debug developer-friendly source code instead
of the optimized, mangled, and minified JS bundle of a frontend web app. Source
maps should be enabled for both development and production.

#### [Progressive web applications](docs/frontend/webpack-pwa.md)

[Progressive web applications](https://developers.google.com/web/progressive-web-apps/)
as described by Google are applications that are:

> - **Reliable** - Load instantly and never show the downasaur, even in uncertain network conditions.
> - **Fast** - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
> - **Engaging** - Feel like a natural app on the device, with an immersive user experience.

This section discuss setting up a PWA infrastructure using Webpack.

For a more in-depth introduction, Google provides a handy
"[Your First Progressive Web App](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/)"
tutorial.

### Babel plugins - In Progress

<!-- **TODO: Write up intro section / doc - https://github.com/FormidableLabs/formidable-playbook/issues/9** -->

### Other tools - In Progress

<!-- **TODO: tools - https://github.com/FormidableLabs/formidable-playbook/issues/8** -->

<!-- * TODO: little-loader for script loading -->

### Performance auditing - In Progress

<!-- **TODO: inspectpack reports, audits - https://github.com/FormidableLabs/formidable-playbook/issues/2** -->

## The Backend Playbook - In Progress

<!-- **TODO: Plan, write section - https://github.com/FormidableLabs/formidable-playbook/issues/4** -->
