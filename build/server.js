require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 137);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(114);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(115);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(55);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Link/Link.js';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleClick = event => {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      if (event.defaultPrevented === true) {
        return;
      }

      event.preventDefault();
      __WEBPACK_IMPORTED_MODULE_2__history__["a" /* default */].push(this.props.to);
    }, _temp;
  }

  render() {
    const _props = this.props,
          { to, children } = _props,
          props = _objectWithoutProperties(_props, ['to', 'children']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'a',
      _extends({ href: to }, props, { onClick: this.handleClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }),
      children
    );
  }
}

Link.propTypes = {
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
Link.defaultProps = {
  onClick: null
};
/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

if (false) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  // default locale is the first one
  locales: ['en-US', 'cs-CZ'],

  // Node.js app
  port: process.env.PORT || 3000,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const sequelize = new __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a(__WEBPACK_IMPORTED_MODULE_1__config___default.a.databaseUrl, {
  define: {
    freezeTableName: true
  }
});

/* harmony default export */ __webpack_exports__["a"] = (sequelize);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable import/prefer-default-export */

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
/* harmony export (immutable) */ __webpack_exports__["d"] = SET_RUNTIME_VARIABLE;

const SET_LOCALE_START = 'SET_LOCALE_START';
/* harmony export (immutable) */ __webpack_exports__["a"] = SET_LOCALE_START;

const SET_LOCALE_SUCCESS = 'SET_LOCALE_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["b"] = SET_LOCALE_SUCCESS;

const SET_LOCALE_ERROR = 'SET_LOCALE_ERROR';
/* harmony export (immutable) */ __webpack_exports__["c"] = SET_LOCALE_ERROR;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layout_scss__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layout_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Layout_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Footer__ = __webpack_require__(34);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Layout/Layout.js';





// external-global styles must be imported in your JS.




class Layout extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        __self: this
      },
      this.props.children,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Footer__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      })
    );
  }
}

Layout.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3_normalize_css___default.a, __WEBPACK_IMPORTED_MODULE_4__Layout_scss___default.a)(Layout));

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setLocale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__intl_graphql__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__intl_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__intl_graphql__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/prefer-default-export */





function setLocale({ locale }) {
  return (() => {
    var _ref = _asyncToGenerator(function* (dispatch, getState, { client, history }) {
      dispatch({
        type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* SET_LOCALE_START */],
        payload: {
          locale
        }
      });

      try {
        // WARNING !!
        // do not use client.networkInterface except you want skip Apollo store
        // use client.query if you want benefit from Apollo caching mechanisms
        const { data } = yield client.networkInterface.query({
          query: __WEBPACK_IMPORTED_MODULE_1__intl_graphql___default.a,
          variables: { locale }
        });
        const messages = data.intl.reduce(function (msgs, msg) {
          msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign
          return msgs;
        }, {});
        dispatch({
          type: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* SET_LOCALE_SUCCESS */],
          payload: {
            locale,
            messages
          }
        });

        // remember locale for every new request
        if (false) {
          const maxAge = 3650 * 24 * 3600; // 10 years in seconds
          document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
          history.push(`?lang=${locale}`);
        }
      } catch (error) {
        dispatch({
          type: __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* SET_LOCALE_ERROR */],
          payload: {
            locale,
            error
          }
        });
        return false;
      }

      return true;
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })();
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Feedback_scss__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Feedback_scss__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Feedback/Feedback.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





class Feedback extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h2',
          { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.title, __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            },
            __self: this
          },
          '\u0412\u0438\u0433\u043E\u0442\u043E\u0432\u0438\u043C\u043E \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0439 \u0448\u0435\u0434\u0435\u0432\u0440 \u0440\u0430\u0437\u043E\u043C'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.text, __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            },
            __self: this
          },
          '\u0417\u0432\u2019\u044F\u0436\u0456\u0442\u044C\u0441\u044F \u0437 \u043D\u0430\u043C\u0438 \u0442\u0430 \u0434\u0456\u0437\u043D\u0430\u0439\u0442\u0435\u0441\u044C \u0431\u0456\u043B\u044C\u0448\u0435'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'form',
          { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.form, action: '#', __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.name, placeholder: '\u0406\u043C\u2019\u044F', type: 'text', required: true, __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.tel, placeholder: '\u0422\u0435\u043B\u0435\u0444\u043E\u043D', type: 'text', required: true, __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.mail, placeholder: 'E-mail', type: 'email', required: true, __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { type: 'text', placeholder: '\u0412\u0430\u0448\u0430 \u0456\u0434\u0435\u044F \u0430\u0431\u043E \u043F\u0438\u0442\u0430\u043D\u043D\u044F', required: true, className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.quetions, __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a.submit, __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              },
              __self: this
            },
            '\u0417\u0432\u2019\u044F\u0437\u0430\u0442\u0438\u0441\u044C'
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Feedback_scss___default.a)(Feedback));

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SELECT_MATERIAL = "SELECT_MATERIAL";
/* harmony export (immutable) */ __webpack_exports__["a"] = SELECT_MATERIAL;

const GET_SELECT_PROJECT = 'GET_SELECT_PROJECT';
/* unused harmony export GET_SELECT_PROJECT */


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sequelize__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UserLogin__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UserClaim__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UserProfile__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__UserLogin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__UserClaim__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__UserProfile__["a"]; });
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */







