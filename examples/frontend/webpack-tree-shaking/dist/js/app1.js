/******/ !function(modules) {
    /******/
    /******/
    // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
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
        /******/
        // Return the exports of the module
        /******/
        /******/
        /******/
        // Execute the module function
        /******/
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
    /******/
    // Load entry module and return exports
    /******/
    /******/
    /******/
    /******/
    // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules, /******/
    /******/
    // expose the module cache
    /******/
    __webpack_require__.c = installedModules, /******/
    /******/
    // define getter function for harmony exports
    /******/
    __webpack_require__.d = function(exports, name, getter) {
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
    }, /******/
    /******/
    // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function(module) {
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
    }, /******/
    /******/
    // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, /******/
    /******/
    // __webpack_public_path__
    /******/
    __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
}([ /* 0 */
/*!*****************!*\
  !*** ./app1.js ***!
  \*****************/
/*! exports provided:  */
/*! all exports used */
/***/
function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", {
        value: !0
    });
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(/*! ./util */ 1);
    document.querySelector("#content").innerHTML += Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)("app1", "App 1");
}, /* 1 */
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/*! exports provided: red, blue */
/*! exports used: red */
/***/
function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return red;
    });
    /* unused harmony export blue */
    var red = function(id, msg) {
        return '<h1 id="' + id + '" style="color: red">' + msg + "</h1>";
    };
} ]);