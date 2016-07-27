"use strict";
var config = require("./src/config");
var routes = [];
config.forEach(function (doc) { routes.push(doc.route); });

module.exports = routes;