__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_2__UserLogin__["a" /* default */], {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_3__UserClaim__["a" /* default */], {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasOne(__WEBPACK_IMPORTED_MODULE_4__UserProfile__["a" /* default */], {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return __WEBPACK_IMPORTED_MODULE_0__sequelize__["a" /* default */].sync(...args);
}

/* harmony default export */ __webpack_exports__["a"] = ({ sync });


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(75);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./ErrorPage.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(85);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Projects.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Projects.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("intl");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_request_language__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_request_language___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express_request_language__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_express_jwt__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_express_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_graphql__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_express_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jsonwebtoken__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_dom_server__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_apollo__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_pretty_error__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_intl__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__serverIntlPolyfill__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__core_createApolloClient__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_App__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_Html__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__routes_error_ErrorPage__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__routes_error_ErrorPage_css__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__routes_error_ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__routes_error_ErrorPage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__createFetch__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__passport__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__router__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__data_models__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__data_schema__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__assets_json__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__store_configureStore__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__actions_runtime__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__actions_intl__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29__config__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/server.js',
    _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



























 // eslint-disable-line import/no-unresolved





const app = __WEBPACK_IMPORTED_MODULE_2_express___default()();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_2_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_3_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_4_express_request_language___default()({
  languages: __WEBPACK_IMPORTED_MODULE_29__config___default.a.locales,
  queryName: 'lang',
  cookie: {
    name: 'lang',
    options: {
      path: '/',
      maxAge: 3650 * 24 * 3600 * 1000 // 10 years in miliseconds
    },
    url: '/lang/{language}'
  }
}));
app.use(__WEBPACK_IMPORTED_MODULE_5_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_5_body_parser___default.a.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_6_express_jwt___default()({
  secret: __WEBPACK_IMPORTED_MODULE_29__config___default.a.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
}));
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof __WEBPACK_IMPORTED_MODULE_6_express_jwt__["UnauthorizedError"]) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

app.use(__WEBPACK_IMPORTED_MODULE_21__passport__["a" /* default */].initialize());

if (true) {
  app.enable('trust proxy');
}
app.get('/login/facebook', __WEBPACK_IMPORTED_MODULE_21__passport__["a" /* default */].authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
app.get('/login/facebook/return', __WEBPACK_IMPORTED_MODULE_21__passport__["a" /* default */].authenticate('facebook', { failureRedirect: '/login', session: false }), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = __WEBPACK_IMPORTED_MODULE_8_jsonwebtoken___default.a.sign(req.user, __WEBPACK_IMPORTED_MODULE_29__config___default.a.auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect('/');
});

//
// Register API middleware
// -----------------------------------------------------------------------------
const graphqlMiddleware = __WEBPACK_IMPORTED_MODULE_7_express_graphql___default()(req => ({
  schema: __WEBPACK_IMPORTED_MODULE_24__data_schema__["a" /* default */],
  graphiql: true,
  rootValue: { request: req },
  pretty: true
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const apolloClient = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__core_createApolloClient__["a" /* default */])({
        schema: __WEBPACK_IMPORTED_MODULE_24__data_schema__["a" /* default */],
        rootValue: { request: req }
      });

      const fetch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_20__createFetch__["a" /* default */])({
        baseUrl: __WEBPACK_IMPORTED_MODULE_29__config___default.a.api.serverUrl,
        cookie: req.headers.cookie,
        apolloClient
      });

      const initialState = {
        user: req.user || null
      };

      const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_26__store_configureStore__["a" /* default */])(initialState, {
        cookie: req.headers.cookie,
        apolloClient,
        fetch,
        // I should not use `history` on server.. but how I do redirection? follow universal-router
        history: null
      });

      store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_27__actions_runtime__["a" /* setRuntimeVariable */])({
        name: 'initialNow',
        value: Date.now()
      }));

      store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_27__actions_runtime__["a" /* setRuntimeVariable */])({
        name: 'availableLocales',
        value: __WEBPACK_IMPORTED_MODULE_29__config___default.a.locales
      }));

      const locale = req.language;
      yield store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_28__actions_intl__["a" /* setLocale */])({
        locale
      }));

      const css = new Set();

      // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html
      const context = {
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        insertCss: function (...styles) {
          // eslint-disable-next-line no-underscore-dangle
          styles.forEach(function (style) {
            return css.add(style._getCss());
          });
        },
        fetch,
        // You can access redux through react-redux connect
        store,
        storeSubscription: null,
        // Apollo Client for use with react-apollo
        client: apolloClient
      };

      const route = yield __WEBPACK_IMPORTED_MODULE_22__router__["a" /* default */].resolve(_extends({}, context, {
        path: req.path,
        query: req.query,
        locale
      }));

      if (route.redirect) {
        res.redirect(route.status || 302, route.redirect);
        return;
      }

      const data = _extends({}, route);

      const rootComponent = __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_16__components_App__["a" /* default */],
        { context: context, store: store, __source: {
            fileName: _jsxFileName,
            lineNumber: 196
          },
          __self: _this
        },
        route.component
      );
      yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11_react_apollo__["getDataFromTree"])(rootComponent);
      // this is here because of Apollo redux APOLLO_QUERY_STOP action
      yield __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.delay(0);
      data.children = yield __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default.a.renderToString(rootComponent);
      data.styles = [{ id: 'css', cssText: [...css].join('') }];
      data.scripts = [__WEBPACK_IMPORTED_MODULE_25__assets_json___default.a.vendor.js, __WEBPACK_IMPORTED_MODULE_25__assets_json___default.a.client.js];

      if (__WEBPACK_IMPORTED_MODULE_25__assets_json___default.a[route.chunk]) {
        data.scripts.push(__WEBPACK_IMPORTED_MODULE_25__assets_json___default.a[route.chunk].js);
      }

      // Furthermore invoked actions will be ignored, client will not receive them!
      if (true) {
        // eslint-disable-next-line no-console
        console.log('Serializing store...');
      }
      data.app = {
        apiUrl: __WEBPACK_IMPORTED_MODULE_29__config___default.a.api.clientUrl,
        state: context.store.getState(),
        lang: locale
      };

      const html = __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_17__components_Html__["a" /* default */], _extends({}, data, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227
        },
        __self: _this
      })));
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new __WEBPACK_IMPORTED_MODULE_12_pretty_error___default.a();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const locale = req.language;
  console.error(pe.render(err));
  const html = __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_17__components_Html__["a" /* default */],
    {
      title: 'Internal Server Error',
      description: err.message,
      styles: [{ id: 'css', cssText: __WEBPACK_IMPORTED_MODULE_19__routes_error_ErrorPage_css___default.a._getCss() }] // eslint-disable-line no-underscore-dangle
      , app: { lang: locale },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 246
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_13_react_intl__["IntlProvider"],
      { locale: locale, __source: {
          fileName: _jsxFileName,
          lineNumber: 253
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_18__routes_error_ErrorPage__["a" /* ErrorPageWithoutStyle */], { error: err, __source: {
          fileName: _jsxFileName,
          lineNumber: 254
        },
        __self: _this
      })
    ))
  ));
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
__WEBPACK_IMPORTED_MODULE_23__data_models__["a" /* default */].sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(__WEBPACK_IMPORTED_MODULE_29__config___default.a.port, () => {
    console.info(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_29__config___default.a.port}/`);
  });
});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = selectMaterial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_product__ = __webpack_require__(17);


function selectMaterial(index) {
	return dispatch => {
		dispatch({
			type: __WEBPACK_IMPORTED_MODULE_0__constants_product__["a" /* SELECT_MATERIAL */],
			payload: index
		});
	};
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setRuntimeVariable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
/* eslint-disable import/prefer-default-export */



function setRuntimeVariable({ name, value }) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* SET_RUNTIME_VARIABLE */],
    payload: {
      name,
      value
    }
  };
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__AboutUs_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link_Link__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aboutPic_png__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aboutPic_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__aboutPic_png__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/AboutUs/AboutUs.js';
/**
 * Created by Vladyslav on 6/2/2017.
 */







class AboutUs extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.root, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.container, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 15
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.image, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 16
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.aboutPic, src: __WEBPACK_IMPORTED_MODULE_4__aboutPic_png___default.a, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 17
                        },
                        __self: this
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.topic, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 19
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h2',
                        { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.title, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 20
                            },
                            __self: this
                        },
                        '\u041F\u0440\u043E \u043D\u0430\u0441'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.text, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 21
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'p',
                            { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.article, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 22
                                },
                                __self: this
                            },
                            '\u041C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u044F \u2013 \u0446\u0435 \u043C\u0456\u0441\u0446\u0435, \u0434\u0435 \u0432\u0430\u0448\u0430 \u0456\u0434\u0435\u044F \u0440\u0435\u0430\u043B\u0456\u0437\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F \u0437 \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u0430\u043C\u0435\u043D\u044E. \u0412\u0436\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 5 \u0440\u043E\u043A\u0456\u0432 \u043C\u0438 \u0441\u0442\u0432\u043E\u0440\u044E\u0454\u043C\u043E \u0443\u043D\u0456\u043A\u0430\u043B\u044C\u043D\u0456 \u0434\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442\u0438 \u0434\u043B\u044F \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0438\u0445 \u0456 \u0433\u0440\u043E\u043C\u0430\u0434\u0441\u044C\u043A\u0438\u0445 \u0456\u043D\u0442\u0435\u0440\'\u0454\u0440\u0456\u0432.'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'p',
                            { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.article, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 25
                                },
                                __self: this
                            },
                            '\u041C\u0438 \u043F\u0440\u043E\u043F\u043E\u043D\u0443\u0454\u043C\u043E \u0440\u0456\u0437\u043D\u0456 \u0432\u0430\u0440\u0456\u0430\u043D\u0442\u0438 \u0441\u043F\u0456\u0432\u043F\u0440\u0430\u0446\u0456, \u0441\u0435\u0440\u0435\u0434 \u044F\u043A\u0438\u0445 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0434\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442\u0456\u0432 \u0431\u0443\u0434\u044C-\u044F\u043A\u043E\u0457 \u0441\u043A\u043B\u0430\u0434\u043D\u043E\u0441\u0442\u0456, \u0457\u0445 \u0430\u0432\u0442\u043E\u0440\u0441\u044C\u043A\u0438\u0439 \u0441\u0443\u043F\u0440\u043E\u0432\u0456\u0434 \u0442\u0430 \u043F\u043E\u0432\u043D\u0430 \u0440\u0435\u0430\u043B\u0456\u0437\u0430\u0446\u0456\u044F, \u0445\u0443\u0434\u043E\u0436\u043D\u0454 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u043D\u044F \u0456\u043D\u0442\u0435\u0440\'\u0454\u0440\u0456\u0432, \u0430 \u0442\u0430\u043A\u043E\u0436 \u0457\u0445 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443 \u0442\u0430 \u043F\u043E\u0441\u043B\u0443\u0433\u0438 \u043C\u043E\u043D\u0442\u0443\u0432\u0430\u043D\u043D\u044F.'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'p',
                            { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.article, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 28
                                },
                                __self: this
                            },
                            '\u041D\u0430\u0439\u0432\u0430\u0436\u043B\u0438\u0432\u0456\u0448\u0435 \u0434\u043B\u044F \u043D\u0430\u0441 \u2013\xA0\u0432\u0430\u0448\u0435 \u0435\u0441\u0442\u0435\u0442\u0438\u0447\u043D\u0435 \u0437\u0430\u0434\u043E\u0432\u043E\u043B\u0435\u043D\u043D\u044F, \u0442\u043E\u0436 \u043C\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u0454\u043C\u043E \u044F\u043A\u0456\u0441\u0442\u044C \u043D\u0430\u0448\u043E\u0457 \u0440\u043E\u0431\u043E\u0442\u0438 \u0442\u0430 \u0434\u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0442\u0435\u0440\u043C\u0456\u043D\u0456\u0432 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F.'
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.btn, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 30
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NumberList, { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.list, numbers: numbers, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 31
                            },
                            __self: this
                        })
                    )
                )
            )
        );
    }
}
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(number => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        { className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.listItems, key: number.toString(), __source: {
                fileName: _jsxFileName,
                lineNumber: 42
            },
            __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
            { to: '/catalog', className: __WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a.text, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                },
                __self: this
            },
            number
        )
    ));
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 47
            },
            __self: this
        },
        listItems
    );
}

const numbers = ['Детальніше', 'Переглянути роботи'];

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_1__AboutUs_scss___default.a)(AboutUs));

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/App.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






const ContextType = _extends({
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // Universal HTTP client
  fetch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}, __WEBPACK_IMPORTED_MODULE_3_react_redux__["Provider"].childContextTypes, {
  // Apollo Client
  client: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
});

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {

  getChildContext() {
    return this.props.context;
  }

  componentDidMount() {
    const store = this.props.context && this.props.context.store;
    if (store) {
      this.lastLocale = store.getState().intl.locale;
      this.unsubscribe = store.subscribe(() => {
        const state = store.getState();
        const { newLocale, locale } = state.intl;
        if (!newLocale && this.lastLocale !== locale) {
          this.lastLocale = locale;
          this.forceUpdate();
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    const store = this.props.context && this.props.context.store;
    const state = store && store.getState();
    this.intl = state && state.intl || {};
    const { initialNow, locale, messages } = this.intl;
    const localeMessages = messages && messages[locale] || {};
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_intl__["IntlProvider"],
      {
        initialNow: initialNow,
        locale: locale,
        messages: localeMessages,
        defaultLocale: 'en-US',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children)
    );
  }

}

App.propTypes = {
  context: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape(ContextType).isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
};
App.childContextTypes = ContextType;
/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_materialsActions__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Material__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__image_productDesc_png__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__image_productDesc_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__image_productDesc_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__image_photo1_png__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__image_photo1_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__image_photo1_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__image_photo2_png__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__image_photo2_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__image_photo2_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__image_photo3_png__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__image_photo3_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__image_photo3_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__history__ = __webpack_require__(55);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/DescriptionProduct/DescriptionProduct.js';















const list = [{
  name: 'Складні архітектурні вироби',
  image: [{
    photo: __WEBPACK_IMPORTED_MODULE_9__image_photo1_png___default.a,
    alt: 'photo1'
  }, {
    photo: __WEBPACK_IMPORTED_MODULE_10__image_photo2_png___default.a,
    alt: 'photo2'
  }, {
    photo: __WEBPACK_IMPORTED_MODULE_11__image_photo3_png___default.a,
    alt: 'photo3'
  }]
}, {
  name: 'Садово-паркове мистецтво',
  image: [{
    photo: __WEBPACK_IMPORTED_MODULE_8__image_productDesc_png___default.a,
    alt: 'photo1'
  }]
}];

class DescriptionProducts extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor() {
    super();
  }

  render() {
    let { selectedMaterial, listMaterials, selectbtn } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.products, __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h2',
        { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.title, __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        },
        '\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0456\u0457'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.items, __source: {
            fileName: _jsxFileName,
            lineNumber: 55
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.item, __source: {
              fileName: _jsxFileName,
              lineNumber: 56
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.name, __source: {
                fileName: _jsxFileName,
                lineNumber: 57
              },
              __self: this
            },
            '\u0412\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u0454 \u0442\u0430 \u0437\u043E\u0432\u043D\u0456\u0448\u043D\u0454 \u043E\u0437\u0434\u043E\u0431\u043B\u0435\u043D\u043D\u044F'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.item_wrap, __source: {
                fileName: _jsxFileName,
                lineNumber: 58
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.materials, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 59
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.parametr, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 60
                  },
                  __self: this
                },
                '\u0412\u0438\u0434 \u043A\u0430\u043C\u0435\u043D\u044E:'
              ),
              listMaterials.map((elem, index) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Material__["a" /* default */], { keys: elem.key,
                styles: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.material,
                key: index,
                selected: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.select,
                type: selectedMaterial.type,
                name: elem.name,
                classNameId: selectedMaterial.classNameId,
                selectbtn: selectbtn, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 62
                },
                __self: this
              }))
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.photos, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 71
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.image, src: selectedMaterial.photos[0], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 72
                },
                __self: this
              })
            )
          )
        )
      ),
      list.map((elem, index) => {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.item, key: index, __source: {
              fileName: _jsxFileName,
              lineNumber: 81
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.name, __source: {
                fileName: _jsxFileName,
                lineNumber: 82
              },
              __self: this
            },
            elem.name
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.photo_wrap, __source: {
                fileName: _jsxFileName,
                lineNumber: 83
              },
              __self: this
            },
            elem.image.map((elemPhoto, indexPhoto) => {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: __WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a.image,
                src: elemPhoto.photo,
                alt: elemPhoto.alt,
                key: indexPhoto, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 86
                },
                __self: this
              });
            })
          )
        );
      })
    );
  }
}

function mapToStateProps(state) {
  return {
    selectedMaterial: state.selectMaterial.selectedMaterial,
    listMaterials: state.selectMaterial.listMaterials
  };
}

function mapToActionProps(dispatch) {
  return {
    selectbtn: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_6__actions_materialsActions__["a" /* selectMaterial */], dispatch)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__DescriptionProduct_scss___default.a)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapToStateProps, mapToActionProps)(DescriptionProducts)));

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__history__ = __webpack_require__(55);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/DescriptionProduct/Material.js';



class Products extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor() {
    super();
  }

  onClickBtn(key, e) {
    this.props.selectbtn(key);
    __WEBPACK_IMPORTED_MODULE_1__history__["a" /* default */].push(`?type=${this.props.type}`);
  }

  componentDidMount() {
    __WEBPACK_IMPORTED_MODULE_1__history__["a" /* default */].push(`?type=${this.props.type}`);
  }

  render() {
    let { type, selectbtn, name, keys, styles, selected, classNameId } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      {
        className: classNameId == keys ? styles + " " + selected : styles,
        key: keys,
        onClick: this.onClickBtn.bind(this, keys), __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      },
      name
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Products;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_scss__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Footer_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(5);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Footer/Footer.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





class Footer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.root, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.container, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 18
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.Map, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 19
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('iframe', { src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.2681827114016!2d22.72451335009252!3d48.45138373424297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4739ab8a21d3ae17%3A0x6f5344e1208971a3!2z0LLRg9C70LjRhtGPINCf0LXRgNC10LzQvtCz0LgsINCc0YPQutCw0YfQtdCy0L4sINCX0LDQutCw0YDQv9Cw0YLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjA!5e0!3m2!1suk!2sua!4v1496568319085',
                        className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.frame, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 20
                        },
                        __self: this
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.contact, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 23
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.about, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 24
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.head, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 25
                                },
                                __self: this
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.info, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 27
                                    },
                                    __self: this
                                },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'h1',
                                    { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.mainTitle, __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 28
                                        },
                                        __self: this
                                    },
                                    '\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438'
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */],
                                    { to: '/', __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 29
                                        },
                                        __self: this
                                    },
                                    ' ',
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        'p',
                                        { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.phoneNumber, __source: {
                                                fileName: _jsxFileName,
                                                lineNumber: 29
                                            },
                                            __self: this
                                        },
                                        '+38 066 445 59 00'
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'p',
                                    { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.address, __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 30
                                        },
                                        __self: this
                                    },
                                    '\u043C. \u041C\u0443\u043A\u0430\u0447\u0435\u0432\u043E, \u0432\u0443\u043B. \u041F\u0435\u0440\u0435\u044F\u0441\u043B\u0430\u0432\u0441\u044C\u043A\u0430, 1'
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.nav, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 33
                                },
                                __self: this
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NumberList, { numbers: numbers, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 34
                                },
                                __self: this
                            })
                        )
                    )
                )
            )
        );
    }
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(number => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.listItems, key: number.toString(), __source: {
                fileName: _jsxFileName,
                lineNumber: 48
            },
            __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { className: __WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a.text, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 49
                },
                __self: this
            },
            number
        )
    ));
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 53
            },
            __self: this
        },
        listItems
    );
}

const numbers = ['Каталог продукції', 'Про нас', 'Наші роботи'];

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_scss___default.a)(Footer));

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_scss__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Header_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LanguageSwitcher__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_svg_react__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_svg_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_svg_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logo_png__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__logo_png__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Header/Header.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









class Header extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      },
      !this.props.active ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 26
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */],
          { to: '/', className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.outer, __source: {
              fileName: _jsxFileName,
              lineNumber: 27
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.logo, src: __WEBPACK_IMPORTED_MODULE_6__logo_png___default.a, __source: {
              fileName: _jsxFileName,
              lineNumber: 28
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.mainTitle, __source: {
                fileName: _jsxFileName,
                lineNumber: 29
              },
              __self: this
            },
            '\u041C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u044F'
          )
        )
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.wrap, __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */],
          { to: '/', className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.title, __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          },
          '\u041C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u044F'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.contactsWrap, __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.contacts, __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.phone, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 37
                },
                __self: this
              },
              '+38 066 445 59 00'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.address, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 38
                },
                __self: this
              },
              '\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0423\u043A\u0440\u0430\u0457\u043D\u0456'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */],
            { to: '/catalog', className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.btn, __source: {
                fileName: _jsxFileName,
                lineNumber: 40
              },
              __self: this
            },
            '\u0417\u0432\'\u044F\u0437\u0430\u0442\u0438\u0441\u044C \u0437 \u043D\u0430\u043C\u0438'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.langSwitch, __source: {
                fileName: _jsxFileName,
                lineNumber: 41
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a.active, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 42
                },
                __self: this
              },
              '\u0423\u041A\u0420 / '
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 43
                },
                __self: this
              },
              '\u0420\u0423\u0421'
            )
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Header_scss___default.a)(Header));

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Html.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






/* eslint-disable react/no-danger */

class Html extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'html',
      { className: 'no-js', lang: app.lang, __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'head',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { charSet: 'utf-8', __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { httpEquiv: 'x-ua-compatible', content: 'ie=edge', __source: {
            fileName: _jsxFileName,
            lineNumber: 42
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'title',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 43
            },
            __self: this
          },
          title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'description', content: description, __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: this
        }),
        styles.map(style => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', {
          key: style.id,
          id: style.id,
          dangerouslySetInnerHTML: { __html: style.cssText },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          },
          __self: this
        }))
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'body',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 55
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: children }, __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { dangerouslySetInnerHTML: { __html: `window.App=${__WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default()(app)}` }, __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        }),
        scripts.map(script => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { key: script, src: script, __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          },
          __self: this
        })),
        __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', {
          dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${__WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId}','auto');ga('send','pageview')` },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { src: 'https://www.google-analytics.com/analytics.js', async: true, defer: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          },
          __self: this
        })
      )
    );
  }
}

Html.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  styles: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    cssText: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired),
  scripts: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired),
  // eslint-disable-next-line react/forbid-prop-types
  app: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
Html.defaultProps = {
  styles: [],
  scripts: []
};
/* harmony default export */ __webpack_exports__["a"] = (Html);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Information_scss__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Information_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Information_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link_Link__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logo_png__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__logo_png__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Information/Information.js';
/**
 * Created by Vladyslav on 6/2/2017.
 */







class Information extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.root, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.container, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 15
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.leftBar, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 16
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.title, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 17
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'p',
                            { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.advert, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 18
                                },
                                __self: this
                            },
                            '\u0421\u0442\u0432\u043E\u0440\u044E\u0454\u043C\u043E \u0448\u0435\u0434e\u0432\u0440\u0438 \u0437 \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u0430\u043C\u0435\u043D\u044E \u0432\u043B\u0430\u0441\u043D\u043E\u0440\u0443\u0447 '
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.downBar, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 20
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.langSwitch, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 21
                            },
                            __self: this
                        }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
                            { to: '/catalog', className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.btn, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 24
                                },
                                __self: this
                            },
                            '\u0417\u0432\'\u044F\u0437\u0430\u0442\u0438\u0441\u044C \u0437 \u043D\u0430\u043C\u0438'
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.about, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 27
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.head, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 28
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.logo, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 29
                                },
                                __self: this
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
                                { to: '/', className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.outer, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 30
                                    },
                                    __self: this
                                },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.logo, src: __WEBPACK_IMPORTED_MODULE_4__logo_png___default.a, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 31
                                    },
                                    __self: this
                                })
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.info, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 35
                                },
                                __self: this
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'h1',
                                { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.mainTitle, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 36
                                    },
                                    __self: this
                                },
                                '\u041C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u044F'
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
                                { to: '/', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 37
                                    },
                                    __self: this
                                },
                                ' ',
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'p',
                                    { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.phoneNumber, __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 37
                                        },
                                        __self: this
                                    },
                                    '+38 066 445 59 00'
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'p',
                                { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.address, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 38
                                    },
                                    __self: this
                                },
                                '\u043C. \u041C\u0443\u043A\u0430\u0447\u0435\u0432\u043E, \u0432\u0443\u043B. \u041F\u0435\u0440\u0435\u044F\u0441\u043B\u0430\u0432\u0441\u044C\u043A\u0430, 1'
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.nav, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 41
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NumberList, { numbers: numbers, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 42
                            },
                            __self: this
                        })
                    )
                )
            )
        );
    }
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(number => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        { className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.listItems, key: number.toString(), __source: {
                fileName: _jsxFileName,
                lineNumber: 55
            },
            __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
            { to: '/catalog', className: __WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a.text, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                },
                __self: this
            },
            number
        )
    ));
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 60
            },
            __self: this
        },
        listItems
    );
}

