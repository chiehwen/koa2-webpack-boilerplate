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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _koa = __webpack_require__(3);

	var _koa2 = _interopRequireDefault(_koa);

	var _koaStatic = __webpack_require__(4);

	var _koaStatic2 = _interopRequireDefault(_koaStatic);

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } // 載入 koa v2.x


	var port = process.env.PORT || 3000;

	// 初始化 Koa
	var app = new _koa2.default();

	app.use(function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            ctx.body = 'Hello World';

	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return function (_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}());

	// 監聽 3001 埠口
	app.listen(port, function (err) {
	  if (err) throw err;
	  console.log('server is listening on port', port);
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';

	/**
	 * Module dependencies.
	 */

	const resolve = __webpack_require__(5).resolve;
	const assert = __webpack_require__(6);
	const debug = __webpack_require__(7)('koa-static');
	const send = __webpack_require__(8);

	/**
	 * Expose `serve()`.
	 */

	module.exports = serve;

	/**
	 * Serve static files from `root`.
	 *
	 * @param {String} root
	 * @param {Object} [opts]
	 * @return {Function}
	 * @api public
	 */

	function serve(root, opts) {
	  opts = opts || {};

	  assert(root, 'root directory is required to serve files');

	  // options
	  debug('static "%s" %j', root, opts);
	  opts.root = resolve(root);
	  if (opts.index !== false) opts.index = opts.index || 'index.html';

	  if (!opts.defer) {
	    return function *serve(next){
	      if (this.method == 'HEAD' || this.method == 'GET') {
	        if (yield send(this, this.path, opts)) return;
	      }
	      yield* next;
	    };
	  }

	  return function *serve(next){
	    yield* next;

	    if (this.method != 'HEAD' && this.method != 'GET') return;
	    // response is already handled
	    if (this.body != null || this.status != 404) return;

	    yield send(this, this.path, opts);
	  };
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var debug = __webpack_require__(7)('koa-send');
	var resolvePath = __webpack_require__(9);
	var assert = __webpack_require__(6);
	var path = __webpack_require__(5);
	var normalize = path.normalize;
	var basename = path.basename;
	var extname = path.extname;
	var resolve = path.resolve;
	var parse = path.parse;
	var sep = path.sep;
	var fs = __webpack_require__(12);
	var co = __webpack_require__(18);

	/**
	 * Expose `send()`.
	 */

	module.exports = send;

	/**
	 * Send file at `path` with the
	 * given `options` to the koa `ctx`.
	 *
	 * @param {Context} ctx
	 * @param {String} path
	 * @param {Object} [opts]
	 * @return {Function}
	 * @api public
	 */

	function send(ctx, path, opts) {
	  return co(function *(){

	    assert(ctx, 'koa context required');
	    assert(path, 'pathname required');
	    opts = opts || {};

	    // options
	    debug('send "%s" %j', path, opts);
	    var root = opts.root ? normalize(resolve(opts.root)) : '';
	    var trailingSlash = '/' == path[path.length - 1];
	    path = path.substr(parse(path).root.length);
	    var index = opts.index;
	    var maxage = opts.maxage || opts.maxAge || 0;
	    var hidden = opts.hidden || false;
	    var format = opts.format === false ? false : true;
	    var gzip = opts.gzip === false ? false : true;

	    var encoding = ctx.acceptsEncodings('gzip', 'deflate', 'identity');

	    // normalize path
	    path = decode(path);

	    if (-1 == path) return ctx.throw('failed to decode', 400);

	    // index file support
	    if (index && trailingSlash) path += index;

	    path = resolvePath(root, path);

	    // hidden file support, ignore
	    if (!hidden && isHidden(root, path)) return;

	    // serve gzipped file when possible
	    if (encoding === 'gzip' && gzip && (yield fs.exists(path + '.gz'))) {
	      path = path + '.gz';
	      ctx.set('Content-Encoding', 'gzip');
	      ctx.res.removeHeader('Content-Length');
	    }

	    // stat
	    try {
	      var stats = yield fs.stat(path);

	      // Format the path to serve static file servers
	      // and not require a trailing slash for directories,
	      // so that you can do both `/directory` and `/directory/`
	      if (stats.isDirectory()) {
	        if (format && index) {
	          path += '/' + index;
	          stats = yield fs.stat(path);
	        } else {
	          return;
	        }
	      }
	    } catch (err) {
	      var notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
	      if (~notfound.indexOf(err.code)) return;
	      err.status = 500;
	      throw err;
	    }

	    // stream
	    ctx.set('Last-Modified', stats.mtime.toUTCString());
	    ctx.set('Content-Length', stats.size);
	    ctx.set('Cache-Control', 'max-age=' + (maxage / 1000 | 0));
	    ctx.type = type(path);
	    ctx.body = fs.createReadStream(path);

	    return path;
	  });
	}

	/**
	 * Check if it's hidden.
	 */

	function isHidden(root, path) {
	  path = path.substr(root.length).split(sep);
	  for(var i = 0; i < path.length; i++) {
	    if(path[i][0] === '.') return true;
	  }
	  return false;
	}

	/**
	 * File type.
	 */

	function type(file) {
	  return extname(basename(file, '.gz'));
	}

	/**
	 * Decode `path`.
	 */

	function decode(path) {
	  try {
	    return decodeURIComponent(path);
	  } catch (err) {
	    return -1;
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * resolve-path
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var createError = __webpack_require__(10)
	var normalize = __webpack_require__(5).normalize
	var pathIsAbsolute = __webpack_require__(11)
	var resolve = __webpack_require__(5).resolve
	var sep = __webpack_require__(5).sep

	/**
	 * Module exports.
	 */

	module.exports = resolvePath

	/**
	 * Module variables.
	 * @private
	 */

	var upPathRegexp = /(?:^|[\\\/])\.\.(?:[\\\/]|$)/

	/**
	 * Resolve relative path against a root path
	 *
	 * @param {string} rootPath
	 * @param {string} relativePath
	 * @return {string}
	 * @public
	 */
	function resolvePath(rootPath, relativePath) {
	  var path = relativePath
	  var root = rootPath

	  // root is optional, similar to root.resolve
	  if (arguments.length === 1) {
	    path = rootPath
	    root = process.cwd()
	  }

	  if (root == null) {
	    throw new TypeError('argument rootPath is required')
	  }

	  if (typeof root !== 'string') {
	    throw new TypeError('argument rootPath must be a string')
	  }

	  if (path == null) {
	    throw new TypeError('argument relativePath is required')
	  }

	  if (typeof path !== 'string') {
	    throw new TypeError('argument relativePath must be a string')
	  }

	  // containing NULL bytes is malicious
	  if (path.indexOf('\0') !== -1) {
	    throw createError(400, 'Malicious Path')
	  }

	  // path should never be absolute
	  if (pathIsAbsolute.posix(path) || pathIsAbsolute.win32(path)) {
	    throw createError(400, 'Malicious Path')
	  }

	  // path outside root
	  if (upPathRegexp.test(normalize('.' + sep + path))) {
	    throw createError(403)
	  }

	  // resolve & normalize the root path
	  root = normalize(resolve(root) + sep)

	  // resolve the path
	  return resolve(root, path)
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("http-errors");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("path-is-absolute");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	var Promise = __webpack_require__(13)
	var fs
	try {
	  fs = __webpack_require__(14)
	} catch(err) {
	  fs = __webpack_require__(15)
	}

	var api = [
	  'rename',
	  'ftruncate',
	  'chown',
	  'fchown',
	  'lchown',
	  'chmod',
	  'fchmod',
	  'stat',
	  'lstat',
	  'fstat',
	  'link',
	  'symlink',
	  'readlink',
	  'realpath',
	  'unlink',
	  'rmdir',
	  'mkdir',
	  'readdir',
	  'close',
	  'open',
	  'utimes',
	  'futimes',
	  'fsync',
	  'write',
	  'read',
	  'readFile',
	  'writeFile',
	  'appendFile',
	  'truncate',
	]

	typeof fs.access === 'function' && api.push('access')

	__webpack_require__(16).withCallback(fs, exports, api)

	exports.exists = function (filename, callback) {
	  // callback
	  if (typeof callback === 'function') {
	    return fs.stat(filename, function (err) {
	      callback(null, !err);
	    })
	  }
	  // or promise
	  return new Promise(function (resolve) {
	    fs.stat(filename, function (err) {
	      resolve(!err)
	    })
	  })
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("any-promise");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("graceful-fs");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	var thenify = __webpack_require__(17)

	module.exports = thenifyAll
	thenifyAll.withCallback = withCallback
	thenifyAll.thenify = thenify

	/**
	 * Promisifies all the selected functions in an object.
	 *
	 * @param {Object} source the source object for the async functions
	 * @param {Object} [destination] the destination to set all the promisified methods
	 * @param {Array} [methods] an array of method names of `source`
	 * @return {Object}
	 * @api public
	 */

	function thenifyAll(source, destination, methods) {
	  return promisifyAll(source, destination, methods, thenify)
	}

	/**
	 * Promisifies all the selected functions in an object and backward compatible with callback.
	 *
	 * @param {Object} source the source object for the async functions
	 * @param {Object} [destination] the destination to set all the promisified methods
	 * @param {Array} [methods] an array of method names of `source`
	 * @return {Object}
	 * @api public
	 */

	function withCallback(source, destination, methods) {
	  return promisifyAll(source, destination, methods, thenify.withCallback)
	}

	function promisifyAll(source, destination, methods, promisify) {
	  if (!destination) {
	    destination = {};
	    methods = Object.keys(source)
	  }

	  if (Array.isArray(destination)) {
	    methods = destination
	    destination = {}
	  }

	  if (!methods) {
	    methods = Object.keys(source)
	  }

	  if (typeof source === 'function') destination = promisify(source)

	  methods.forEach(function (name) {
	    // promisify only if it's a function
	    if (typeof source[name] === 'function') destination[name] = promisify(source[name])
	  })

	  // proxy the rest
	  Object.keys(source).forEach(function (name) {
	    if (deprecated(source, name)) return
	    if (destination[name]) return
	    destination[name] = source[name]
	  })

	  return destination
	}

	function deprecated(source, name) {
	  var desc = Object.getOwnPropertyDescriptor(source, name)
	  if (!desc || !desc.get) return false
	  if (desc.get.name === 'deprecated') return true
	  return false
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	
	var Promise = __webpack_require__(13)
	var assert = __webpack_require__(6)

	module.exports = thenify

	/**
	 * Turn async functions into promises
	 *
	 * @param {Function} $$__fn__$$
	 * @return {Function}
	 * @api public
	 */

	function thenify($$__fn__$$) {
	  assert(typeof $$__fn__$$ === 'function')
	  return eval(createWrapper($$__fn__$$.name.replace(/\s|bound(?!$)/g,'')))
	}

	/**
	 * Turn async functions into promises and backward compatible with callback
	 *
	 * @param {Function} $$__fn__$$
	 * @return {Function}
	 * @api public
	 */

	thenify.withCallback = function ($$__fn__$$) {
	  assert(typeof $$__fn__$$ === 'function')
	  return eval(createWrapper($$__fn__$$.name, true))
	}

	function createCallback(resolve, reject) {
	  return function(err, value) {
	    if (err) return reject(err)
	    var length = arguments.length
	    if (length <= 2) return resolve(value)
	    var values = new Array(length - 1)
	    for (var i = 1; i < length; ++i) values[i - 1] = arguments[i]
	    resolve(values)
	  }
	}

	function createWrapper(name, withCallback) {
	  withCallback = withCallback ?
	    'var lastType = typeof arguments[len - 1]\n'
	    + 'if (lastType === "function") return $$__fn__$$.apply(self, arguments)\n'
	   : ''

	  return '(function ' + (name || '') + '() {\n'
	    + 'var self = this\n'
	    + 'var len = arguments.length\n'
	    + withCallback
	    + 'var args = new Array(len + 1)\n'
	    + 'for (var i = 0; i < len; ++i) args[i] = arguments[i]\n'
	    + 'var lastIndex = i\n'
	    + 'return new Promise(function (resolve, reject) {\n'
	      + 'args[lastIndex] = createCallback(resolve, reject)\n'
	      + '$$__fn__$$.apply(self, args)\n'
	    + '})\n'
	  + '})'
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("co");

/***/ }
/******/ ]);