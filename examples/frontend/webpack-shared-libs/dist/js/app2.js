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
/*!*****************!*\
  !*** ./app2.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	var foo = __webpack_require__(/*! ./foo */ 1);

	document.querySelector("#content").innerHTML += foo("app2", "App 2");


/***/ },
/* 1 */
/*!**********************************************************************!*\
  !*** delegated ./foo.js from dll-reference lib_1c456e9656dd9be74724 ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(2);

/***/ },
/* 2 */
/*!*******************************************!*\
  !*** external "lib_1c456e9656dd9be74724" ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = lib_1c456e9656dd9be74724;

/***/ }
/******/ ]);