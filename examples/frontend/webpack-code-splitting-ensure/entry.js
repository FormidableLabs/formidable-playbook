/*eslint-disable*/ // Disable as rest of code around here is Node.

/**
 * Lazy load both applications.
 *
 * **Note**: `src` is aliased to `examples/frontend/src`.
 */
require.ensure(["src/app1"], function (require) {
  require("src/app1");
});
require.ensure(["src/app2"], function (require) {
  require("src/app2");
});