const numbers = ['Каталог продукції', 'Про нас', 'Наші роботи'];

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_1__Information_scss___default.a)(Information));

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_intl__ = __webpack_require__(15);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/LanguageSwitcher/LanguageSwitcher.js';
/* eslint-disable no-shadow */






function LanguageSwitcher({ currentLocale, availableLocales, setLocale }) {
  const isSelected = locale => locale === currentLocale;
  const localeDict = {
    'en-US': 'English',
    'cs-CZ': 'Česky'
  };
  const localeName = locale => localeDict[locale] || locale;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    },
    availableLocales.map(locale => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { key: locale, __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      },
      isSelected(locale) ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          },
          __self: this
        },
        localeName(locale)
      ) :
      // github.com/yannickcr/eslint-plugin-react/issues/945
      // eslint-disable-next-line react/jsx-indent
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        {
          href: `?lang=${locale}`,
          onClick: e => {
            setLocale({ locale });
            e.preventDefault();
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        },
        localeName(locale)
      ),
      ' '
    ))
  );
}

LanguageSwitcher.propTypes = {
  currentLocale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  availableLocales: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string).isRequired,
  setLocale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale
});

const mapDispatch = {
  setLocale: __WEBPACK_IMPORTED_MODULE_3__actions_intl__["a" /* setLocale */]
};

/* unused harmony default export */ var _unused_webpack_default_export = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapState, mapDispatch)(LanguageSwitcher));

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_Link__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Projects_scss__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Projects_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Projects_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Projects/Project.js';





function Project(props) {
	const { name, photo, link, alt } = props.data;
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: __WEBPACK_IMPORTED_MODULE_2__Projects_scss___default.a.project, __source: {
				fileName: _jsxFileName,
				lineNumber: 10
			},
			__self: this
		},
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__Link_Link__["a" /* default */],
			{ to: link, __source: {
					fileName: _jsxFileName,
					lineNumber: 11
				},
				__self: this
			},
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: photo, alt: alt, className: __WEBPACK_IMPORTED_MODULE_2__Projects_scss___default.a.image, __source: {
					fileName: _jsxFileName,
					lineNumber: 12
				},
				__self: this
			})
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__Link_Link__["a" /* default */],
			{ to: link, className: __WEBPACK_IMPORTED_MODULE_2__Projects_scss___default.a.name, __source: {
					fileName: _jsxFileName,
					lineNumber: 14
				},
				__self: this
			},
			name
		)
	);
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Projects_scss___default.a)(Project));

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Projects_scss__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Projects_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link_Link__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Project__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_project1_png__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_project1_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__image_project1_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image_project2_png__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image_project2_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__image_project2_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__image_project3_png__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__image_project3_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__image_project3_png__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/Projects/Projects.js';









const ProjectsData = [{
    name: "#onyx #m-selection",
    photo: __WEBPACK_IMPORTED_MODULE_5__image_project1_png___default.a,
    link: '/catalog',
    alt: 'projects'
}, {
    name: "#onyx #m-selection",
    photo: __WEBPACK_IMPORTED_MODULE_5__image_project1_png___default.a,
    link: '/catalog',
    alt: 'projects'

}, {
    name: '#onyx #m-selection',
    photo: __WEBPACK_IMPORTED_MODULE_6__image_project2_png___default.a,
    link: '/catalog',
    alt: 'projects'
}, {
    name: "#onyx #m-selection",
    photo: __WEBPACK_IMPORTED_MODULE_5__image_project1_png___default.a,
    link: '/catalog',
    alt: 'projects'

}, {
    name: "#onyx #m-selection",
    photo: __WEBPACK_IMPORTED_MODULE_7__image_project3_png___default.a,
    link: '/catalog',
    alt: 'projects'

}, {
    name: "#onyx #m-selection",
    photo: __WEBPACK_IMPORTED_MODULE_5__image_project1_png___default.a,
    link: '/catalog',
    alt: 'projects'

}];

class Projects extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a.root, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a.container, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 59
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h1',
                    { className: __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a.title, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 60
                        },
                        __self: this
                    },
                    '\u041A\u0440\u0430\u0449\u0435 \u043E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u043E\u0434\u0438\u0432\u0438\u0442\u0438\u0441\u044C'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    { className: __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a.topic, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 61
                        },
                        __self: this
                    },
                    '\u0424\u043E\u0442\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0456\u0432 \u0437 \u043D\u0430\u0448\u043E\u0433\u043E instagram.'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a.projects, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 62
                        },
                        __self: this
                    },
                    ProjectsData.map((elem, index) => {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Project__["a" /* default */], { key: index,
                            data: elem, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 65
                            },
                            __self: this
                        });
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a.btnWrap, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 69
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
                        { to: '/catalog', className: __WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a.btn, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 70
                            },
                            __self: this
                        },
                        '\u0412\u0441\u0456 \u043F\u0440\u043E\u0435\u043A\u0442\u0438 '
                    )
                )
            )
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_1__Projects_scss___default.a)(Projects));

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__products_scss__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__products_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__products_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link_Link__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__image_product1_png__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__image_product1_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__image_product1_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_product2_png__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_product2_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__image_product2_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image_product3_png__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image_product3_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__image_product3_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__image_product4_png__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__image_product4_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__image_product4_png__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/components/catalogProduct/products.js';









const navigation = {
	productsType: [{
		name: "Внутрішнє та зовнішнє оздоблення",
		link: '/catalog',
		active: true
	}, {
		name: "Складні архітектурні вироби",
		link: '/catalog',
		active: false
	}, {
		name: "Садово-паркове мистецтво",
		link: '/catalog',
		active: false
	}],

	type: [{
		name: "Портрети",
		photo: __WEBPACK_IMPORTED_MODULE_4__image_product1_png___default.a,
		link: '/catalog',
		alt: 'portrets'
	}, {
		name: "Скульптури",
		photo: __WEBPACK_IMPORTED_MODULE_5__image_product2_png___default.a,
		link: '/catalog',
		alt: 'Скульптури'

	}, {
		name: "Каміни",
		photo: __WEBPACK_IMPORTED_MODULE_6__image_product3_png___default.a,
		link: '/catalog',
		alt: 'Каміни'

	}, {
		name: "Столешні",
		photo: __WEBPACK_IMPORTED_MODULE_7__image_product4_png___default.a,
		link: '/catalog',
		alt: 'Столешні'

	}]
};

class Products extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor() {
		super();
	}

	render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.products, __source: {
					fileName: _jsxFileName,
					lineNumber: 68
				},
				__self: this
			},
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h2',
				{ className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.title, __source: {
						fileName: _jsxFileName,
						lineNumber: 69
					},
					__self: this
				},
				'\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0456\u0457'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.items, __source: {
						fileName: _jsxFileName,
						lineNumber: 70
					},
					__self: this
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.all, __source: {
							fileName: _jsxFileName,
							lineNumber: 71
						},
						__self: this
					},
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{
							__source: {
								fileName: _jsxFileName,
								lineNumber: 72
							},
							__self: this
						},
						navigation.productsType.map((elem, index) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							__WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
							{ key: index,
								className: elem.active ? `${__WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.item} ${__WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.select}` : __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.item,
								to: elem.link, __source: {
									fileName: _jsxFileName,
									lineNumber: 74
								},
								__self: this
							},
							elem.name,
							' '
						))
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
						{ to: '/catalog', className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.btn, __source: {
								fileName: _jsxFileName,
								lineNumber: 79
							},
							__self: this
						},
						'\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0456\u0457'
					)
				),
				navigation.type.map((elem, index) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ key: index, __source: {
							fileName: _jsxFileName,
							lineNumber: 82
						},
						__self: this
					},
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.imageWrap, __source: {
								fileName: _jsxFileName,
								lineNumber: 83
							},
							__self: this
						},
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.image, src: elem.photo, alt: elem.alt, __source: {
								fileName: _jsxFileName,
								lineNumber: 84
							},
							__self: this
						})
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.wrap, __source: {
								fileName: _jsxFileName,
								lineNumber: 86
							},
							__self: this
						},
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							__WEBPACK_IMPORTED_MODULE_3__Link_Link__["a" /* default */],
							{ to: elem.link, className: __WEBPACK_IMPORTED_MODULE_1__products_scss___default.a.element, __source: {
									fileName: _jsxFileName,
									lineNumber: 87
								},
								__self: this
							},
							elem.name
						)
					)
				))
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_1__products_scss___default.a)(Products));

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createApolloClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_client__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_apollo_client__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





// Execute all GraphQL requests directly without
class ServerInterface {
  constructor(optionsData) {
    this.schema = optionsData.schema;
    this.optionsData = optionsData;
  }

  query({ query, variables, operationName }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        let validationRules = __WEBPACK_IMPORTED_MODULE_0_graphql__["specifiedRules"];
        const customValidationRules = _this.optionsData.validationRules;
        if (customValidationRules) {
          validationRules = validationRules.concat(customValidationRules);
        }

        const validationErrors = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql__["validate"])(_this.schema, query, validationRules);
        if (validationErrors.length > 0) {
          return { errors: validationErrors };
        }

        const result = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql__["execute"])(_this.schema, query, _this.optionsData.rootValue, _this.optionsData.context, variables, operationName);

        return result;
      } catch (contextError) {
        return { errors: [contextError] };
      }
    })();
  }
}

function createApolloClient(options) {
  return new __WEBPACK_IMPORTED_MODULE_1_apollo_client___default.a({
    reduxRootSelector: state => state.apollo,
    networkInterface: new ServerInterface(options),
    queryDeduplication: true
  });
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch({ baseUrl, cookie }) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _extends({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? { Cookie: cookie } : null)
  };

  return (url, options) => url.startsWith('/graphql') || url.startsWith('/api') ? __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(`${baseUrl}${url}`, _extends({}, defaults, options, {
    headers: _extends({}, defaults.headers, options && options.headers)
  })) : __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(url, options);
}

/* harmony default export */ __webpack_exports__["a"] = (createFetch);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(8);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const User = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('User', {

  id: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    defaultValue: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUIDV1,
    primaryKey: true
  },

  email: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255),
    validate: { isEmail: true }
  },

  emailConfirmed: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.BOOLEAN,
    defaultValue: false
  }

}, {

  indexes: [{ fields: ['email'] }]

});

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(8);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserClaim = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserClaim', {

  type: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
  },

  value: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.INTEGER
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserClaim);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(8);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserLogin = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserLogin', {

  name: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50),
    primaryKey: true
  },

  key: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100),
    primaryKey: true
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserLogin);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(8);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserProfile = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserProfile', {

  userId: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    primaryKey: true
  },

  displayName: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  picture: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  },

  gender: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50)
  },

  location: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  website: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserProfile);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_graphql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__types_IntlMessageType__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__config__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new __WEBPACK_IMPORTED_MODULE_2_bluebird___default.a(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return __WEBPACK_IMPORTED_MODULE_2_bluebird___default.a.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */








// A folder with messages
const CONTENT_DIR = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_path__["join"])(__dirname, './messages');

const readFile = __WEBPACK_IMPORTED_MODULE_2_bluebird___default.a.promisify(__WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFile);

const intl = {
  type: new __WEBPACK_IMPORTED_MODULE_3_graphql__["GraphQLList"](__WEBPACK_IMPORTED_MODULE_4__types_IntlMessageType__["a" /* default */]),
  args: {
    locale: { type: new __WEBPACK_IMPORTED_MODULE_3_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_3_graphql__["GraphQLString"]) }
  },
  resolve({ request }, { locale }) {
    return _asyncToGenerator(function* () {
      if (!__WEBPACK_IMPORTED_MODULE_5__config__["locales"].includes(locale)) {
        throw new Error(`Locale '${locale}' not supported`);
      }

      let localeData;
      try {
        localeData = yield readFile(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_path__["join"])(CONTENT_DIR, `${locale}.json`));
      } catch (err) {
        if (err.code === 'ENOENT') {
          throw new Error(`Locale '${locale}' not found`);
        }
      }

      return JSON.parse(localeData);
    })();
  }
};

/* harmony default export */ __webpack_exports__["a"] = (intl);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types_UserType__ = __webpack_require__(54);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const me = {
  type: __WEBPACK_IMPORTED_MODULE_0__types_UserType__["a" /* default */],
  resolve({ request }) {
    return request.user && {
      id: request.user.id,
      email: request.user.email
    };
  }
};

/* harmony default export */ __webpack_exports__["a"] = (me);

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__ = __webpack_require__(53);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





// React.js News Feed (RSS)
const url = 'https://api.rss2json.com/v1/api.json' + '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const news = {
  type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLList"](__WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__["a" /* default */]),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
        lastFetchTime = new Date();
        lastFetchTask = __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default()(url).then(response => response.json()).then(data => {
          if (data.status === 'ok') {
            items = data.items;
          }

          lastFetchTask = null;
          return items;
        }).catch(err => {
          lastFetchTask = null;
          throw err;
        });

        if (items.length) {
          return items;
        }

        return lastFetchTask;
      }

    return items;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (news);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queries_me__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_news__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__queries_intl__ = __webpack_require__(48);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */







const schema = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLSchema"]({
  query: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
    name: 'Query',
    fields: {
      me: __WEBPACK_IMPORTED_MODULE_1__queries_me__["a" /* default */],
      news: __WEBPACK_IMPORTED_MODULE_2__queries_news__["a" /* default */],
      intl: __WEBPACK_IMPORTED_MODULE_3__queries_intl__["a" /* default */]
    }
  })
});

