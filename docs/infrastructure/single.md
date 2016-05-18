### Have a single infrastructure

A project should have a single infrastructure control all similar projects.
Classes of similar projects include React components, Hapi plugins, Node.js
servers, etc.

There are many different ways of implementing your projects and builds, and
without being too preachy, the goals should be:

* Declare infrastructure (build, test, qa) tasks and dependencies for those
  tasks in a single place.
* Ensure new projects of the same type use that same infrastructure.

This can be accomplished with many separate repositories ("multi-repo") or a
single repository with many internal packages ("monorepo").

Some different technology tools to get you there:

| Tool | Strategy | Example | Notes |
| ---- | ---------| ------- | ----- |
| [`builder`](https://github.com/FormidableLabs/builder)| multi-repo | [`builder-victory-component`](https://github.com/FormidableLabs/builder-victory-component) | Control tasks, configs, dependencies |
| [`multibot`](https://github.com/FormidableLabs/multibot)| multi-repo | | Craft parallel repository code changes |
| [`lerna`](https://github.com/lerna/lerna)| monorepo | [`babel`](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) | Multiple `package.json`, single repo |
