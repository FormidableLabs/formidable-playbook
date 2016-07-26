Contributing
============

### Updating Docs
* Before opening a PR, be sure to run `npm run build-docs`. We **commit** built examples to this repository because they're small and meant to be read.
* The build also automatically generates the Markdown TOCs in each file using `doctoc`. Please do not manually update TOCs or the control comments for `doctoc`.

### Site Development
We use [Builder](https://github.com/FormidableLabs/builder) with the [builder-docs-archetype](https://github.com/FormidableLabs/builder-docs-archetype) to manage our static-site build.

For development, run `npm start` to serve the application locally. To generate a static build, run `builder run build-static` and a `/build` directory will be created. Do not commit this. You can then run `builder run server-static` to serve the built-site locally.

#### Adding Pages
When adding a new page to `/docs` and `/docs/README.md`, be sure to add a reference to it in `static-routes.js`. This is so the documentation site can verify that the route exists and can be served.

### Deployment
Coming soon