/* harmony default export */ __webpack_exports__["a"] = (schema);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const IntlMessageType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'IntlMessage',
  fields: {
    id: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    defaultMessage: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    message: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    description: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    files: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLList"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (IntlMessageType);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const NewsItemType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'NewsItem',
  fields: {
    title: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    link: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    author: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    pubDate: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    content: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (NewsItemType);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const UserType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'User',
  fields: {
    id: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLID"]) },
    email: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (UserType);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
/* harmony default export */ __webpack_exports__["a"] = (false && __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default()());

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_facebook__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_models__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */






/**
 * Sign in with Facebook.
 */
__WEBPACK_IMPORTED_MODULE_0_passport___default.a.use(new __WEBPACK_IMPORTED_MODULE_1_passport_facebook__["Strategy"]({
  clientID: __WEBPACK_IMPORTED_MODULE_3__config___default.a.auth.facebook.id,
  clientSecret: __WEBPACK_IMPORTED_MODULE_3__config___default.a.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';
  const fooBar = (() => {
    var _ref = _asyncToGenerator(function* () {
      if (req.user) {
        const userLogin = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */].findOne({
          attributes: ['name', 'key'],
          where: { name: loginName, key: profile.id }
        });
        if (userLogin) {
          // There is already a Facebook account that belongs to you.
          // Sign in with that account or delete it, then link it with your current account.
          done();
        } else {
          const user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
            id: req.user.id,
            email: profile._json.email,
            logins: [{ name: loginName, key: profile.id }],
            claims: [{ type: claimType, value: profile.id }],
            profile: {
              displayName: profile.displayName,
              gender: profile._json.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
            }
          }, {
            include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
          });
          done(null, {
            id: user.id,
            email: user.email
          });
        }
      } else {
        const users = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findAll({
          attributes: ['id', 'email'],
          where: { '$logins.name$': loginName, '$logins.key$': profile.id },
          include: [{
            attributes: ['name', 'key'],
            model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */],
            as: 'logins',
            required: true
          }]
        });
        if (users.length) {
          const user = users[0].get({ plain: true });
          done(null, user);
        } else {
          let user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findOne({ where: { email: profile._json.email } });
          if (user) {
            // There is already an account using this email address. Sign in to
            // that account and link it with Facebook manually from Account Settings.
            done(null);
          } else {
            user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
              email: profile._json.email,
              emailConfirmed: true,
              logins: [{ name: loginName, key: profile.id }],
              claims: [{ type: claimType, value: accessToken }],
              profile: {
                displayName: profile.displayName,
                gender: profile._json.gender,
                picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
              }
            }, {
              include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
            });
            done(null, {
              id: user.id,
              email: user.email
            });
          }
        }
      }
    });

    return function fooBar() {
      return _ref.apply(this, arguments);
    };
  })();

  fooBar().catch(done);
}));

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_passport___default.a);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRootReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__intl__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__materials__ = __webpack_require__(59);






function createRootReducer({ apolloClient }) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    apollo: apolloClient.reducer(),
    user: __WEBPACK_IMPORTED_MODULE_1__user__["a" /* default */],
    runtime: __WEBPACK_IMPORTED_MODULE_2__runtime__["a" /* default */],
    intl: __WEBPACK_IMPORTED_MODULE_3__intl__["a" /* default */],
    selectMaterial: __WEBPACK_IMPORTED_MODULE_4__materials__["a" /* default */]
  });
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = intl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function intl(state = null, action) {
  if (state === null) {
    return {
      initialNow: Date.now()
    };
  }

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* SET_LOCALE_START */]:
      {
        const locale = state[action.payload.locale] ? action.payload.locale : state.locale;
        return _extends({}, state, {
          locale,
          newLocale: action.payload.locale
        });
      }

    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* SET_LOCALE_SUCCESS */]:
      {
        return _extends({}, state, {
          locale: action.payload.locale,
          newLocale: null,
          messages: _extends({}, state.messages, {
            [action.payload.locale]: action.payload.messages
          })
        });
      }

    case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* SET_LOCALE_ERROR */]:
      {
        return _extends({}, state, {
          newLocale: null
        });
      }

    default:
      {
        return state;
      }
  }
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = selectMaterial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_product__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_material1_png__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_material1_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__image_material1_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_material2_png__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_material2_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__image_material2_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__image_material3_png__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__image_material3_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__image_material4_png__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__image_material4_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__image_material4_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_material5_png__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__image_material5_png__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








const getInitialState = {
	listMaterials: [{ key: 1, name: "мармур", type: 'marble' }, { key: 2, name: "граніт", type: 'granite' }, { key: 3, name: "пісковик", type: 'sandstone' }, { key: 4, name: "вапняк", type: 'limestone' }, { key: 5, name: "квацит", type: 'kvatsyt' }, { key: 6, name: "онікс", type: 'onyx' }],

	optionsMaterials: {
		1: {
			photos: [__WEBPACK_IMPORTED_MODULE_1__image_material1_png___default.a, __WEBPACK_IMPORTED_MODULE_2__image_material2_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_4__image_material4_png___default.a, __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default.a],
			classNameId: 1,
			type: 'marble'
		},
		2: {
			photos: [__WEBPACK_IMPORTED_MODULE_1__image_material1_png___default.a, __WEBPACK_IMPORTED_MODULE_4__image_material4_png___default.a, __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_2__image_material2_png___default.a],
			classNameId: 2,
			type: 'granite'
		},
		3: {
			photos: [__WEBPACK_IMPORTED_MODULE_2__image_material2_png___default.a, __WEBPACK_IMPORTED_MODULE_4__image_material4_png___default.a, __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_1__image_material1_png___default.a],
			classNameId: 3,
			type: 'sandstone'
		},
		4: {
			photos: [__WEBPACK_IMPORTED_MODULE_1__image_material1_png___default.a, __WEBPACK_IMPORTED_MODULE_4__image_material4_png___default.a, __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_2__image_material2_png___default.a],
			classNameId: 4,
			type: 'limestone'
		},
		5: {
			photos: [__WEBPACK_IMPORTED_MODULE_1__image_material1_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_4__image_material4_png___default.a],
			classNameId: 5,
			type: 'kvatsyt'
		},
		6: {
			photos: [__WEBPACK_IMPORTED_MODULE_4__image_material4_png___default.a, __WEBPACK_IMPORTED_MODULE_1__image_material1_png___default.a, __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_2__image_material2_png___default.a],
			classNameId: 6,
			type: 'onyx'
		}
	},

	selectedMaterial: {
		photos: [__WEBPACK_IMPORTED_MODULE_1__image_material1_png___default.a, __WEBPACK_IMPORTED_MODULE_2__image_material2_png___default.a, __WEBPACK_IMPORTED_MODULE_3__image_material3_png___default.a, __WEBPACK_IMPORTED_MODULE_4__image_material4_png___default.a, __WEBPACK_IMPORTED_MODULE_5__image_material5_png___default.a],
		classNameId: 1,
		type: 'marble'
	}
};

function selectMaterial(state = getInitialState, action) {

	switch (action.type) {
		case __WEBPACK_IMPORTED_MODULE_0__constants_product__["a" /* SELECT_MATERIAL */]:
			return _extends({}, state, {
				selectedMaterial: state.optionsMaterials[action.payload]
			});
	}
	return state;
}

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runtime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function runtime(state = {}, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* SET_RUNTIME_VARIABLE */]:
      return _extends({}, state, {
        [action.payload.name]: action.payload.value
      });
    default:
      return state;
  }
}

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = user;
function user(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_universal_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(68);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_universal_router___default.a(__WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */]));

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Catalog_scss__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Catalog_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Catalog_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Feedback_Feedback__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Header_Header__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_AboutUs__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_DescriptionProduct_DescriptionProduct__ = __webpack_require__(32);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/routes/catalog/Catalog.js';











class Contact extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_Header_Header__["a" /* default */], { active: 'true', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                },
                __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_DescriptionProduct_DescriptionProduct__["a" /* default */], {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                },
                __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_AboutUs__["a" /* default */], {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                },
                __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Feedback_Feedback__["a" /* default */], {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                },
                __self: this
            })
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Catalog_scss___default.a)(Contact));

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Catalog__ = __webpack_require__(63);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/routes/catalog/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Catalog';

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/catalog',

  action() {
    return {
      title,
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Catalog__["a" /* default */], { title: title, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/routes/error/ErrorPage.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class ErrorPage extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    if (true) {
      const { error } = this.props;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            },
            __self: this
          },
          error.name
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: this
          },
          error.message
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'pre',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            },
            __self: this
          },
          error.stack
        )
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        },
        'Error'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          },
          __self: this
        },
        'Sorry, a critical error occurred on this page.'
      )
    );
  }
}

ErrorPage.propTypes = {
  error: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    stack: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired
};

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default.a)(ErrorPage));

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_apollo__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Home_css__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Home_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_catalogProduct_products__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Feedback_Feedback__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Header_Header__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Projects_Projects__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Information__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_AboutUs__ = __webpack_require__(30);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/routes/home/Home.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






//import newsQuery from './news.graphql';







class Home extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_Header_Header__["a" /* default */], { active: '', __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__components_Information__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_catalogProduct_products__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__components_AboutUs__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_Projects_Projects__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_Feedback_Feedback__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      })
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Home_css___default.a)(Home));

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(11);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/routes/home/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/',

  action() {
    return {
      title: 'Majsternia',
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Home__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
/* harmony default export */ __webpack_exports__["a"] = ({

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [__webpack_require__(67).default, __webpack_require__(64).default,

  // Wildcard routes, e.g. { path: '*', ... } (must go last)
  __webpack_require__(70).default],

  action({ next }) {
    return _asyncToGenerator(function* () {
      // Execute each child route until one of them return the result
      const route = yield next();

      // Provide default values for title, description etc.
      route.title = `${route.title || 'Untitled'}`;
      route.description = route.description || '';

      return route;
    })();
  }

});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotFound_css__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotFound_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__NotFound_css__);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/routes/notFound/NotFound.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class NotFound extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__NotFound_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__NotFound_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: this
          },
          this.props.title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          'Sorry, the page you were trying to view does not exist.'
        )
      )
    );
  }
}

NotFound.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__NotFound_css___default.a)(NotFound));

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NotFound__ = __webpack_require__(69);
var _jsxFileName = '/home/yura/root-react/react_start-master/src/routes/notFound/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Page Not Found';

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '*',

  action() {
    return {
      title,
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__NotFound__["a" /* default */], { title: title, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        })
      ),
      status: 404
    };
  }

});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_intl_locales_supported__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_intl_locales_supported___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_intl_locales_supported__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config__);




if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!__WEBPACK_IMPORTED_MODULE_0_intl_locales_supported___default()(__WEBPACK_IMPORTED_MODULE_1__config__["locales"])) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    const IntlPolyfill = __webpack_require__(22); // eslint-disable-line global-require

    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = __webpack_require__(22); // eslint-disable-line global-require
}

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createHelpers__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger__ = __webpack_require__(74);






function configureStore(initialState, config) {
  const helpers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__createHelpers__["a" /* default */])(config);
  const { apolloClient } = config;

  const middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a.withExtraArgument(helpers), apolloClient.middleware()];

  let enhancer;

  if (true) {
    middleware.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__logger__["a" /* default */])());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (false) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(...middleware), devToolsExtension);
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const rootReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__reducers__["a" /* default */])({
    apolloClient
  });

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (false) {
    module.hot.accept('../reducers', () =>
    // Don't forget to remove `()` if you change reducers back to normal rootReducer.
    // eslint-disable-next-line global-require
    store.replaceReducer(require('../reducers').default({ apolloClient })));
  }

  return store;
}

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHelpers;
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const graphqlRequestDeprecatedMessage = `\`graphqlRequest\` has been deprecated.
You should use Apollo: \`client.query({ query, variables...})\` or \`client.mutate()\`
Don't forget to enclose your query to gql\`…\` tag or import *.graphql file.
See docs at http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient\\.query`;

function createGraphqlRequest(apolloClient) {
  return (() => {
    var _ref = _asyncToGenerator(function* (queryOrString, variables, options = {}) {
      if (true) {
        // eslint-disable-next-line no-console
        console.error(graphqlRequestDeprecatedMessage);
      }

      const { skipCache } = options;
      let query = queryOrString;
      if (typeof queryOrString === 'string') {
        const gql = yield new Promise(function(resolve) { resolve(); }).then((function (require) {
          return __webpack_require__(123);
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        query = gql([queryOrString]);
      }

      if (skipCache) {
        return apolloClient.networkInterface.query({ query, variables });
      }

      let isMutation = false;
      if (query.definitions) {
        isMutation = query.definitions.some(function (definition) {
          return definition && definition.operation === 'mutation';
        });
      }
      if (isMutation) {
        return apolloClient.mutate({ mutation: query, variables });
      }
      return apolloClient.query({ query, variables });
    });

    function graphqlRequest(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return graphqlRequest;
  })();
}

function createHelpers({ apolloClient, fetch, history }) {
  return {
    client: apolloClient,
    history,
    fetch,
    // @deprecated('Use `client` instead')
    apolloClient,
    // @deprecated('Use `client.query()` or `client.mutate()` instead')
    graphqlRequest: createGraphqlRequest(fetch)
  };
}

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createLogger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);


function inspectObject(object) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_util__["inspect"])(object, {
    colors: true
  });
}

function singleLine(str) {
  return str.replace(/\s+/g, ' ');
}

const actionFormatters = {
  // This is used at feature/apollo branch, but it can help you when implementing Apollo
  APOLLO_QUERY_INIT: a => `queryId:${a.queryId} variables:${inspectObject(a.variables)}\n   ${singleLine(a.queryString)}`,

  APOLLO_QUERY_RESULT: a => `queryId:${a.queryId}\n   ${singleLine(inspectObject(a.result))}`,

  APOLLO_QUERY_STOP: a => `queryId:${a.queryId}`,

  SET_LOCALE_SUCCESS: a => `locale ${a.payload.locale}: ${Object.keys(a.payload.messages).length} messages`
};

// Server side redux action logger
function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    let formattedPayload = '';
    const actionFormatter = actionFormatters[action.type];
    if (typeof actionFormatter === 'function') {
      formattedPayload = actionFormatter(action);
    } else if (action.toString !== Object.prototype.toString) {
      formattedPayload = action.toString();
    } else if (typeof action.payload !== 'undefined') {
      formattedPayload = inspectObject(action.payload);
    } else {
      formattedPayload = inspectObject(action);
    }

    console.log(` * ${action.type}: ${formattedPayload}`); // eslint-disable-line no-console
    return next(action);
  };
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/routes/error/ErrorPage.css"],"names":[],"mappings":";;AAEA;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;CACd;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EACjB,iBAAiB;CAClB;;AAED;EACE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;CACF","file":"ErrorPage.css","sourcesContent":["\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.Home-root-1avl7 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Home-container-3YPN- {\n  margin: 0 auto;\n  padding: 0 0 40px;\n}\n\n.Home-newsItem--EKGZ {\n  margin: 0 0 32px;\n  margin: 0 0 2rem;\n}\n\n.Home-newsTitle-3GwAp {\n  font-size: 24px;\n  font-size: 1.5rem;\n}\n\n.Home-newsDesc-107uo h1,\n  .Home-newsDesc-107uo h2,\n  .Home-newsDesc-107uo h3,\n  .Home-newsDesc-107uo h4,\n  .Home-newsDesc-107uo h5,\n  .Home-newsDesc-107uo h6 {\n    font-size: 18px;\n    font-size: 1.125rem;\n  }\n\n.Home-newsDesc-107uo pre {\n    white-space: pre-wrap;\n    font-size: 14px;\n    font-size: 0.875rem;\n  }\n\n.Home-newsDesc-107uo img {\n    max-width: 100%;\n  }\n\n.Home-publishedDate-2WUi2 {\n  font-size: 0.8em;\n  color: #777;\n}\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/routes/home/Home.css"],"names":[],"mappings":";AACA;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;CACnB;;AAED;EACE,iBAAiB;EACjB,iBAAiB;CAClB;;AAED;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;;;;;;IAMI,gBAAgB;IAChB,oBAAoB;GACrB;;AAEH;IACI,sBAAsB;IACtB,gBAAgB;IAChB,oBAAoB;GACrB;;AAEH;IACI,gBAAgB;GACjB;;AAEH;EACE,iBAAiB;EACjB,YAAY;CACb","file":"Home.css","sourcesContent":["\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n}\n\n.newsItem {\n  margin: 0 0 32px;\n  margin: 0 0 2rem;\n}\n\n.newsTitle {\n  font-size: 24px;\n  font-size: 1.5rem;\n}\n\n.newsDesc h1,\n  .newsDesc h2,\n  .newsDesc h3,\n  .newsDesc h4,\n  .newsDesc h5,\n  .newsDesc h6 {\n    font-size: 18px;\n    font-size: 1.125rem;\n  }\n\n.newsDesc pre {\n    white-space: pre-wrap;\n    font-size: 14px;\n    font-size: 0.875rem;\n  }\n\n.newsDesc img {\n    max-width: 100%;\n  }\n\n.publishedDate {\n  font-size: 0.8em;\n  color: #777;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Home-root-1avl7",
	"container": "Home-container-3YPN-",
	"newsItem": "Home-newsItem--EKGZ",
	"newsTitle": "Home-newsTitle-3GwAp",
	"newsDesc": "Home-newsDesc-107uo",
	"publishedDate": "Home-publishedDate-2WUi2"
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"NotFound.css","sourceRoot":""}]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:500);", ""]);

