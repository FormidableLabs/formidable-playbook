var lib_1c456e9656dd9be74724 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************!*\
  !*** dll lib ***!
  \***************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__;

/***/ },
/* 1 */
/*!****************!*\
  !*** ./lib.js ***!
  \****************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Shared Library (DLL)
	 *
	 * Don't need to assign to variable, just the side-effect of "including"
	 * desired libraries in this file.
	 */
	__webpack_require__(/*! ./foo */ 2);


/***/ },
/* 2 */
/*!****************!*\
  !*** ./foo.js ***!
  \****************/
/***/ function(module, exports) {

	module.exports = function (id, msg) {
	  return "<h1 id=\"" + id + "\">" + msg + "</h1>";
	};


/***/ }
/******/ ]);