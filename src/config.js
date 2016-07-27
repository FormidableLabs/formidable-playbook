// The order should mirror the README TOC
module.exports = [
  {
    label: "Home",
    route: "/",
    file: null
  },
  {
    label: "Having a Single Infrastructure",
    route: "/infrastructure/single",
    file: require("!!raw!../docs/infrastructure/single.md")
  },
  {
    label: "Webpack Code Splitting",
    route: "/frontend/webpack-code-splitting",
    file: require("!!raw!../docs/frontend/webpack-code-splitting.md")
  },
  {
    label: "Webpack Plugins",
    route: "/frontend/webpack-plugins",
    file: require("!!raw!../docs/frontend/webpack-plugins.md")
  },
  {
    label: "Webpack Shared Libraries",
    route: "/frontend/webpack-shared-libs",
    file: require("!!raw!../docs/frontend/webpack-shared-libs.md")
  },
  {
    label: "Webpack Source Maps",
    route: "/frontend/webpack-source-maps",
    file: require("!!raw!../docs/frontend/webpack-source-maps.md")
  }
];
