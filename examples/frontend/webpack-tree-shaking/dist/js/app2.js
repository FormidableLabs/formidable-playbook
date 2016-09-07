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
    // identity function for calling harmory imports with the correct context
    /******/
    /******/
    // define getter function for harmory exports
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
            return module["default"];
        } : /******/
        function() {
            return module;
        };
        /******/
        /******/
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 2);
}([ /* 0 */
/* exports used: red, blue */
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function red(id, msg) {
        return '<h1 id="' + id + '" style="color: red">' + msg + "</h1>";
    }
    function blue(id, msg) {
        return '<h1 id="' + id + '" style="color: blue">' + msg + "</h1>";
    }
    /* harmony export */
    exports.a = red, /* harmony export */ exports.b = blue;
    /* unused harmony export Foo */ var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }();
    (function() {
        function Foo() {
            _classCallCheck(this, Foo);
        }
        return _createClass(Foo, [ {
            key: "bar",
            value: function() {
                return "bar";
            }
        } ]), Foo;
    })();
}, /* 1 */
, /* 2 */
/* all exports used */
/*!*****************!*\
  !*** ./app2.js ***!
  \*****************/
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(/*! ./util */ 0);
    document.querySelector("#content").innerHTML += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)("app2", "App 2");
} ]);