// module
exports.push([module.i, ".AboutUs-container-N1DVw {\n  display: flex;\n  justify-content: center;\n  margin: 4rem 0;\n  flex-wrap: wrap; }\n  .AboutUs-container-N1DVw .AboutUs-image-2n_E7 {\n    padding-right: 2rem; }\n    .AboutUs-container-N1DVw .AboutUs-image-2n_E7 img {\n      width: 24rem; }\n  .AboutUs-container-N1DVw .AboutUs-title-3boPr {\n    font-size: 2.5rem;\n    font-weight: bold;\n    line-height: 1.25;\n    margin: 2rem 0;\n    color: #4F4F4F; }\n  .AboutUs-container-N1DVw .AboutUs-text-3V5Ib {\n    display: flex;\n    flex-direction: column;\n    margin-bottom: 2rem; }\n    .AboutUs-container-N1DVw .AboutUs-text-3V5Ib p {\n      margin-bottom: 1rem;\n      font-family: \"Roboto\", sans-serif;\n      color: #000000;\n      line-height: 142%;\n      max-width: 37rem; }\n  .AboutUs-container-N1DVw .AboutUs-btn-bwLmM {\n    display: flex; }\n    .AboutUs-container-N1DVw .AboutUs-btn-bwLmM ul {\n      display: flex; }\n      .AboutUs-container-N1DVw .AboutUs-btn-bwLmM ul li {\n        margin-right: 2rem; }\n        .AboutUs-container-N1DVw .AboutUs-btn-bwLmM ul li .AboutUs-text-3V5Ib {\n          width: 100%;\n          color: #3C3C43;\n          font-size: 1.125rem;\n          line-height: 34px;\n          padding-bottom: 3px;\n          font-family: \"Roboto\", sans-serif;\n          border-bottom: 2px solid #3C3C43; }\n          .AboutUs-container-N1DVw .AboutUs-btn-bwLmM ul li .AboutUs-text-3V5Ib:hover {\n            opacity: 0.75; }\n\n@media (max-width: 1000px) {\n  .AboutUs-image-2n_E7 {\n    padding-right: 0 !important; }\n  .AboutUs-text-3V5Ib p {\n    margin-right: 0; } }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/AboutUs/AboutUs.scss"],"names":[],"mappings":"AACA;EACE,cAAc;EACd,wBAAwB;EACxB,eAAe;EACf,gBAAgB,EAAE;EAClB;IACE,oBAAoB,EAAE;IACtB;MACE,aAAa,EAAE;EACnB;IACE,kBAAkB;IAClB,kBAAkB;IAClB,kBAAkB;IAClB,eAAe;IACf,eAAe,EAAE;EACnB;IACE,cAAc;IACd,uBAAuB;IACvB,oBAAoB,EAAE;IACtB;MACE,oBAAoB;MACpB,kCAAkC;MAClC,eAAe;MACf,kBAAkB;MAClB,iBAAiB,EAAE;EACvB;IACE,cAAc,EAAE;IAChB;MACE,cAAc,EAAE;MAChB;QACE,mBAAmB,EAAE;QACrB;UACE,YAAY;UACZ,eAAe;UACf,oBAAoB;UACpB,kBAAkB;UAClB,oBAAoB;UACpB,kCAAkC;UAClC,iCAAiC,EAAE;UACnC;YACE,cAAc,EAAE;;AAE5B;EACE;IACE,4BAA4B,EAAE;EAChC;IACE,gBAAgB,EAAE,EAAE","file":"AboutUs.scss","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Roboto:500\");\n.container {\n  display: flex;\n  justify-content: center;\n  margin: 4rem 0;\n  flex-wrap: wrap; }\n  .container .image {\n    padding-right: 2rem; }\n    .container .image img {\n      width: 24rem; }\n  .container .title {\n    font-size: 2.5rem;\n    font-weight: bold;\n    line-height: 1.25;\n    margin: 2rem 0;\n    color: #4F4F4F; }\n  .container .text {\n    display: flex;\n    flex-direction: column;\n    margin-bottom: 2rem; }\n    .container .text p {\n      margin-bottom: 1rem;\n      font-family: \"Roboto\", sans-serif;\n      color: #000000;\n      line-height: 142%;\n      max-width: 37rem; }\n  .container .btn {\n    display: flex; }\n    .container .btn ul {\n      display: flex; }\n      .container .btn ul li {\n        margin-right: 2rem; }\n        .container .btn ul li .text {\n          width: 100%;\n          color: #3C3C43;\n          font-size: 1.125rem;\n          line-height: 34px;\n          padding-bottom: 3px;\n          font-family: \"Roboto\", sans-serif;\n          border-bottom: 2px solid #3C3C43; }\n          .container .btn ul li .text:hover {\n            opacity: 0.75; }\n\n@media (max-width: 1000px) {\n  .image {\n    padding-right: 0 !important; }\n  .text p {\n    margin-right: 0; } }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "AboutUs-container-N1DVw",
	"image": "AboutUs-image-2n_E7",
	"title": "AboutUs-title-3boPr",
	"text": "AboutUs-text-3V5Ib",
	"btn": "AboutUs-btn-bwLmM"
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic);", ""]);

