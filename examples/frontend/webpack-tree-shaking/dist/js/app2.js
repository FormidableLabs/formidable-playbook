/******/ !function(modules) {
    /******/
    // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        // Check if module is in cache
        /******/
        if (installedModules[moduleId]) /******/
        return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: !1,
            /******/
            exports: {}
        };
        /******/
        // Return the exports of the module
        /******/
        /******/
        // Execute the module function
        /******/
        /******/
        // Flag the module as loaded
        /******/
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    // webpackBootstrap
    /******/
    // The module cache
    /******/
    var installedModules = {};
    /******/
    // Load entry module and return exports
    /******/
    /******/
    // expose the modules object (__webpack_modules__)
    /******/
    /******/
    // expose the module cache
    /******/
    /******/
    // identity function for calling harmony imports with the correct context
    /******/
    /******/
    // define getter function for harmony exports
    /******/
    /******/
    // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/
    // Object.prototype.hasOwnProperty.call
    /******/
    /******/
    // __webpack_public_path__
    /******/
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.i = function(value) {
        return value;
    }, __webpack_require__.d = function(exports, name, getter) {
        /******/
        __webpack_require__.o(exports, name) || /******/
        Object.defineProperty(exports, name, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        /******/
        var getter = module && module.__esModule ? /******/
        function() {
            return module.default;
        } : /******/
        function() {
            return module;
        };
        /******/
        /******/
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 1);
}([ /* 0 */
/* exports provided: red, blue */
/* exports used: blue */
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    /* unused harmony export red */
    /* harmony export (binding) */
    __webpack_require__.d(exports, "a", function() {
        return blue;
    });
    var blue = function(id, msg) {
        return '<h1 id="' + id + '" style="color: blue">' + msg + "</h1>";
    };
}, /* 1 */
/* unknown exports provided */
/* all exports used */
/*!*****************!*\
  !*** ./app2.js ***!
  \*****************/
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(/*! ./util */ 0);
    document.querySelector("#content").innerHTML += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)("app2", "App 2");
} ]);