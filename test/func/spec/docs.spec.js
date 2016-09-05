var adapter = require("builder-docs-archetype-dev/spec-setup").adapter;
var expect = require("chai").expect;

var routes = require("../../../static-routes");

var validateRelative = function (abs) {
  // check if link belongs to our app
  if (abs.indexOf(global.TEST_FUNC_BASE_URL) === 0) {
    // strip base url out
    var rel = abs.substr(global.TEST_FUNC_BASE_URL.length);
    // strip query/hash out
    rel = rel.split(/[?#]/)[0];
    // throw a helpful error if it's not in static-routes
    if (routes.indexOf(rel) < 0) {
      throw new Error(rel + " not a valid relative link");
    }
  }
};

describe("Docs", function () {
  it("should render a page with proper title", function () {
    return adapter.client
      .url("/")
      .getTitle().then(function (title) {
        expect(title).to.eq("Formidable Playbook");
      });
  });

  // Render every static route
  routes.forEach(function (r) {
    describe("Route " + r, function () {
      it("should render with no broken links", function () {
        return adapter.client
          .url(r)
          .elements("#content").then(function (res) {
            expect(res.value).to.have.length(1); // Not a 404
          })
          // find every link
          .getAttribute("a[href]", "href").then(function (urls) {
            urls.forEach(validateRelative);
          });
      });
    });
  });
});