// module
exports.push([module.i, ".DescriptionProduct-title-1x84J {\n  font-size: 2.5rem;\n  line-height: 1.25;\n  padding-bottom: 40px;\n  color: #4F4F4F;\n  font-family: 'Lora', serif;\n  font-weight: bold; }\n\n.DescriptionProduct-name-_OzCT {\n  font-size: 24px;\n  line-height: 1.33;\n  color: #3C3C43;\n  min-width: 288px;\n  max-width: 300px;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 400; }\n\n.DescriptionProduct-item-2y7sx {\n  margin-bottom: 80px;\n  display: flex; }\n\n.DescriptionProduct-products-oO2zP {\n  padding: 0px 41px 0 64px;\n  margin-top: 55px; }\n\n.DescriptionProduct-materials-1xS8T {\n  display: flex;\n  font-size: 16px;\n  line-height: 2;\n  color: #3C3C43;\n  padding: 20px 0 30px 0;\n  width: 100%; }\n\n.DescriptionProduct-parametr-QH9jF {\n  margin-right: 24px;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 600; }\n\n.DescriptionProduct-material-p6rBN {\n  margin-right: 8px;\n  cursor: pointer;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 600; }\n  .DescriptionProduct-material-p6rBN:hover {\n    color: #F76868; }\n\n.DescriptionProduct-select-1E2rU {\n  color: #F76868; }\n\n.DescriptionProduct-photos-ljFq4 {\n  display: flex; }\n\n.DescriptionProduct-photo_wrap-2m_YD {\n  padding-top: 40px;\n  margin-top: 16px;\n  border-top: 2px solid #747880;\n  margin-left: 45px;\n  display: flex;\n  width: 100%;\n  max-width: 880px;\n  justify-content: space-between; }\n  .DescriptionProduct-photo_wrap-2m_YD > * {\n    min-width: 250px;\n    max-width: 28333.33333%;\n    height: auto;\n    margin-right: 15px; }\n    .DescriptionProduct-photo_wrap-2m_YD > *:last-child {\n      margin-right: 0; }\n\n.DescriptionProduct-item_wrap-1jtC8 {\n  margin-top: 16px;\n  border-top: 2px solid #747880;\n  margin-left: 45px; }\n\n@media (max-width: 1000px) {\n  .DescriptionProduct-item-2y7sx {\n    flex-wrap: wrap;\n    width: 320px;\n    justify-content: center; }\n    .DescriptionProduct-item-2y7sx:first-child {\n      border: none; } }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/DescriptionProduct/DescriptionProduct.scss"],"names":[],"mappings":"AACA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,qBAAqB;EACrB,eAAe;EACf,2BAA2B;EAC3B,kBAAkB,EAAE;;AAEtB;EACE,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,iBAAiB;EACjB,qCAAqC;EACrC,iBAAiB,EAAE;;AAErB;EACE,oBAAoB;EACpB,cAAc,EAAE;;AAElB;EACE,yBAAyB;EACzB,iBAAiB,EAAE;;AAErB;EACE,cAAc;EACd,gBAAgB;EAChB,eAAe;EACf,eAAe;EACf,uBAAuB;EACvB,YAAY,EAAE;;AAEhB;EACE,mBAAmB;EACnB,qCAAqC;EACrC,iBAAiB,EAAE;;AAErB;EACE,kBAAkB;EAClB,gBAAgB;EAChB,qCAAqC;EACrC,iBAAiB,EAAE;EACnB;IACE,eAAe,EAAE;;AAErB;EACE,eAAe,EAAE;;AAEnB;EACE,cAAc,EAAE;;AAElB;EACE,kBAAkB;EAClB,iBAAiB;EACjB,8BAA8B;EAC9B,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,iBAAiB;EACjB,+BAA+B,EAAE;EACjC;IACE,iBAAiB;IACjB,wBAAwB;IACxB,aAAa;IACb,mBAAmB,EAAE;IACrB;MACE,gBAAgB,EAAE;;AAExB;EACE,iBAAiB;EACjB,8BAA8B;EAC9B,kBAAkB,EAAE;;AAEtB;EACE;IACE,gBAAgB;IAChB,aAAa;IACb,wBAAwB,EAAE;IAC1B;MACE,aAAa,EAAE,EAAE","file":"DescriptionProduct.scss","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Open+Sans:400,600&subset=cyrillic\");\n.title {\n  font-size: 2.5rem;\n  line-height: 1.25;\n  padding-bottom: 40px;\n  color: #4F4F4F;\n  font-family: 'Lora', serif;\n  font-weight: bold; }\n\n.name {\n  font-size: 24px;\n  line-height: 1.33;\n  color: #3C3C43;\n  min-width: 288px;\n  max-width: 300px;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 400; }\n\n.item {\n  margin-bottom: 80px;\n  display: flex; }\n\n.products {\n  padding: 0px 41px 0 64px;\n  margin-top: 55px; }\n\n.materials {\n  display: flex;\n  font-size: 16px;\n  line-height: 2;\n  color: #3C3C43;\n  padding: 20px 0 30px 0;\n  width: 100%; }\n\n.parametr {\n  margin-right: 24px;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 600; }\n\n.material {\n  margin-right: 8px;\n  cursor: pointer;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 600; }\n  .material:hover {\n    color: #F76868; }\n\n.select {\n  color: #F76868; }\n\n.photos {\n  display: flex; }\n\n.photo_wrap {\n  padding-top: 40px;\n  margin-top: 16px;\n  border-top: 2px solid #747880;\n  margin-left: 45px;\n  display: flex;\n  width: 100%;\n  max-width: 880px;\n  justify-content: space-between; }\n  .photo_wrap > * {\n    min-width: 250px;\n    max-width: 28333.33333%;\n    height: auto;\n    margin-right: 15px; }\n    .photo_wrap > *:last-child {\n      margin-right: 0; }\n\n.item_wrap {\n  margin-top: 16px;\n  border-top: 2px solid #747880;\n  margin-left: 45px; }\n\n@media (max-width: 1000px) {\n  .item {\n    flex-wrap: wrap;\n    width: 320px;\n    justify-content: center; }\n    .item:first-child {\n      border: none; } }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"title": "DescriptionProduct-title-1x84J",
	"name": "DescriptionProduct-name-_OzCT",
	"item": "DescriptionProduct-item-2y7sx",
	"products": "DescriptionProduct-products-oO2zP",
	"materials": "DescriptionProduct-materials-1xS8T",
	"parametr": "DescriptionProduct-parametr-QH9jF",
	"material": "DescriptionProduct-material-p6rBN",
	"select": "DescriptionProduct-select-1E2rU",
	"photos": "DescriptionProduct-photos-ljFq4",
	"photo_wrap": "DescriptionProduct-photo_wrap-2m_YD",
	"item_wrap": "DescriptionProduct-item_wrap-1jtC8"
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n.Feedback-root-LW7n6 {\n  width: 77.51994%;\n  margin: 0 auto;\n  min-width: 320px; }\n\n.Feedback-container-3dVJ8 {\n  text-align: center;\n  margin-bottom: 4rem; }\n\n.Feedback-title-2zNW3 {\n  font-family: 'Lora', sans-serif;\n  font-weight: bold;\n  font-size: 2rem;\n  line-height: 1.5; }\n\n.Feedback-text-3IV5h {\n  margin-top: 16px;\n  margin-bottom: 40px;\n  font-size: 1.25rem;\n  font-family: 'Roboto';\n  line-height: 1.42;\n  color: #000000; }\n\n.Feedback-form-3cEWi {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n  .Feedback-form-3cEWi > * {\n    margin-bottom: 10px;\n    width: 46.49205%;\n    min-width: 320px; }\n\n.Feedback-name-3dlpJ, .Feedback-tel-2rH_2, .Feedback-mail-28zJV {\n  height: 57px;\n  border: 2px solid #3C3C43;\n  line-height: 53px;\n  color: #4F4F4F;\n  font-size: 20px; }\n  .Feedback-name-3dlpJ[placeholder], .Feedback-tel-2rH_2[placeholder], .Feedback-mail-28zJV[placeholder] {\n    color: #4F4F4F;\n    font-size: 20px;\n    padding-left: 24px; }\n\n.Feedback-quetions-2dm6n {\n  height: 121px;\n  color: #4F4F4F;\n  font-size: 20px;\n  border: 2px solid #3C3C43; }\n  .Feedback-quetions-2dm6n[placeholder] {\n    padding-left: 24px;\n    line-height: 24px;\n    padding-top: 16px;\n    color: #4F4F4F;\n    font-size: 20px; }\n\n.Feedback-submit-3jJ8w {\n  text-align: center;\n  height: 51px;\n  background: #3C3C43;\n  color: #fff;\n  cursor: pointer;\n  line-height: 51px;\n  font-size: 20px; }\n  .Feedback-submit-3jJ8w:hover {\n    opacity: 0.7; }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/Feedback/Feedback.scss"],"names":[],"mappings":"AAAA,iBAAiB;AACjB;;;;;;;GAOG;AACH;EACE,iBAAiB;EACjB,eAAe;EACf,iBAAiB,EAAE;;AAErB;EACE,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,gCAAgC;EAChC,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB,EAAE;;AAErB;EACE,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,sBAAsB;EACtB,kBAAkB;EAClB,eAAe,EAAE;;AAEnB;EACE,cAAc;EACd,uBAAuB;EACvB,wBAAwB;EACxB,oBAAoB,EAAE;EACtB;IACE,oBAAoB;IACpB,iBAAiB;IACjB,iBAAiB,EAAE;;AAEvB;EACE,aAAa;EACb,0BAA0B;EAC1B,kBAAkB;EAClB,eAAe;EACf,gBAAgB,EAAE;EAClB;IACE,eAAe;IACf,gBAAgB;IAChB,mBAAmB,EAAE;;AAEzB;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,0BAA0B,EAAE;EAC5B;IACE,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;IAClB,eAAe;IACf,gBAAgB,EAAE;;AAEtB;EACE,mBAAmB;EACnB,aAAa;EACb,oBAAoB;EACpB,YAAY;EACZ,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB,EAAE;EAClB;IACE,aAAa,EAAE","file":"Feedback.scss","sourcesContent":["@charset \"UTF-8\";\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n.root {\n  width: 77.51994%;\n  margin: 0 auto;\n  min-width: 320px; }\n\n.container {\n  text-align: center;\n  margin-bottom: 4rem; }\n\n.title {\n  font-family: 'Lora', sans-serif;\n  font-weight: bold;\n  font-size: 2rem;\n  line-height: 1.5; }\n\n.text {\n  margin-top: 16px;\n  margin-bottom: 40px;\n  font-size: 1.25rem;\n  font-family: 'Roboto';\n  line-height: 1.42;\n  color: #000000; }\n\n.form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n  .form > * {\n    margin-bottom: 10px;\n    width: 46.49205%;\n    min-width: 320px; }\n\n.name, .tel, .mail {\n  height: 57px;\n  border: 2px solid #3C3C43;\n  line-height: 53px;\n  color: #4F4F4F;\n  font-size: 20px; }\n  .name[placeholder], .tel[placeholder], .mail[placeholder] {\n    color: #4F4F4F;\n    font-size: 20px;\n    padding-left: 24px; }\n\n.quetions {\n  height: 121px;\n  color: #4F4F4F;\n  font-size: 20px;\n  border: 2px solid #3C3C43; }\n  .quetions[placeholder] {\n    padding-left: 24px;\n    line-height: 24px;\n    padding-top: 16px;\n    color: #4F4F4F;\n    font-size: 20px; }\n\n.submit {\n  text-align: center;\n  height: 51px;\n  background: #3C3C43;\n  color: #fff;\n  cursor: pointer;\n  line-height: 51px;\n  font-size: 20px; }\n  .submit:hover {\n    opacity: 0.7; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Feedback-root-LW7n6",
	"container": "Feedback-container-3dVJ8",
	"title": "Feedback-title-2zNW3",
	"text": "Feedback-text-3IV5h",
	"form": "Feedback-form-3cEWi",
	"name": "Feedback-name-3dlpJ",
	"tel": "Feedback-tel-2rH_2",
	"mail": "Feedback-mail-28zJV",
	"quetions": "Feedback-quetions-2dm6n",
	"submit": "Feedback-submit-3jJ8w"
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, ".Footer-container-26pKB {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 4rem; }\n  .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE {\n    padding: 0 1.5rem; }\n    .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-head-3FsYg {\n      display: flex;\n      align-items: center;\n      margin: 1rem 0; }\n      .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-head-3FsYg .Footer-logo-1W3uT {\n        width: 2rem;\n        margin-right: 1rem; }\n      .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-head-3FsYg .Footer-info-1s2xc {\n        display: flex;\n        flex-direction: column; }\n        .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-head-3FsYg .Footer-info-1s2xc .Footer-mainTitle-1XtOH {\n          font-family: 'Lora', serif;\n          font-weight: bold;\n          font-size: 2rem;\n          margin-bottom: 1rem; }\n        .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-head-3FsYg .Footer-info-1s2xc .Footer-phoneNumber-H_xls {\n          font-family: 'Lora', serif;\n          font-size: 1.25rem;\n          margin-bottom: 0.5rem; }\n    .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-nav-36Xgk {\n      margin-bottom: 3rem; }\n      .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-nav-36Xgk li .Footer-text-tTplm {\n        width: 100%;\n        color: #3C3C43;\n        font-size: 1.125rem;\n        line-height: 34px;\n        padding-bottom: 3px;\n        border-bottom: 2px solid #3C3C43;\n        font-family: \"Roboto\", sans-serif;\n        cursor: pointer; }\n        .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-nav-36Xgk li .Footer-text-tTplm:hover {\n          opacity: 0.75; }\n    .Footer-container-26pKB .Footer-contact-2635i .Footer-about-3RFFE .Footer-nav-36Xgk > * {\n      width: 100%; }\n\n.Footer-listItems-kuSRP {\n  margin-bottom: 1rem; }\n\n.Footer-frame-pIsQm {\n  width: 622px;\n  height: 320px;\n  border: 0; }\n\n@media (max-width: 1000px) {\n  .Footer-frame-pIsQm {\n    display: none; } }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/Footer/Footer.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,oBAAoB;EACpB,wBAAwB;EACxB,oBAAoB,EAAE;EACtB;IACE,kBAAkB,EAAE;IACpB;MACE,cAAc;MACd,oBAAoB;MACpB,eAAe,EAAE;MACjB;QACE,YAAY;QACZ,mBAAmB,EAAE;MACvB;QACE,cAAc;QACd,uBAAuB,EAAE;QACzB;UACE,2BAA2B;UAC3B,kBAAkB;UAClB,gBAAgB;UAChB,oBAAoB,EAAE;QACxB;UACE,2BAA2B;UAC3B,mBAAmB;UACnB,sBAAsB,EAAE;IAC9B;MACE,oBAAoB,EAAE;MACtB;QACE,YAAY;QACZ,eAAe;QACf,oBAAoB;QACpB,kBAAkB;QAClB,oBAAoB;QACpB,iCAAiC;QACjC,kCAAkC;QAClC,gBAAgB,EAAE;QAClB;UACE,cAAc,EAAE;IACtB;MACE,YAAY,EAAE;;AAEpB;EACE,oBAAoB,EAAE;;AAExB;EACE,aAAa;EACb,cAAc;EACd,UAAU,EAAE;;AAEd;EACE;IACE,cAAc,EAAE,EAAE","file":"Footer.scss","sourcesContent":[".container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 4rem; }\n  .container .contact .about {\n    padding: 0 1.5rem; }\n    .container .contact .about .head {\n      display: flex;\n      align-items: center;\n      margin: 1rem 0; }\n      .container .contact .about .head .logo {\n        width: 2rem;\n        margin-right: 1rem; }\n      .container .contact .about .head .info {\n        display: flex;\n        flex-direction: column; }\n        .container .contact .about .head .info .mainTitle {\n          font-family: 'Lora', serif;\n          font-weight: bold;\n          font-size: 2rem;\n          margin-bottom: 1rem; }\n        .container .contact .about .head .info .phoneNumber {\n          font-family: 'Lora', serif;\n          font-size: 1.25rem;\n          margin-bottom: 0.5rem; }\n    .container .contact .about .nav {\n      margin-bottom: 3rem; }\n      .container .contact .about .nav li .text {\n        width: 100%;\n        color: #3C3C43;\n        font-size: 1.125rem;\n        line-height: 34px;\n        padding-bottom: 3px;\n        border-bottom: 2px solid #3C3C43;\n        font-family: \"Roboto\", sans-serif;\n        cursor: pointer; }\n        .container .contact .about .nav li .text:hover {\n          opacity: 0.75; }\n    .container .contact .about .nav > * {\n      width: 100%; }\n\n.listItems {\n  margin-bottom: 1rem; }\n\n.frame {\n  width: 622px;\n  height: 320px;\n  border: 0; }\n\n@media (max-width: 1000px) {\n  .frame {\n    display: none; } }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "Footer-container-26pKB",
	"contact": "Footer-contact-2635i",
	"about": "Footer-about-3RFFE",
	"head": "Footer-head-3FsYg",
	"logo": "Footer-logo-1W3uT",
	"info": "Footer-info-1s2xc",
	"mainTitle": "Footer-mainTitle-1XtOH",
	"phoneNumber": "Footer-phoneNumber-H_xls",
	"nav": "Footer-nav-36Xgk",
	"text": "Footer-text-tTplm",
	"listItems": "Footer-listItems-kuSRP",
	"frame": "Footer-frame-pIsQm"
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lora);", ""]);

// module
exports.push([module.i, ".Header-root-14IZ- {\n  background: #ffffff; }\n\n.Header-container-izfMl {\n  margin: 6rem 0;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center; }\n  .Header-container-izfMl .Header-outer-24WH8 {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center; }\n    .Header-container-izfMl .Header-outer-24WH8 .Header-logo-1AtfL {\n      width: 6rem;\n      margin-bottom: 2rem; }\n    .Header-container-izfMl .Header-outer-24WH8 .Header-mainTitle-IeX1y {\n      font-family: 'Lora', serif;\n      font-weight: bold;\n      font-size: 2rem; }\n\n.Header-brand-1-TOO {\n  text-decoration: none;\n  font-size: 1.75em;\n  /* ~28px */ }\n\n.Header-brandTxt-162t7 {\n  margin-left: 10px; }\n\n.Header-banner-UgCID {\n  text-align: center; }\n\n.Header-bannerTitle-3Qi2j {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em; }\n\n.Header-btn-1_7T_ {\n  font-family: \"Roboto\", sans-serif;\n  min-width: 264px;\n  background-color: #ffffff;\n  text-align: center;\n  height: 51px;\n  display: block;\n  line-height: 47px;\n  color: #3C3C43;\n  border: 2px solid #3C3C43;\n  font-size: 1.25rem;\n  margin-right: 50px; }\n  .Header-btn-1_7T_:hover {\n    background-color: #3C3C43;\n    color: #ffffff;\n    transition: ease-out 0.3s; }\n\n.Header-wrap-302yF {\n  display: flex;\n  height: 109px;\n  align-items: center;\n  justify-content: space-between;\n  margin: 0 41px 0 64px; }\n\n.Header-title-YtTHq {\n  font-family: 'Lora', serif;\n  font-weight: bold;\n  font-size: 2.25rem;\n  line-height: 47px; }\n\n.Header-contactsWrap-2cn-5 {\n  display: flex;\n  align-items: center; }\n\n.Header-contacts-gJIiO {\n  margin-right: 94px;\n  font-family: 'Roboto';\n  color: #4F4F4F; }\n\n.Header-phone-3lrZm {\n  line-height: 29px;\n  font-size: 1.5rem;\n  padding-bottom: 7px; }\n\n.Header-address-c8Rfb {\n  line-height: 19px;\n  font-size: 1rem; }\n\n.Header-langSwitch-3rIj- {\n  font-family: 'Roboto';\n  font-size: 1.125rem;\n  line-height: 22px;\n  color: #4F4F4F;\n  cursor: pointer; }\n  .Header-langSwitch-3rIj- .Header-active-1Z5Aq {\n    color: #747880; }\n\n@media (max-width: 1000px) {\n  .Header-wrap-302yF {\n    display: none; } }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/Header/Header.scss"],"names":[],"mappings":"AACA;EACE,oBAAoB,EAAE;;AAExB;EACE,eAAe;EACf,cAAc;EACd,wBAAwB;EACxB,uBAAuB;EACvB,oBAAoB,EAAE;EACtB;IACE,cAAc;IACd,uBAAuB;IACvB,wBAAwB;IACxB,oBAAoB,EAAE;IACtB;MACE,YAAY;MACZ,oBAAoB,EAAE;IACxB;MACE,2BAA2B;MAC3B,kBAAkB;MAClB,gBAAgB,EAAE;;AAExB;EACE,sBAAsB;EACtB,kBAAkB;EAClB,WAAW,EAAE;;AAEf;EACE,kBAAkB,EAAE;;AAEtB;EACE,mBAAmB,EAAE;;AAEvB;EACE,UAAU;EACV,cAAc;EACd,oBAAoB;EACpB,eAAe;EACf,iBAAiB,EAAE;;AAErB;EACE,kCAAkC;EAClC,iBAAiB;EACjB,0BAA0B;EAC1B,mBAAmB;EACnB,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,0BAA0B;EAC1B,mBAAmB;EACnB,mBAAmB,EAAE;EACrB;IACE,0BAA0B;IAC1B,eAAe;IACf,0BAA0B,EAAE;;AAEhC;EACE,cAAc;EACd,cAAc;EACd,oBAAoB;EACpB,+BAA+B;EAC/B,sBAAsB,EAAE;;AAE1B;EACE,2BAA2B;EAC3B,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB,EAAE;;AAEtB;EACE,cAAc;EACd,oBAAoB,EAAE;;AAExB;EACE,mBAAmB;EACnB,sBAAsB;EACtB,eAAe,EAAE;;AAEnB;EACE,kBAAkB;EAClB,kBAAkB;EAClB,oBAAoB,EAAE;;AAExB;EACE,kBAAkB;EAClB,gBAAgB,EAAE;;AAEpB;EACE,sBAAsB;EACtB,oBAAoB;EACpB,kBAAkB;EAClB,eAAe;EACf,gBAAgB,EAAE;EAClB;IACE,eAAe,EAAE;;AAErB;EACE;IACE,cAAc,EAAE,EAAE","file":"Header.scss","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Lora\");\n.root {\n  background: #ffffff; }\n\n.container {\n  margin: 6rem 0;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center; }\n  .container .outer {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center; }\n    .container .outer .logo {\n      width: 6rem;\n      margin-bottom: 2rem; }\n    .container .outer .mainTitle {\n      font-family: 'Lora', serif;\n      font-weight: bold;\n      font-size: 2rem; }\n\n.brand {\n  text-decoration: none;\n  font-size: 1.75em;\n  /* ~28px */ }\n\n.brandTxt {\n  margin-left: 10px; }\n\n.banner {\n  text-align: center; }\n\n.bannerTitle {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em; }\n\n.btn {\n  font-family: \"Roboto\", sans-serif;\n  min-width: 264px;\n  background-color: #ffffff;\n  text-align: center;\n  height: 51px;\n  display: block;\n  line-height: 47px;\n  color: #3C3C43;\n  border: 2px solid #3C3C43;\n  font-size: 1.25rem;\n  margin-right: 50px; }\n  .btn:hover {\n    background-color: #3C3C43;\n    color: #ffffff;\n    transition: ease-out 0.3s; }\n\n.wrap {\n  display: flex;\n  height: 109px;\n  align-items: center;\n  justify-content: space-between;\n  margin: 0 41px 0 64px; }\n\n.title {\n  font-family: 'Lora', serif;\n  font-weight: bold;\n  font-size: 2.25rem;\n  line-height: 47px; }\n\n.contactsWrap {\n  display: flex;\n  align-items: center; }\n\n.contacts {\n  margin-right: 94px;\n  font-family: 'Roboto';\n  color: #4F4F4F; }\n\n.phone {\n  line-height: 29px;\n  font-size: 1.5rem;\n  padding-bottom: 7px; }\n\n.address {\n  line-height: 19px;\n  font-size: 1rem; }\n\n.langSwitch {\n  font-family: 'Roboto';\n  font-size: 1.125rem;\n  line-height: 22px;\n  color: #4F4F4F;\n  cursor: pointer; }\n  .langSwitch .active {\n    color: #747880; }\n\n@media (max-width: 1000px) {\n  .wrap {\n    display: none; } }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Header-root-14IZ-",
	"container": "Header-container-izfMl",
	"outer": "Header-outer-24WH8",
	"logo": "Header-logo-1AtfL",
	"mainTitle": "Header-mainTitle-IeX1y",
	"brand": "Header-brand-1-TOO",
	"brandTxt": "Header-brandTxt-162t7",
	"banner": "Header-banner-UgCID",
	"bannerTitle": "Header-bannerTitle-3Qi2j",
	"btn": "Header-btn-1_7T_",
	"wrap": "Header-wrap-302yF",
	"title": "Header-title-YtTHq",
	"contactsWrap": "Header-contactsWrap-2cn-5",
	"contacts": "Header-contacts-gJIiO",
	"phone": "Header-phone-3lrZm",
	"address": "Header-address-c8Rfb",
	"langSwitch": "Header-langSwitch-3rIj-",
	"active": "Header-active-1Z5Aq"
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, ".Information-container-2LBGm {\n  display: flex;\n  margin: 0 auto;\n  justify-content: center;\n  margin-bottom: 120px; }\n  .Information-container-2LBGm .Information-leftBar-OP044 {\n    display: flex;\n    flex-direction: column;\n    margin-right: 1rem;\n    justify-content: space-between; }\n    .Information-container-2LBGm .Information-leftBar-OP044 .Information-title-T4zfz {\n      background-color: #F9F0DD;\n      text-align: center;\n      margin-bottom: 1rem; }\n      .Information-container-2LBGm .Information-leftBar-OP044 .Information-title-T4zfz .Information-advert-bwcK- {\n        padding: 6rem 4rem;\n        max-width: 40rem;\n        font-size: 2.5rem;\n        font-weight: bold; }\n    .Information-container-2LBGm .Information-leftBar-OP044 .Information-downBar-1V4v7 {\n      align-self: flex-end; }\n      .Information-container-2LBGm .Information-leftBar-OP044 .Information-downBar-1V4v7 .Information-btn-Ha0RD {\n        font-family: \"Roboto\", sans-serif;\n        width: 80%;\n        min-width: 240px;\n        background-color: #ffffff;\n        text-align: center;\n        height: 53px;\n        display: block;\n        line-height: 49px;\n        color: #3C3C43;\n        border: 2px solid #3C3C43;\n        font-size: 1.125rem; }\n      .Information-container-2LBGm .Information-leftBar-OP044 .Information-downBar-1V4v7 .Information-btn-Ha0RD:hover {\n        background-color: #3C3C43;\n        color: #ffffff;\n        transition: ease-out 0.3s; }\n  .Information-container-2LBGm .Information-about-1No3A {\n    border: 0.1rem solid #4f4f4f;\n    padding: 0 1.5rem; }\n    .Information-container-2LBGm .Information-about-1No3A .Information-head-2_5pM {\n      display: flex;\n      align-items: center;\n      margin: 3rem 0; }\n      .Information-container-2LBGm .Information-about-1No3A .Information-head-2_5pM .Information-logo-2OGND {\n        width: 2rem;\n        margin-right: 1rem; }\n      .Information-container-2LBGm .Information-about-1No3A .Information-head-2_5pM .Information-info-ib3r5 {\n        display: flex;\n        flex-direction: column; }\n        .Information-container-2LBGm .Information-about-1No3A .Information-head-2_5pM .Information-info-ib3r5 .Information-mainTitle-dBV1M {\n          font-family: 'Lora', serif;\n          font-weight: bold;\n          font-size: 2rem;\n          margin-bottom: 1rem; }\n        .Information-container-2LBGm .Information-about-1No3A .Information-head-2_5pM .Information-info-ib3r5 .Information-phoneNumber-3u2K8 {\n          font-family: 'Lora', serif;\n          font-size: 1.25rem;\n          margin-bottom: 0.5rem; }\n    .Information-container-2LBGm .Information-about-1No3A .Information-nav-3Sboq {\n      margin-bottom: 3rem; }\n      .Information-container-2LBGm .Information-about-1No3A .Information-nav-3Sboq li .Information-text-UhviD {\n        width: 100%;\n        color: #3C3C43;\n        font-size: 1.125rem;\n        cursor: pointer;\n        line-height: 34px;\n        padding-bottom: 3px;\n        border-bottom: 2px solid #3C3C43;\n        font-family: \"Roboto\", sans-serif; }\n        .Information-container-2LBGm .Information-about-1No3A .Information-nav-3Sboq li .Information-text-UhviD:hover {\n          opacity: 0.75; }\n    .Information-container-2LBGm .Information-about-1No3A .Information-nav-3Sboq > * {\n      width: 100%; }\n\n.Information-listItems-3PM1n {\n  margin-bottom: 1rem; }\n\n@media (max-width: 1000px) {\n  .Information-about-1No3A {\n    display: none; } }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/Information/Information.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,eAAe;EACf,wBAAwB;EACxB,qBAAqB,EAAE;EACvB;IACE,cAAc;IACd,uBAAuB;IACvB,mBAAmB;IACnB,+BAA+B,EAAE;IACjC;MACE,0BAA0B;MAC1B,mBAAmB;MACnB,oBAAoB,EAAE;MACtB;QACE,mBAAmB;QACnB,iBAAiB;QACjB,kBAAkB;QAClB,kBAAkB,EAAE;IACxB;MACE,qBAAqB,EAAE;MACvB;QACE,kCAAkC;QAClC,WAAW;QACX,iBAAiB;QACjB,0BAA0B;QAC1B,mBAAmB;QACnB,aAAa;QACb,eAAe;QACf,kBAAkB;QAClB,eAAe;QACf,0BAA0B;QAC1B,oBAAoB,EAAE;MACxB;QACE,0BAA0B;QAC1B,eAAe;QACf,0BAA0B,EAAE;EAClC;IACE,6BAA6B;IAC7B,kBAAkB,EAAE;IACpB;MACE,cAAc;MACd,oBAAoB;MACpB,eAAe,EAAE;MACjB;QACE,YAAY;QACZ,mBAAmB,EAAE;MACvB;QACE,cAAc;QACd,uBAAuB,EAAE;QACzB;UACE,2BAA2B;UAC3B,kBAAkB;UAClB,gBAAgB;UAChB,oBAAoB,EAAE;QACxB;UACE,2BAA2B;UAC3B,mBAAmB;UACnB,sBAAsB,EAAE;IAC9B;MACE,oBAAoB,EAAE;MACtB;QACE,YAAY;QACZ,eAAe;QACf,oBAAoB;QACpB,gBAAgB;QAChB,kBAAkB;QAClB,oBAAoB;QACpB,iCAAiC;QACjC,kCAAkC,EAAE;QACpC;UACE,cAAc,EAAE;IACtB;MACE,YAAY,EAAE;;AAEpB;EACE,oBAAoB,EAAE;;AAExB;EACE;IACE,cAAc,EAAE,EAAE","file":"Information.scss","sourcesContent":[".container {\n  display: flex;\n  margin: 0 auto;\n  justify-content: center;\n  margin-bottom: 120px; }\n  .container .leftBar {\n    display: flex;\n    flex-direction: column;\n    margin-right: 1rem;\n    justify-content: space-between; }\n    .container .leftBar .title {\n      background-color: #F9F0DD;\n      text-align: center;\n      margin-bottom: 1rem; }\n      .container .leftBar .title .advert {\n        padding: 6rem 4rem;\n        max-width: 40rem;\n        font-size: 2.5rem;\n        font-weight: bold; }\n    .container .leftBar .downBar {\n      align-self: flex-end; }\n      .container .leftBar .downBar .btn {\n        font-family: \"Roboto\", sans-serif;\n        width: 80%;\n        min-width: 240px;\n        background-color: #ffffff;\n        text-align: center;\n        height: 53px;\n        display: block;\n        line-height: 49px;\n        color: #3C3C43;\n        border: 2px solid #3C3C43;\n        font-size: 1.125rem; }\n      .container .leftBar .downBar .btn:hover {\n        background-color: #3C3C43;\n        color: #ffffff;\n        transition: ease-out 0.3s; }\n  .container .about {\n    border: 0.1rem solid #4f4f4f;\n    padding: 0 1.5rem; }\n    .container .about .head {\n      display: flex;\n      align-items: center;\n      margin: 3rem 0; }\n      .container .about .head .logo {\n        width: 2rem;\n        margin-right: 1rem; }\n      .container .about .head .info {\n        display: flex;\n        flex-direction: column; }\n        .container .about .head .info .mainTitle {\n          font-family: 'Lora', serif;\n          font-weight: bold;\n          font-size: 2rem;\n          margin-bottom: 1rem; }\n        .container .about .head .info .phoneNumber {\n          font-family: 'Lora', serif;\n          font-size: 1.25rem;\n          margin-bottom: 0.5rem; }\n    .container .about .nav {\n      margin-bottom: 3rem; }\n      .container .about .nav li .text {\n        width: 100%;\n        color: #3C3C43;\n        font-size: 1.125rem;\n        cursor: pointer;\n        line-height: 34px;\n        padding-bottom: 3px;\n        border-bottom: 2px solid #3C3C43;\n        font-family: \"Roboto\", sans-serif; }\n        .container .about .nav li .text:hover {\n          opacity: 0.75; }\n    .container .about .nav > * {\n      width: 100%; }\n\n.listItems {\n  margin-bottom: 1rem; }\n\n@media (max-width: 1000px) {\n  .about {\n    display: none; } }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "Information-container-2LBGm",
	"leftBar": "Information-leftBar-OP044",
	"title": "Information-title-T4zfz",
	"advert": "Information-advert-bwcK-",
	"downBar": "Information-downBar-1V4v7",
	"btn": "Information-btn-Ha0RD",
	"about": "Information-about-1No3A",
	"head": "Information-head-2_5pM",
	"logo": "Information-logo-2OGND",
	"info": "Information-info-ib3r5",
	"mainTitle": "Information-mainTitle-dBV1M",
	"phoneNumber": "Information-phoneNumber-3u2K8",
	"nav": "Information-nav-3Sboq",
	"text": "Information-text-UhviD",
	"listItems": "Information-listItems-3PM1n"
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n  color: #4f4f4f;\n  font-family: Lora; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after {\n  content: '';\n  content: none; }\n\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n* {\n  box-sizing: border-box; }\n\na {\n  text-decoration: none; }\n\nbutton {\n  border: none;\n  outline: none;\n  padding: 0; }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/Layout/Layout.scss"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,WAAW;EACX,UAAU;EACV,gBAAgB;EAChB,cAAc;EACd,yBAAyB;EACzB,eAAe;EACf,kBAAkB,EAAE;;AAEtB,iDAAiD;AACjD;EACE,eAAe,EAAE;;AAEnB;EACE,eAAe,EAAE;;AAEnB;EACE,iBAAiB,EAAE;;AAErB;EACE,aAAa,EAAE;;AAEjB;EACE,YAAY;EACZ,cAAc,EAAE;;AAElB;EACE,YAAY;EACZ,cAAc,EAAE;;AAElB;EACE,0BAA0B;EAC1B,kBAAkB,EAAE;;AAEtB;EACE,uBAAuB,EAAE;;AAE3B;EACE,sBAAsB,EAAE;;AAE1B;EACE,aAAa;EACb,cAAc;EACd,WAAW,EAAE","file":"Layout.scss","sourcesContent":["html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n  color: #4f4f4f;\n  font-family: Lora; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after {\n  content: '';\n  content: none; }\n\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n* {\n  box-sizing: border-box; }\n\na {\n  text-decoration: none; }\n\nbutton {\n  border: none;\n  outline: none;\n  padding: 0; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, ".Projects-container-26XFQ {\n  margin: 0 auto;\n  margin-bottom: 4rem;\n  text-align: center;\n  width: 79.76795%;\n  margin: 0  10.5% 0 17.5%;\n  margin-bottom: 140px; }\n\n.Projects-projects-38O4b {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n  .Projects-projects-38O4b > * {\n    flex-basis: 320px;\n    min-width: 320px;\n    margin-right: 20px; }\n\n.Projects-title-3lCNh {\n  font-size: 3rem;\n  line-height: 62px;\n  padding-bottom: 13px;\n  font-weight: bold;\n  font-family: 'Lora', serif; }\n\n.Projects-topic-238Nq {\n  font-size: 1.25rem;\n  line-height: 1.42;\n  padding-bottom: 50px; }\n\n.Projects-image-TBpKc {\n  min-width: 320px;\n  width: 320px;\n  height: auto;\n  cursor: pointer; }\n\n.Projects-name-17fTv {\n  font-size: 1.125rem;\n  font-family: 'Roboto';\n  line-height: 22px;\n  margin-top: 13px;\n  display: block;\n  margin-bottom: 45px; }\n  .Projects-name-17fTv:hover {\n    opacity: 0.75; }\n\n.Projects-btnWrap-1ObzL {\n  display: flex;\n  justify-content: center; }\n\n.Projects-btn-1ENc1 {\n  font-family: \"Roboto\", sans-serif;\n  min-width: 208px;\n  background-color: #ffffff;\n  text-align: center;\n  height: 51px;\n  display: block;\n  line-height: 47px;\n  color: #3C3C43;\n  border: 2px solid #3C3C43;\n  font-size: 1.25rem;\n  margin-right: 50px; }\n  .Projects-btn-1ENc1:hover {\n    background-color: #3C3C43;\n    color: #ffffff;\n    transition: ease-out 0.3s; }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/Projects/Projects.scss"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,yBAAyB;EACzB,qBAAqB,EAAE;;AAEzB;EACE,cAAc;EACd,gBAAgB;EAChB,wBAAwB,EAAE;EAC1B;IACE,kBAAkB;IAClB,iBAAiB;IACjB,mBAAmB,EAAE;;AAEzB;EACE,gBAAgB;EAChB,kBAAkB;EAClB,qBAAqB;EACrB,kBAAkB;EAClB,2BAA2B,EAAE;;AAE/B;EACE,mBAAmB;EACnB,kBAAkB;EAClB,qBAAqB,EAAE;;AAEzB;EACE,iBAAiB;EACjB,aAAa;EACb,aAAa;EACb,gBAAgB,EAAE;;AAEpB;EACE,oBAAoB;EACpB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,oBAAoB,EAAE;EACtB;IACE,cAAc,EAAE;;AAEpB;EACE,cAAc;EACd,wBAAwB,EAAE;;AAE5B;EACE,kCAAkC;EAClC,iBAAiB;EACjB,0BAA0B;EAC1B,mBAAmB;EACnB,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,0BAA0B;EAC1B,mBAAmB;EACnB,mBAAmB,EAAE;EACrB;IACE,0BAA0B;IAC1B,eAAe;IACf,0BAA0B,EAAE","file":"Projects.scss","sourcesContent":[".container {\n  margin: 0 auto;\n  margin-bottom: 4rem;\n  text-align: center;\n  width: 79.76795%;\n  margin: 0  10.5% 0 17.5%;\n  margin-bottom: 140px; }\n\n.projects {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n  .projects > * {\n    flex-basis: 320px;\n    min-width: 320px;\n    margin-right: 20px; }\n\n.title {\n  font-size: 3rem;\n  line-height: 62px;\n  padding-bottom: 13px;\n  font-weight: bold;\n  font-family: 'Lora', serif; }\n\n.topic {\n  font-size: 1.25rem;\n  line-height: 1.42;\n  padding-bottom: 50px; }\n\n.image {\n  min-width: 320px;\n  width: 320px;\n  height: auto;\n  cursor: pointer; }\n\n.name {\n  font-size: 1.125rem;\n  font-family: 'Roboto';\n  line-height: 22px;\n  margin-top: 13px;\n  display: block;\n  margin-bottom: 45px; }\n  .name:hover {\n    opacity: 0.75; }\n\n.btnWrap {\n  display: flex;\n  justify-content: center; }\n\n.btn {\n  font-family: \"Roboto\", sans-serif;\n  min-width: 208px;\n  background-color: #ffffff;\n  text-align: center;\n  height: 51px;\n  display: block;\n  line-height: 47px;\n  color: #3C3C43;\n  border: 2px solid #3C3C43;\n  font-size: 1.25rem;\n  margin-right: 50px; }\n  .btn:hover {\n    background-color: #3C3C43;\n    color: #ffffff;\n    transition: ease-out 0.3s; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "Projects-container-26XFQ",
	"projects": "Projects-projects-38O4b",
	"title": "Projects-title-3lCNh",
	"topic": "Projects-topic-238Nq",
	"image": "Projects-image-TBpKc",
	"name": "Projects-name-17fTv",
	"btnWrap": "Projects-btnWrap-1ObzL",
	"btn": "Projects-btn-1ENc1"
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, ".products-products-xGAzX {\n  width: 61%;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  min-width: 827px; }\n\n.products-items-1uHNU {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  min-width: 50%; }\n\n.products-title-112jb {\n  font-size: 2.5rem;\n  line-height: 1.25;\n  padding-bottom: 40px;\n  font-weight: bold; }\n\n.products-all-2yNuF {\n  width: 256px;\n  min-width: 256px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-bottom: 27px; }\n\n.products-item-sIee0 {\n  font-size: 20px;\n  color: #747880;\n  line-height: 1;\n  margin-bottom: 35px;\n  cursor: pointer;\n  width: 85%;\n  display: block; }\n\n.products-item-sIee0:hover {\n  color: #3C3C43; }\n\n.products-image-3arCR {\n  display: block;\n  cursor: pointer;\n  transition: all 1s ease-out; }\n  .products-image-3arCR:hover {\n    transform: scale(1.2); }\n\n.products-imageWrap-1Tl6l {\n  width: 100%;\n  overflow: hidden; }\n\n.products-select-3niG8 {\n  color: #3C3C43; }\n\n.products-element-2g-M6 {\n  color: #3C3C43;\n  font-size: 1rem;\n  line-height: 34px;\n  padding-bottom: 3px;\n  border-bottom: 2px solid #3C3C43;\n  font-family: \"Roboto\", sans-serif;\n  transition: 0.3s; }\n  .products-element-2g-M6:hover {\n    opacity: 0.75; }\n\n.products-wrap-_FoBD {\n  margin: 13px 0 37px; }\n\n.products-btn-8YzaQ {\n  font-family: \"Roboto\", sans-serif;\n  font-weight: bold;\n  width: 80%;\n  min-width: 216px;\n  text-align: center;\n  height: 53px;\n  display: block;\n  line-height: 49px;\n  color: #3C3C43;\n  border: 2px solid #3C3C43;\n  font-size: 1.125rem; }\n\n.products-btn-8YzaQ:hover {\n  background-color: #3C3C43;\n  color: #ffffff;\n  transition: ease-out 0.3s; }\n\n@media (max-width: 840px) {\n  .products-items-1uHNU {\n    flex-wrap: nowrap;\n    min-width: 100%; }\n    .products-items-1uHNU > * {\n      margin-right: 10px; }\n  .products-products-xGAzX {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    display: block;\n    padding-left: 20px;\n    min-width: 0; }\n  .products-item-sIee0 {\n    width: 100%; }\n  .products-all-2yNuF {\n    min-width: 265px; } }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/components/catalogProduct/products.scss"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,eAAe;EACf,cAAc;EACd,uBAAuB;EACvB,iBAAiB,EAAE;;AAErB;EACE,cAAc;EACd,+BAA+B;EAC/B,gBAAgB;EAChB,eAAe,EAAE;;AAEnB;EACE,kBAAkB;EAClB,kBAAkB;EAClB,qBAAqB;EACrB,kBAAkB,EAAE;;AAEtB;EACE,aAAa;EACb,iBAAiB;EACjB,cAAc;EACd,uBAAuB;EACvB,+BAA+B;EAC/B,oBAAoB,EAAE;;AAExB;EACE,gBAAgB;EAChB,eAAe;EACf,eAAe;EACf,oBAAoB;EACpB,gBAAgB;EAChB,WAAW;EACX,eAAe,EAAE;;AAEnB;EACE,eAAe,EAAE;;AAEnB;EACE,eAAe;EACf,gBAAgB;EAChB,4BAA4B,EAAE;EAC9B;IACE,sBAAsB,EAAE;;AAE5B;EACE,YAAY;EACZ,iBAAiB,EAAE;;AAErB;EACE,eAAe,EAAE;;AAEnB;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;EACpB,iCAAiC;EACjC,kCAAkC;EAClC,iBAAiB,EAAE;EACnB;IACE,cAAc,EAAE;;AAEpB;EACE,oBAAoB,EAAE;;AAExB;EACE,kCAAkC;EAClC,kBAAkB;EAClB,WAAW;EACX,iBAAiB;EACjB,mBAAmB;EACnB,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,0BAA0B;EAC1B,oBAAoB,EAAE;;AAExB;EACE,0BAA0B;EAC1B,eAAe;EACf,0BAA0B,EAAE;;AAE9B;EACE;IACE,kBAAkB;IAClB,gBAAgB,EAAE;IAClB;MACE,mBAAmB,EAAE;EACzB;IACE,YAAY;IACZ,aAAa;IACb,eAAe;IACf,eAAe;IACf,mBAAmB;IACnB,aAAa,EAAE;EACjB;IACE,YAAY,EAAE;EAChB;IACE,iBAAiB,EAAE,EAAE","file":"products.scss","sourcesContent":[".products {\n  width: 61%;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  min-width: 827px; }\n\n.items {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  min-width: 50%; }\n\n.title {\n  font-size: 2.5rem;\n  line-height: 1.25;\n  padding-bottom: 40px;\n  font-weight: bold; }\n\n.all {\n  width: 256px;\n  min-width: 256px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-bottom: 27px; }\n\n.item {\n  font-size: 20px;\n  color: #747880;\n  line-height: 1;\n  margin-bottom: 35px;\n  cursor: pointer;\n  width: 85%;\n  display: block; }\n\n.item:hover {\n  color: #3C3C43; }\n\n.image {\n  display: block;\n  cursor: pointer;\n  transition: all 1s ease-out; }\n  .image:hover {\n    transform: scale(1.2); }\n\n.imageWrap {\n  width: 100%;\n  overflow: hidden; }\n\n.select {\n  color: #3C3C43; }\n\n.element {\n  color: #3C3C43;\n  font-size: 1rem;\n  line-height: 34px;\n  padding-bottom: 3px;\n  border-bottom: 2px solid #3C3C43;\n  font-family: \"Roboto\", sans-serif;\n  transition: 0.3s; }\n  .element:hover {\n    opacity: 0.75; }\n\n.wrap {\n  margin: 13px 0 37px; }\n\n.btn {\n  font-family: \"Roboto\", sans-serif;\n  font-weight: bold;\n  width: 80%;\n  min-width: 216px;\n  text-align: center;\n  height: 53px;\n  display: block;\n  line-height: 49px;\n  color: #3C3C43;\n  border: 2px solid #3C3C43;\n  font-size: 1.125rem; }\n\n.btn:hover {\n  background-color: #3C3C43;\n  color: #ffffff;\n  transition: ease-out 0.3s; }\n\n@media (max-width: 840px) {\n  .items {\n    flex-wrap: nowrap;\n    min-width: 100%; }\n    .items > * {\n      margin-right: 10px; }\n  .products {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    display: block;\n    padding-left: 20px;\n    min-width: 0; }\n  .item {\n    width: 100%; }\n  .all {\n    min-width: 265px; } }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"products": "products-products-xGAzX",
	"items": "products-items-1uHNU",
	"title": "products-title-112jb",
	"all": "products-all-2yNuF",
	"item": "products-item-sIee0",
	"image": "products-image-3arCR",
	"imageWrap": "products-imageWrap-1Tl6l",
	"select": "products-select-3niG8",
	"element": "products-element-2g-M6",
	"wrap": "products-wrap-_FoBD",
	"btn": "products-btn-8YzaQ"
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, ".Catalog-root-1ku4V {\n  padding-left: 20px;\n  padding-right: 20px; }\n\n.Catalog-container-lYaGR {\n  margin: 0 auto;\n  padding: 0 0 40px; }\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/src/routes/catalog/Catalog.scss"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,eAAe;EACf,kBAAkB,EAAE","file":"Catalog.scss","sourcesContent":[".root {\n  padding-left: 20px;\n  padding-right: 20px; }\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Catalog-root-1ku4V",
	"container": "Catalog-container-lYaGR"
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n", "", {"version":3,"sources":["/home/yura/root-react/react_start-master/node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,4EAA4E;;AAE5E;gFACgF;;AAEhF;;;;GAIG;;AAEH;EACE,kBAAkB,CAAC,OAAO;EAC1B,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;;;;;;EAME,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;OAEO,OAAO;EACZ,eAAe;CAChB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;;GAGG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,UAAU,CAAC,OAAO;EAClB,kBAAkB,CAAC,OAAO;CAC3B;;AAED;;;GAGG;;AAEH;EACE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,sCAAsC,CAAC,OAAO;CAC/C;;AAED;;;GAGG;;AAEH;EACE,oBAAoB,CAAC,OAAO;EAC5B,2BAA2B,CAAC,OAAO;EACnC,kCAAkC,CAAC,OAAO;CAC3C;;AAED;;GAEG;;AAEH;;EAEE,qBAAqB;CACtB;;AAED;;GAEG;;AAEH;;EAEE,oBAAoB;CACrB;;AAED;;;GAGG;;AAEH;;;EAGE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,uBAAuB;EACvB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;CACb;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;;EAEE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;EAKE,wBAAwB,CAAC,OAAO;EAChC,gBAAgB,CAAC,OAAO;EACxB,kBAAkB,CAAC,OAAO;EAC1B,UAAU,CAAC,OAAO;CACnB;;AAED;;;GAGG;;AAEH;QACQ,OAAO;EACb,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;SACS,OAAO;EACd,qBAAqB;CACtB;;AAED;;;;GAIG;;AAEH;;;;EAIE,2BAA2B,CAAC,OAAO;CACpC;;AAED;;GAEG;;AAEH;;;;EAIE,mBAAmB;EACnB,WAAW;CACZ;;AAED;;GAEG;;AAEH;;;;EAIE,+BAA+B;CAChC;;AAED;;GAEG;;AAEH;EACE,+BAA+B;CAChC;;AAED;;;;;GAKG;;AAEH;EACE,uBAAuB,CAAC,OAAO;EAC/B,eAAe,CAAC,OAAO;EACvB,eAAe,CAAC,OAAO;EACvB,gBAAgB,CAAC,OAAO;EACxB,WAAW,CAAC,OAAO;EACnB,oBAAoB,CAAC,OAAO;CAC7B;;AAED;;;GAGG;;AAEH;EACE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,qBAAqB,CAAC,OAAO;CAC9B;;AAED;;GAEG;;AAEH;;EAEE,yBAAyB;CAC1B;;AAED;;;GAGG;;AAEH;EACE,2BAA2B,CAAC,OAAO;EACnC,cAAc,CAAC,OAAO;CACvB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;EAEE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,cAAc;CACf","file":"normalize.css","sourcesContent":["/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/components/AboutUs/aboutPic.png?e57265ff";

/***/ }),
/* 90 */,
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/components/Header/logo.png?bc89b79f";

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/components/Information/logo.png?bc89b79f";

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/material1.png?753b83a2";

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/material2.png?aeda33c8";

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/material3.png?3c7ea7f8";

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/material4.png?0ac54e59";

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/material5.png?623025cd";

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/productDesc.png?d9a38223";

/***/ }),
/* 99 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"intl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"intl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"message"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":82}};
    doc.loc.source = {"body":"query intl ($locale:String!) {\n  intl (locale:$locale) {\n    id\n    message\n  }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(76);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Home.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Home.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(77);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./NotFound.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./NotFound.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(78);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./AboutUs.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./AboutUs.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(79);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./DescriptionProduct.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./DescriptionProduct.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(80);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Feedback.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Feedback.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(81);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Footer.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Footer.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(82);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Header.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Header.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(83);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Information.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Information.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(84);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Layout.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Layout.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(86);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./products.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./products.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(87);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Catalog.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/sass-loader/lib/loader.js!./Catalog.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(88);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../css-loader/index.js??ref--3-1!./normalize.css", function() {
        content = require("!!../css-loader/index.js??ref--3-1!./normalize.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("./assets.json");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("express-request-language");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = require("intl-locales-supported");

/***/ }),
/* 126 */,
/* 127 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = require("svg-react");

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
module.exports = __webpack_require__(26);


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/project1.png?1d81ac92";

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/project2.png?536a50a8";

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/project3.png?3c7ea7f8";

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/product1.png?76fdb707";

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/product2.png?93c8c479";

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/product3.png?50b10270";

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/product4.png?a24bd23a";

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/photo1.png?9bcd8270";

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/photo2.png?9deef219";

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/image/photo3.png?6585feff";

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map