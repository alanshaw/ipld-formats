(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IpldGit"] = factory();
	else
		root["IpldGit"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

/* eslint-disable no-proto */


var base64 = __webpack_require__(23);

var ieee754 = __webpack_require__(24);

var isArray = __webpack_require__(25);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */

Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
/*
 * Export kMaxLength after typed array support is determined.
 */

exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function foo() {
        return 42;
      }
    };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }

    that.length = length;
  }

  return that;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }

  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }

  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate = __webpack_require__(11);

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Calls `callback` on a later loop around the event loop. In Node.js this just
 * calls `setImmediate`.  In the browser it will use `setImmediate` if
 * available, otherwise `setTimeout(callback, 0)`, which means other higher
 * priority events may precede the execution of `callback`.
 *
 * This is used internally for browser-compatibility purposes.
 *
 * @name setImmediate
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.nextTick]{@link module:Utils.nextTick}
 * @category Util
 * @param {Function} callback - The function to call on a later loop around
 * the event loop. Invoked with (args...).
 * @param {...*} args... - any number of additional arguments to pass to the
 * callback on the next tick.
 * @example
 *
 * var call_order = [];
 * async.nextTick(function() {
 *     call_order.push('two');
 *     // call_order now equals ['one','two']
 * });
 * call_order.push('one');
 *
 * async.setImmediate(function (a, b, c) {
 *     // a, b, and c equal 1, 2, and 3
 * }, 1, 2, 3);
 */


exports.default = _setImmediate2.default;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Multihash implementation in JavaScript.
 *
 * @module multihash
 */


var bs58 = __webpack_require__(37);

var cs = __webpack_require__(14);

exports.names = cs.names;
exports.codes = cs.codes;
exports.defaultLengths = cs.defaultLengths;

var varint = __webpack_require__(8);
/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */


exports.toHexString = function toHexString(hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer');
  }

  return hash.toString('hex');
};
/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Buffer}
 */


exports.fromHexString = function fromHexString(hash) {
  return Buffer.from(hash, 'hex');
};
/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */


exports.toB58String = function toB58String(hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer');
  }

  return bs58.encode(hash);
};
/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Buffer} hash
 * @returns {Buffer}
 */


exports.fromB58String = function fromB58String(hash) {
  var encoded = hash;

  if (Buffer.isBuffer(hash)) {
    encoded = hash.toString();
  }

  return Buffer.from(bs58.decode(encoded));
};
/**
 * Decode a hash from the given multihash.
 *
 * @param {Buffer} buf
 * @returns {{code: number, name: string, length: number, digest: Buffer}} result
 */


exports.decode = function decode(buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new Error('multihash must be a Buffer');
  }

  if (buf.length < 3) {
    throw new Error('multihash too short. must be > 3 bytes.');
  }

  var code = varint.decode(buf);

  if (!exports.isValidCode(code)) {
    throw new Error("multihash unknown function code: 0x".concat(code.toString(16)));
  }

  buf = buf.slice(varint.decode.bytes);
  var len = varint.decode(buf);

  if (len < 1) {
    throw new Error("multihash invalid length: 0x".concat(len.toString(16)));
  }

  buf = buf.slice(varint.decode.bytes);

  if (buf.length !== len) {
    throw new Error("multihash length inconsistent: 0x".concat(buf.toString('hex')));
  }

  return {
    code: code,
    name: cs.codes[code],
    length: len,
    digest: buf
  };
};
/**
 *  Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Buffer} digest
 * @param {string|number} code
 * @param {number} [length]
 * @returns {Buffer}
 */


exports.encode = function encode(digest, code, length) {
  if (!digest || !code) {
    throw new Error('multihash encode requires at least two args: digest, code');
  } // ensure it's a hashfunction code.


  var hashfn = exports.coerceCode(code);

  if (!Buffer.isBuffer(digest)) {
    throw new Error('digest should be a Buffer');
  }

  if (length == null) {
    length = digest.length;
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.');
  }

  return Buffer.concat([Buffer.from(varint.encode(hashfn)), Buffer.from(varint.encode(length)), digest]);
};
/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 * @param {string|number} name
 * @returns {number}
 */


exports.coerceCode = function coerceCode(name) {
  var code = name;

  if (typeof name === 'string') {
    if (!cs.names[name]) {
      throw new Error("Unrecognized hash function named: ".concat(name));
    }

    code = cs.names[name];
  }

  if (typeof code !== 'number') {
    throw new Error("Hash function code should be a number. Got: ".concat(code));
  }

  if (!cs.codes[code] && !exports.isAppCode(code)) {
    throw new Error("Unrecognized function code: ".concat(code));
  }

  return code;
};
/**
 * Checks wether a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */


exports.isAppCode = function appCode(code) {
  return code > 0 && code < 0x10;
};
/**
 * Checks whether a multihash code is valid.
 *
 * @param {number} code
 * @returns {boolean}
 */


exports.isValidCode = function validCode(code) {
  if (exports.isAppCode(code)) {
    return true;
  }

  if (cs.codes[code]) {
    return true;
  }

  return false;
};
/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */


function validate(multihash) {
  exports.decode(multihash); // throws if bad.
}

exports.validate = validate;
/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */

exports.prefix = function prefix(multihash) {
  validate(multihash);
  return multihash.slice(0, 2);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SmartBuffer = __webpack_require__(6).SmartBuffer;

var multihashes = __webpack_require__(14);

var multicodecs = __webpack_require__(68);

var multihash = __webpack_require__(4);

var CID = __webpack_require__(18);

exports = module.exports;
exports.SHA1_LENGTH = multihashes.defaultLengths[multihashes.names.sha1];

exports.find = function (buf, byte) {
  for (var i = 0; i < buf.length; i++) {
    if (buf[i] === byte) {
      return i;
    }
  }

  return -1;
};

exports.parsePersonLine = function (line) {
  var matched = line.match(/^(([^<]+)\s)?\s?<([^>]+)>\s?(\d+\s[+\-\d]+)?$/);

  if (matched === null) {
    return null;
  }

  return {
    name: matched[2],
    email: matched[3],
    date: matched[4]
  };
};

exports.serializePersonLine = function (node) {
  var parts = [];

  if (node.name) {
    parts.push(node.name);
  }

  parts.push('<' + node.email + '>');

  if (node.date) {
    parts.push(node.date);
  }

  return parts.join(' ');
};

exports.shaToCid = function (buf) {
  var mhashBuf = new SmartBuffer();
  mhashBuf.writeUInt8(1);
  mhashBuf.writeBuffer(multicodecs['git-raw']);
  mhashBuf.writeUInt8(multihashes.names.sha1);
  mhashBuf.writeUInt8(exports.SHA1_LENGTH);
  mhashBuf.writeBuffer(buf);
  return mhashBuf.toBuffer();
};

exports.cidToSha = function (cidBuf) {
  var mh = multihash.decode(new CID(cidBuf).multihash);

  if (mh.name !== 'sha1') {
    return null;
  }

  return mh.digest;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(67); // The default Buffer size if one is not provided.


var DEFAULT_SMARTBUFFER_SIZE = 4096; // The default string encoding to use for reading/writing strings.

var DEFAULT_SMARTBUFFER_ENCODING = 'utf8';

var SmartBuffer =
/*#__PURE__*/
function () {
  /**
     * Creates a new SmartBuffer instance.
     *
     * @param options { SmartBufferOptions } The SmartBufferOptions to apply to this instance.
     */
  function SmartBuffer(options) {
    _classCallCheck(this, SmartBuffer);

    this.length = 0;
    this._encoding = DEFAULT_SMARTBUFFER_ENCODING;
    this._writeOffset = 0;
    this._readOffset = 0;

    if (SmartBuffer.isSmartBufferOptions(options)) {
      // Checks for encoding
      if (options.encoding) {
        utils_1.checkEncoding(options.encoding);
        this._encoding = options.encoding;
      } // Checks for initial size length


      if (options.size) {
        if (utils_1.isFiniteInteger(options.size) && options.size > 0) {
          this._buff = Buffer.allocUnsafe(options.size);
        } else {
          throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_SIZE);
        } // Check for initial Buffer

      } else if (options.buff) {
        if (options.buff instanceof Buffer) {
          this._buff = options.buff;
          this.length = options.buff.length;
        } else {
          throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_BUFFER);
        }
      } else {
        this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
      }
    } else {
      // If something was passed but it's not a SmartBufferOptions object
      if (typeof options !== 'undefined') {
        throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_OBJECT);
      } // Otherwise default to sane options


      this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
    }
  }
  /**
     * Creates a new SmartBuffer instance with the provided internal Buffer size and optional encoding.
     *
     * @param size { Number } The size of the internal Buffer.
     * @param encoding { String } The BufferEncoding to use for strings.
     *
     * @return { SmartBuffer }
     */


  _createClass(SmartBuffer, [{
    key: "readInt8",
    // Signed integers

    /**
       * Reads an Int8 value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
    value: function readInt8(offset) {
      return this._readNumberValue(Buffer.prototype.readInt8, 1, offset);
    }
    /**
       * Reads an Int16BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readInt16BE",
    value: function readInt16BE(offset) {
      return this._readNumberValue(Buffer.prototype.readInt16BE, 2, offset);
    }
    /**
       * Reads an Int16LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readInt16LE",
    value: function readInt16LE(offset) {
      return this._readNumberValue(Buffer.prototype.readInt16LE, 2, offset);
    }
    /**
       * Reads an Int32BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readInt32BE",
    value: function readInt32BE(offset) {
      return this._readNumberValue(Buffer.prototype.readInt32BE, 4, offset);
    }
    /**
       * Reads an Int32LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readInt32LE",
    value: function readInt32LE(offset) {
      return this._readNumberValue(Buffer.prototype.readInt32LE, 4, offset);
    }
    /**
       * Writes an Int8 value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeInt8",
    value: function writeInt8(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeInt8, 1, value, offset);

      return this;
    }
    /**
       * Inserts an Int8 value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertInt8",
    value: function insertInt8(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeInt8, 1, value, offset);

      return this;
    }
    /**
       * Writes an Int16BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeInt16BE",
    value: function writeInt16BE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);

      return this;
    }
    /**
       * Inserts an Int16BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertInt16BE",
    value: function insertInt16BE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);

      return this;
    }
    /**
       * Writes an Int16LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeInt16LE",
    value: function writeInt16LE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);

      return this;
    }
    /**
       * Inserts an Int16LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertInt16LE",
    value: function insertInt16LE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);

      return this;
    }
    /**
       * Writes an Int32BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeInt32BE",
    value: function writeInt32BE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);

      return this;
    }
    /**
       * Inserts an Int32BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertInt32BE",
    value: function insertInt32BE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);

      return this;
    }
    /**
       * Writes an Int32LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeInt32LE",
    value: function writeInt32LE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);

      return this;
    }
    /**
       * Inserts an Int32LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertInt32LE",
    value: function insertInt32LE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);

      return this;
    } // Unsigned Integers

    /**
       * Reads an UInt8 value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readUInt8",
    value: function readUInt8(offset) {
      return this._readNumberValue(Buffer.prototype.readUInt8, 1, offset);
    }
    /**
       * Reads an UInt16BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readUInt16BE",
    value: function readUInt16BE(offset) {
      return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, offset);
    }
    /**
       * Reads an UInt16LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readUInt16LE",
    value: function readUInt16LE(offset) {
      return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, offset);
    }
    /**
       * Reads an UInt32BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readUInt32BE",
    value: function readUInt32BE(offset) {
      return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, offset);
    }
    /**
       * Reads an UInt32LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readUInt32LE",
    value: function readUInt32LE(offset) {
      return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, offset);
    }
    /**
       * Writes an UInt8 value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeUInt8",
    value: function writeUInt8(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);

      return this;
    }
    /**
       * Inserts an UInt8 value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertUInt8",
    value: function insertUInt8(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);

      return this;
    }
    /**
       * Writes an UInt16BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeUInt16BE",
    value: function writeUInt16BE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);

      return this;
    }
    /**
       * Inserts an UInt16BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertUInt16BE",
    value: function insertUInt16BE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);

      return this;
    }
    /**
       * Writes an UInt16LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeUInt16LE",
    value: function writeUInt16LE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);

      return this;
    }
    /**
       * Inserts an UInt16LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertUInt16LE",
    value: function insertUInt16LE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);

      return this;
    }
    /**
       * Writes an UInt32BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeUInt32BE",
    value: function writeUInt32BE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);

      return this;
    }
    /**
       * Inserts an UInt32BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertUInt32BE",
    value: function insertUInt32BE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);

      return this;
    }
    /**
       * Writes an UInt32LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeUInt32LE",
    value: function writeUInt32LE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);

      return this;
    }
    /**
       * Inserts an UInt32LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertUInt32LE",
    value: function insertUInt32LE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);

      return this;
    } // Floating Point

    /**
       * Reads an FloatBE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readFloatBE",
    value: function readFloatBE(offset) {
      return this._readNumberValue(Buffer.prototype.readFloatBE, 4, offset);
    }
    /**
       * Reads an FloatLE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readFloatLE",
    value: function readFloatLE(offset) {
      return this._readNumberValue(Buffer.prototype.readFloatLE, 4, offset);
    }
    /**
       * Writes a FloatBE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeFloatBE",
    value: function writeFloatBE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);

      return this;
    }
    /**
       * Inserts a FloatBE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertFloatBE",
    value: function insertFloatBE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);

      return this;
    }
    /**
       * Writes a FloatLE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeFloatLE",
    value: function writeFloatLE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);

      return this;
    }
    /**
       * Inserts a FloatLE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertFloatLE",
    value: function insertFloatLE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);

      return this;
    } // Double Floating Point

    /**
       * Reads an DoublEBE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readDoubleBE",
    value: function readDoubleBE(offset) {
      return this._readNumberValue(Buffer.prototype.readDoubleBE, 8, offset);
    }
    /**
       * Reads an DoubleLE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */

  }, {
    key: "readDoubleLE",
    value: function readDoubleLE(offset) {
      return this._readNumberValue(Buffer.prototype.readDoubleLE, 8, offset);
    }
    /**
       * Writes a DoubleBE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeDoubleBE",
    value: function writeDoubleBE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);

      return this;
    }
    /**
       * Inserts a DoubleBE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertDoubleBE",
    value: function insertDoubleBE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);

      return this;
    }
    /**
       * Writes a DoubleLE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */

  }, {
    key: "writeDoubleLE",
    value: function writeDoubleLE(value, offset) {
      this._writeNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);

      return this;
    }
    /**
       * Inserts a DoubleLE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */

  }, {
    key: "insertDoubleLE",
    value: function insertDoubleLE(value, offset) {
      this._insertNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);

      return this;
    } // Strings

    /**
       * Reads a String from the current read position.
       *
       * @param arg1 { Number | String } The number of bytes to read as a String, or the BufferEncoding to use for
       *             the string (Defaults to instance level encoding).
       * @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
       *
       * @return { String }
       */

  }, {
    key: "readString",
    value: function readString(arg1, encoding) {
      var lengthVal; // Length provided

      if (typeof arg1 === 'number') {
        utils_1.checkLengthValue(arg1);
        lengthVal = Math.min(arg1, this.length - this._readOffset);
      } else {
        encoding = arg1;
        lengthVal = this.length - this._readOffset;
      } // Check encoding


      if (typeof encoding !== 'undefined') {
        utils_1.checkEncoding(encoding);
      }

      var value = this._buff.slice(this._readOffset, this._readOffset + lengthVal).toString(encoding || this._encoding);

      this._readOffset += lengthVal;
      return value;
    }
    /**
       * Inserts a String
       *
       * @param value { String } The String value to insert.
       * @param offset { Number } The offset to insert the string at.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       */

  }, {
    key: "insertString",
    value: function insertString(value, offset, encoding) {
      utils_1.checkOffsetValue(offset);
      return this._handleString(value, true, offset, encoding);
    }
    /**
       * Writes a String
       *
       * @param value { String } The String value to write.
       * @param arg2 { Number | String } The offset to write the string at, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       */

  }, {
    key: "writeString",
    value: function writeString(value, arg2, encoding) {
      return this._handleString(value, false, arg2, encoding);
    }
    /**
       * Reads a null-terminated String from the current read position.
       *
       * @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
       *
       * @return { String }
       */

  }, {
    key: "readStringNT",
    value: function readStringNT(encoding) {
      if (typeof encoding !== 'undefined') {
        utils_1.checkEncoding(encoding);
      } // Set null character position to the end SmartBuffer instance.


      var nullPos = this.length; // Find next null character (if one is not found, default from above is used)

      for (var i = this._readOffset; i < this.length; i++) {
        if (this._buff[i] === 0x00) {
          nullPos = i;
          break;
        }
      } // Read string value


      var value = this._buff.slice(this._readOffset, nullPos); // Increment internal Buffer read offset


      this._readOffset = nullPos + 1;
      return value.toString(encoding || this._encoding);
    }
    /**
       * Inserts a null-terminated String.
       *
       * @param value { String } The String value to write.
       * @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       */

  }, {
    key: "insertStringNT",
    value: function insertStringNT(value, offset, encoding) {
      utils_1.checkOffsetValue(offset); // Write Values

      this.insertString(value, offset, encoding);
      this.insertUInt8(0x00, offset + value.length);
    }
    /**
       * Writes a null-terminated String.
       *
       * @param value { String } The String value to write.
       * @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       */

  }, {
    key: "writeStringNT",
    value: function writeStringNT(value, arg2, encoding) {
      // Write Values
      this.writeString(value, arg2, encoding);
      this.writeUInt8(0x00, typeof arg2 === 'number' ? arg2 + value.length : this.writeOffset);
    } // Buffers

    /**
       * Reads a Buffer from the internal read position.
       *
       * @param length { Number } The length of data to read as a Buffer.
       *
       * @return { Buffer }
       */

  }, {
    key: "readBuffer",
    value: function readBuffer(length) {
      if (typeof length !== 'undefined') {
        utils_1.checkLengthValue(length);
      }

      var lengthVal = typeof length === 'number' ? length : this.length;
      var endPoint = Math.min(this.length, this._readOffset + lengthVal); // Read buffer value

      var value = this._buff.slice(this._readOffset, endPoint); // Increment internal Buffer read offset


      this._readOffset = endPoint;
      return value;
    }
    /**
       * Writes a Buffer to the current write position.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       */

  }, {
    key: "insertBuffer",
    value: function insertBuffer(value, offset) {
      utils_1.checkOffsetValue(offset);
      return this._handleBuffer(value, true, offset);
    }
    /**
       * Writes a Buffer to the current write position.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       */

  }, {
    key: "writeBuffer",
    value: function writeBuffer(value, offset) {
      return this._handleBuffer(value, false, offset);
    }
    /**
       * Reads a null-terminated Buffer from the current read poisiton.
       *
       * @return { Buffer }
       */

  }, {
    key: "readBufferNT",
    value: function readBufferNT() {
      // Set null character position to the end SmartBuffer instance.
      var nullPos = this.length; // Find next null character (if one is not found, default from above is used)

      for (var i = this._readOffset; i < this.length; i++) {
        if (this._buff[i] === 0x00) {
          nullPos = i;
          break;
        }
      } // Read value


      var value = this._buff.slice(this._readOffset, nullPos); // Increment internal Buffer read offset


      this._readOffset = nullPos + 1;
      return value;
    }
    /**
       * Inserts a null-terminated Buffer.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       */

  }, {
    key: "insertBufferNT",
    value: function insertBufferNT(value, offset) {
      utils_1.checkOffsetValue(offset); // Write Values

      this.insertBuffer(value, offset);
      this.insertUInt8(0x00, offset + value.length);
      return this;
    }
    /**
       * Writes a null-terminated Buffer.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       */

  }, {
    key: "writeBufferNT",
    value: function writeBufferNT(value, offset) {
      // Checks for valid numberic value;
      if (typeof offset !== 'undefined') {
        utils_1.checkOffsetValue(offset);
      } // Write Values


      this.writeBuffer(value, offset);
      this.writeUInt8(0x00, typeof offset === 'number' ? offset + value.length : this._writeOffset);
      return this;
    }
    /**
       * Clears the SmartBuffer instance to its original empty state.
       */

  }, {
    key: "clear",
    value: function clear() {
      this._writeOffset = 0;
      this._readOffset = 0;
      this.length = 0;
      return this;
    }
    /**
       * Gets the remaining data left to be read from the SmartBuffer instance.
       *
       * @return { Number }
       */

  }, {
    key: "remaining",
    value: function remaining() {
      return this.length - this._readOffset;
    }
    /**
       * Gets the current read offset value of the SmartBuffer instance.
       *
       * @return { Number }
       */

  }, {
    key: "toBuffer",

    /**
       * Gets the value of the internal managed Buffer (Includes managed data only)
       *
       * @param { Buffer }
       */
    value: function toBuffer() {
      return this._buff.slice(0, this.length);
    }
    /**
       * Gets the String value of the internal managed Buffer
       *
       * @param encoding { String } The BufferEncoding to display the Buffer as (defaults to instance level encoding).
       */

  }, {
    key: "toString",
    value: function toString(encoding) {
      var encodingVal = typeof encoding === 'string' ? encoding : this._encoding; // Check for invalid encoding.

      utils_1.checkEncoding(encodingVal);
      return this._buff.toString(encodingVal, 0, this.length);
    }
    /**
       * Destroys the SmartBuffer instance.
       */

  }, {
    key: "destroy",
    value: function destroy() {
      this.clear();
      return this;
    }
    /**
       * Handles inserting and writing strings.
       *
       * @param value { String } The String value to insert.
       * @param isInsert { Boolean } True if inserting a string, false if writing.
       * @param arg2 { Number | String } The offset to insert the string at, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       */

  }, {
    key: "_handleString",
    value: function _handleString(value, isInsert, arg3, encoding) {
      var offsetVal = this._writeOffset;
      var encodingVal = this._encoding; // Check for offset

      if (typeof arg3 === 'number') {
        offsetVal = arg3; // Check for encoding
      } else if (typeof arg3 === 'string') {
        utils_1.checkEncoding(arg3);
        encodingVal = arg3;
      } // Check for encoding (third param)


      if (typeof encoding === 'string') {
        utils_1.checkEncoding(encoding);
        encodingVal = encoding;
      } // Calculate bytelength of string.


      var byteLength = Buffer.byteLength(value, encodingVal); // Ensure there is enough internal Buffer capacity.

      if (isInsert) {
        this.ensureInsertable(byteLength, offsetVal);
      } else {
        this._ensureWriteable(byteLength, offsetVal);
      } // Write value


      this._buff.write(value, offsetVal, byteLength, encodingVal); // Increment internal Buffer write offset;


      if (isInsert) {
        this._writeOffset += byteLength;
      } else {
        // If an offset was given, check to see if we wrote beyond the current writeOffset.
        if (typeof arg3 === 'number') {
          this._writeOffset = Math.max(this._writeOffset, offsetVal + byteLength);
        } else {
          // If no offset was given, we wrote to the end of the SmartBuffer so increment writeOffset.
          this._writeOffset += byteLength;
        }
      }

      return this;
    }
    /**
       * Handles writing or insert of a Buffer.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       */

  }, {
    key: "_handleBuffer",
    value: function _handleBuffer(value, isInsert, offset) {
      var offsetVal = typeof offset === 'number' ? offset : this._writeOffset; // Ensure there is enough internal Buffer capacity.

      if (isInsert) {
        this.ensureInsertable(value.length, offsetVal);
      } else {
        this._ensureWriteable(value.length, offsetVal);
      } // Write buffer value


      value.copy(this._buff, offsetVal); // Increment internal Buffer write offset;

      if (isInsert) {
        this._writeOffset += value.length;
      } else {
        // If an offset was given, check to see if we wrote beyond the current writeOffset.
        if (typeof offset === 'number') {
          this._writeOffset = Math.max(this._writeOffset, offsetVal + value.length);
        } else {
          // If no offset was given, we wrote to the end of the SmartBuffer so increment writeOffset.
          this._writeOffset += value.length;
        }
      }

      return this;
    }
    /**
       * Ensures that the internal Buffer is large enough to read data.
       *
       * @param length { Number } The length of the data that needs to be read.
       * @param offset { Number } The offset of the data that needs to be read.
       */

  }, {
    key: "ensureReadable",
    value: function ensureReadable(length, offset) {
      // Offset value defaults to managed read offset.
      var offsetVal = this._readOffset; // If an offset was provided, use it.

      if (typeof offset !== 'undefined') {
        // Checks for valid numberic value;
        utils_1.checkOffsetValue(offset); // Overide with custom offset.

        offsetVal = offset;
      } // Checks if offset is below zero, or the offset+length offset is beyond the total length of the managed data.


      if (offsetVal < 0 || offsetVal + length > this.length) {
        throw new Error(utils_1.ERRORS.INVALID_READ_BEYOND_BOUNDS);
      }
    }
    /**
       * Ensures that the internal Buffer is large enough to insert data.
       *
       * @param dataLength { Number } The length of the data that needs to be written.
       * @param offset { Number } The offset of the data to be written.
       */

  }, {
    key: "ensureInsertable",
    value: function ensureInsertable(dataLength, offset) {
      // Checks for valid numberic value;
      utils_1.checkOffsetValue(offset); // Ensure there is enough internal Buffer capacity.

      this._ensureCapacity(this.length + dataLength); // If an offset was provided and its not the very end of the buffer, copy data into appropriate location in regards to the offset.


      if (offset < this.length) {
        this._buff.copy(this._buff, offset + dataLength, offset, this._buff.length);
      } // Adjust tracked smart buffer length


      if (offset + dataLength > this.length) {
        this.length = offset + dataLength;
      } else {
        this.length += dataLength;
      }
    }
    /**
       * Ensures that the internal Buffer is large enough to write data.
       *
       * @param dataLength { Number } The length of the data that needs to be written.
       * @param offset { Number } The offset of the data to be written (defaults to writeOffset).
       */

  }, {
    key: "_ensureWriteable",
    value: function _ensureWriteable(dataLength, offset) {
      var offsetVal = typeof offset === 'number' ? offset : this._writeOffset; // Ensure enough capacity to write data.

      this._ensureCapacity(offsetVal + dataLength); // Adjust SmartBuffer length (if offset + length is larger than managed length, adjust length)


      if (offsetVal + dataLength > this.length) {
        this.length = offsetVal + dataLength;
      }
    }
    /**
       * Ensures that the internal Buffer is large enough to write at least the given amount of data.
       *
       * @param minLength { Number } The minimum length of the data needs to be written.
       */

  }, {
    key: "_ensureCapacity",
    value: function _ensureCapacity(minLength) {
      var oldLength = this._buff.length;

      if (minLength > oldLength) {
        var data = this._buff;
        var newLength = oldLength * 3 / 2 + 1;

        if (newLength < minLength) {
          newLength = minLength;
        }

        this._buff = Buffer.allocUnsafe(newLength);
        data.copy(this._buff, 0, 0, oldLength);
      }
    }
    /**
       * Reads a numeric number value using the provided function.
       *
       * @param func { Function(offset: number) => number } The function to read data on the internal Buffer with.
       * @param byteSize { Number } The number of bytes read.
       * @param offset { Number } The offset to read from (optional). When this is not provided, the managed readOffset is used instead.
       *
       * @param { Number }
       */

  }, {
    key: "_readNumberValue",
    value: function _readNumberValue(func, byteSize, offset) {
      this.ensureReadable(byteSize, offset); // Call Buffer.readXXXX();

      var value = func.call(this._buff, typeof offset === 'number' ? offset : this._readOffset); // Adjust internal read offset if an optional read offset was not provided.

      if (typeof offset === 'undefined') {
        this._readOffset += byteSize;
      }

      return value;
    }
    /**
       * Inserts a numeric number value based on the given offset and value.
       *
       * @param func { Function(offset: number, offset?) => number} The function to write data on the internal Buffer with.
       * @param byteSize { Number } The number of bytes written.
       * @param value { Number } The number value to write.
       * @param offset { Number } the offset to write the number at (REQUIRED).
       *
       */

  }, {
    key: "_insertNumberValue",
    value: function _insertNumberValue(func, byteSize, value, offset) {
      // Check for invalid offset values.
      utils_1.checkOffsetValue(offset); // Ensure there is enough internal Buffer capacity. (raw offset is passed)

      this.ensureInsertable(byteSize, offset); // Call buffer.writeXXXX();

      func.call(this._buff, value, offset); // Adjusts internally managed write offset.

      this._writeOffset += byteSize;
    }
    /**
       * Writes a numeric number value based on the given offset and value.
       *
       * @param func { Function(offset: number, offset?) => number} The function to write data on the internal Buffer with.
       * @param byteSize { Number } The number of bytes written.
       * @param value { Number } The number value to write.
       * @param offset { Number } the offset to write the number at (REQUIRED).
       *
       */

  }, {
    key: "_writeNumberValue",
    value: function _writeNumberValue(func, byteSize, value, offset) {
      // If an offset was provided, validate it.
      if (typeof offset === 'number') {
        // Check if we're writing beyond the bounds of the managed data.
        if (offset < 0) {
          throw new Error(utils_1.ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
        }

        utils_1.checkOffsetValue(offset);
      } // Default to writeOffset if no offset value was given.


      var offsetVal = typeof offset === 'number' ? offset : this._writeOffset; // Ensure there is enough internal Buffer capacity. (raw offset is passed)

      this._ensureWriteable(byteSize, offsetVal);

      func.call(this._buff, value, offsetVal); // If an offset was given, check to see if we wrote beyond the current writeOffset.

      if (typeof offset === 'number') {
        this._writeOffset = Math.max(this._writeOffset, offsetVal + byteSize);
      } else {
        // If no numeric offset was given, we wrote to the end of the SmartBuffer so increment writeOffset.
        this._writeOffset += byteSize;
      }
    }
  }, {
    key: "readOffset",
    get: function get() {
      return this._readOffset;
    }
    /**
       * Sets the read offset value of the SmartBuffer instance.
       *
       * @param offset { Number } - The offset value to set.
       */
    ,
    set: function set(offset) {
      utils_1.checkOffsetValue(offset); // Check for bounds.

      utils_1.checkTargetOffset(offset, this);
      this._readOffset = offset;
    }
    /**
       * Gets the current write offset value of the SmartBuffer instance.
       *
       * @return { Number }
       */

  }, {
    key: "writeOffset",
    get: function get() {
      return this._writeOffset;
    }
    /**
       * Sets the write offset value of the SmartBuffer instance.
       *
       * @param offset { Number } - The offset value to set.
       */
    ,
    set: function set(offset) {
      utils_1.checkOffsetValue(offset); // Check for bounds.

      utils_1.checkTargetOffset(offset, this);
      this._writeOffset = offset;
    }
    /**
       * Gets the currently set string encoding of the SmartBuffer instance.
       *
       * @return { BufferEncoding } The string Buffer encoding currently set.
       */

  }, {
    key: "encoding",
    get: function get() {
      return this._encoding;
    }
    /**
       * Sets the string encoding of the SmartBuffer instance.
       *
       * @param encoding { BufferEncoding } The string Buffer encoding to set.
       */
    ,
    set: function set(encoding) {
      utils_1.checkEncoding(encoding);
      this._encoding = encoding;
    }
    /**
       * Gets the underlying internal Buffer. (This includes unmanaged data in the Buffer)
       *
       * @return { Buffer } The Buffer value.
       */

  }, {
    key: "internalBuffer",
    get: function get() {
      return this._buff;
    }
  }], [{
    key: "fromSize",
    value: function fromSize(size, encoding) {
      return new this({
        size: size,
        encoding: encoding
      });
    }
    /**
       * Creates a new SmartBuffer instance with the provided Buffer and optional encoding.
       *
       * @param buffer { Buffer } The Buffer to use as the internal Buffer value.
       * @param encoding { String } The BufferEncoding to use for strings.
       *
       * @return { SmartBuffer }
       */

  }, {
    key: "fromBuffer",
    value: function fromBuffer(buff, encoding) {
      return new this({
        buff: buff,
        encoding: encoding
      });
    }
    /**
       * Creates a new SmartBuffer instance with the provided SmartBufferOptions options.
       *
       * @param options { SmartBufferOptions } The options to use when creating the SmartBuffer instance.
       */

  }, {
    key: "fromOptions",
    value: function fromOptions(options) {
      return new this(options);
    }
    /**
       * Type checking function that determines if an object is a SmartBufferOptions object.
       */

  }, {
    key: "isSmartBufferOptions",
    value: function isSmartBufferOptions(options) {
      var castOptions = options;
      return castOptions && (castOptions.encoding !== undefined || castOptions.size !== undefined || castOptions.buff !== undefined);
    }
  }]);

  return SmartBuffer;
}();

exports.SmartBuffer = SmartBuffer;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slice;

function slice(arrayLike, start) {
  start = start | 0;
  var newLen = Math.max(arrayLike.length - start, 0);
  var newArr = Array(newLen);

  for (var idx = 0; idx < newLen; idx++) {
    newArr[idx] = arrayLike[start + idx];
  }

  return newArr;
}

module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  encode: __webpack_require__(39),
  decode: __webpack_require__(40),
  encodingLength: __webpack_require__(41)
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // spec and table at: https://github.com/multiformats/multicodec

exports = module.exports; // Miscellaneous

exports['raw'] = Buffer.from('55', 'hex'); // bases encodings

exports['base1'] = Buffer.from('01', 'hex');
exports['base2'] = Buffer.from('00', 'hex');
exports['base8'] = Buffer.from('07', 'hex');
exports['base10'] = Buffer.from('09', 'hex'); // Serialization formats

exports['cbor'] = Buffer.from('51', 'hex');
exports['protobuf'] = Buffer.from('50', 'hex');
exports['rlp'] = Buffer.from('60', 'hex');
exports['bencode'] = Buffer.from('63', 'hex'); // Multiformats

exports['multicodec'] = Buffer.from('30', 'hex');
exports['multihash'] = Buffer.from('31', 'hex');
exports['multiaddr'] = Buffer.from('32', 'hex');
exports['multibase'] = Buffer.from('33', 'hex');
exports['md4'] = Buffer.from('d4', 'hex');
exports['md5'] = Buffer.from('d5', 'hex'); // multihashes

exports['sha1'] = Buffer.from('11', 'hex');
exports['sha2-256'] = Buffer.from('12', 'hex');
exports['sha2-512'] = Buffer.from('13', 'hex');
exports['dbl-sha2-256'] = Buffer.from('56', 'hex');
exports['sha3-224'] = Buffer.from('17', 'hex');
exports['sha3-256'] = Buffer.from('16', 'hex');
exports['sha3-384'] = Buffer.from('15', 'hex');
exports['sha3-512'] = Buffer.from('14', 'hex');
exports['shake-128'] = Buffer.from('18', 'hex');
exports['shake-256'] = Buffer.from('19', 'hex');
exports['keccak-224'] = Buffer.from('1a', 'hex');
exports['keccak-256'] = Buffer.from('1b', 'hex');
exports['keccak-384'] = Buffer.from('1c', 'hex');
exports['keccak-512'] = Buffer.from('1d', 'hex');
exports['murmur3'] = Buffer.from('22', 'hex');
exports['blake2b-8'] = Buffer.from('b201', 'hex');
exports['blake2b-16'] = Buffer.from('b202', 'hex');
exports['blake2b-24'] = Buffer.from('b203', 'hex');
exports['blake2b-32'] = Buffer.from('b204', 'hex');
exports['blake2b-40'] = Buffer.from('b205', 'hex');
exports['blake2b-48'] = Buffer.from('b206', 'hex');
exports['blake2b-56'] = Buffer.from('b207', 'hex');
exports['blake2b-64'] = Buffer.from('b208', 'hex');
exports['blake2b-72'] = Buffer.from('b209', 'hex');
exports['blake2b-80'] = Buffer.from('b20a', 'hex');
exports['blake2b-88'] = Buffer.from('b20b', 'hex');
exports['blake2b-96'] = Buffer.from('b20c', 'hex');
exports['blake2b-104'] = Buffer.from('b20d', 'hex');
exports['blake2b-112'] = Buffer.from('b20e', 'hex');
exports['blake2b-120'] = Buffer.from('b20f', 'hex');
exports['blake2b-128'] = Buffer.from('b210', 'hex');
exports['blake2b-136'] = Buffer.from('b211', 'hex');
exports['blake2b-144'] = Buffer.from('b212', 'hex');
exports['blake2b-152'] = Buffer.from('b213', 'hex');
exports['blake2b-160'] = Buffer.from('b214', 'hex');
exports['blake2b-168'] = Buffer.from('b215', 'hex');
exports['blake2b-176'] = Buffer.from('b216', 'hex');
exports['blake2b-184'] = Buffer.from('b217', 'hex');
exports['blake2b-192'] = Buffer.from('b218', 'hex');
exports['blake2b-200'] = Buffer.from('b219', 'hex');
exports['blake2b-208'] = Buffer.from('b21a', 'hex');
exports['blake2b-216'] = Buffer.from('b21b', 'hex');
exports['blake2b-224'] = Buffer.from('b21c', 'hex');
exports['blake2b-232'] = Buffer.from('b21d', 'hex');
exports['blake2b-240'] = Buffer.from('b21e', 'hex');
exports['blake2b-248'] = Buffer.from('b21f', 'hex');
exports['blake2b-256'] = Buffer.from('b220', 'hex');
exports['blake2b-264'] = Buffer.from('b221', 'hex');
exports['blake2b-272'] = Buffer.from('b222', 'hex');
exports['blake2b-280'] = Buffer.from('b223', 'hex');
exports['blake2b-288'] = Buffer.from('b224', 'hex');
exports['blake2b-296'] = Buffer.from('b225', 'hex');
exports['blake2b-304'] = Buffer.from('b226', 'hex');
exports['blake2b-312'] = Buffer.from('b227', 'hex');
exports['blake2b-320'] = Buffer.from('b228', 'hex');
exports['blake2b-328'] = Buffer.from('b229', 'hex');
exports['blake2b-336'] = Buffer.from('b22a', 'hex');
exports['blake2b-344'] = Buffer.from('b22b', 'hex');
exports['blake2b-352'] = Buffer.from('b22c', 'hex');
exports['blake2b-360'] = Buffer.from('b22d', 'hex');
exports['blake2b-368'] = Buffer.from('b22e', 'hex');
exports['blake2b-376'] = Buffer.from('b22f', 'hex');
exports['blake2b-384'] = Buffer.from('b230', 'hex');
exports['blake2b-392'] = Buffer.from('b231', 'hex');
exports['blake2b-400'] = Buffer.from('b232', 'hex');
exports['blake2b-408'] = Buffer.from('b233', 'hex');
exports['blake2b-416'] = Buffer.from('b234', 'hex');
exports['blake2b-424'] = Buffer.from('b235', 'hex');
exports['blake2b-432'] = Buffer.from('b236', 'hex');
exports['blake2b-440'] = Buffer.from('b237', 'hex');
exports['blake2b-448'] = Buffer.from('b238', 'hex');
exports['blake2b-456'] = Buffer.from('b239', 'hex');
exports['blake2b-464'] = Buffer.from('b23a', 'hex');
exports['blake2b-472'] = Buffer.from('b23b', 'hex');
exports['blake2b-480'] = Buffer.from('b23c', 'hex');
exports['blake2b-488'] = Buffer.from('b23d', 'hex');
exports['blake2b-496'] = Buffer.from('b23e', 'hex');
exports['blake2b-504'] = Buffer.from('b23f', 'hex');
exports['blake2b-512'] = Buffer.from('b240', 'hex');
exports['blake2s-8'] = Buffer.from('b241', 'hex');
exports['blake2s-16'] = Buffer.from('b242', 'hex');
exports['blake2s-24'] = Buffer.from('b243', 'hex');
exports['blake2s-32'] = Buffer.from('b244', 'hex');
exports['blake2s-40'] = Buffer.from('b245', 'hex');
exports['blake2s-48'] = Buffer.from('b246', 'hex');
exports['blake2s-56'] = Buffer.from('b247', 'hex');
exports['blake2s-64'] = Buffer.from('b248', 'hex');
exports['blake2s-72'] = Buffer.from('b249', 'hex');
exports['blake2s-80'] = Buffer.from('b24a', 'hex');
exports['blake2s-88'] = Buffer.from('b24b', 'hex');
exports['blake2s-96'] = Buffer.from('b24c', 'hex');
exports['blake2s-104'] = Buffer.from('b24d', 'hex');
exports['blake2s-112'] = Buffer.from('b24e', 'hex');
exports['blake2s-120'] = Buffer.from('b24f', 'hex');
exports['blake2s-128'] = Buffer.from('b250', 'hex');
exports['blake2s-136'] = Buffer.from('b251', 'hex');
exports['blake2s-144'] = Buffer.from('b252', 'hex');
exports['blake2s-152'] = Buffer.from('b253', 'hex');
exports['blake2s-160'] = Buffer.from('b254', 'hex');
exports['blake2s-168'] = Buffer.from('b255', 'hex');
exports['blake2s-176'] = Buffer.from('b256', 'hex');
exports['blake2s-184'] = Buffer.from('b257', 'hex');
exports['blake2s-192'] = Buffer.from('b258', 'hex');
exports['blake2s-200'] = Buffer.from('b259', 'hex');
exports['blake2s-208'] = Buffer.from('b25a', 'hex');
exports['blake2s-216'] = Buffer.from('b25b', 'hex');
exports['blake2s-224'] = Buffer.from('b25c', 'hex');
exports['blake2s-232'] = Buffer.from('b25d', 'hex');
exports['blake2s-240'] = Buffer.from('b25e', 'hex');
exports['blake2s-248'] = Buffer.from('b25f', 'hex');
exports['blake2s-256'] = Buffer.from('b260', 'hex');
exports['skein256-8'] = Buffer.from('b301', 'hex');
exports['skein256-16'] = Buffer.from('b302', 'hex');
exports['skein256-24'] = Buffer.from('b303', 'hex');
exports['skein256-32'] = Buffer.from('b304', 'hex');
exports['skein256-40'] = Buffer.from('b305', 'hex');
exports['skein256-48'] = Buffer.from('b306', 'hex');
exports['skein256-56'] = Buffer.from('b307', 'hex');
exports['skein256-64'] = Buffer.from('b308', 'hex');
exports['skein256-72'] = Buffer.from('b309', 'hex');
exports['skein256-80'] = Buffer.from('b30a', 'hex');
exports['skein256-88'] = Buffer.from('b30b', 'hex');
exports['skein256-96'] = Buffer.from('b30c', 'hex');
exports['skein256-104'] = Buffer.from('b30d', 'hex');
exports['skein256-112'] = Buffer.from('b30e', 'hex');
exports['skein256-120'] = Buffer.from('b30f', 'hex');
exports['skein256-128'] = Buffer.from('b310', 'hex');
exports['skein256-136'] = Buffer.from('b311', 'hex');
exports['skein256-144'] = Buffer.from('b312', 'hex');
exports['skein256-152'] = Buffer.from('b313', 'hex');
exports['skein256-160'] = Buffer.from('b314', 'hex');
exports['skein256-168'] = Buffer.from('b315', 'hex');
exports['skein256-176'] = Buffer.from('b316', 'hex');
exports['skein256-184'] = Buffer.from('b317', 'hex');
exports['skein256-192'] = Buffer.from('b318', 'hex');
exports['skein256-200'] = Buffer.from('b319', 'hex');
exports['skein256-208'] = Buffer.from('b31a', 'hex');
exports['skein256-216'] = Buffer.from('b31b', 'hex');
exports['skein256-224'] = Buffer.from('b31c', 'hex');
exports['skein256-232'] = Buffer.from('b31d', 'hex');
exports['skein256-240'] = Buffer.from('b31e', 'hex');
exports['skein256-248'] = Buffer.from('b31f', 'hex');
exports['skein256-256'] = Buffer.from('b320', 'hex');
exports['skein512-8'] = Buffer.from('b321', 'hex');
exports['skein512-16'] = Buffer.from('b322', 'hex');
exports['skein512-24'] = Buffer.from('b323', 'hex');
exports['skein512-32'] = Buffer.from('b324', 'hex');
exports['skein512-40'] = Buffer.from('b325', 'hex');
exports['skein512-48'] = Buffer.from('b326', 'hex');
exports['skein512-56'] = Buffer.from('b327', 'hex');
exports['skein512-64'] = Buffer.from('b328', 'hex');
exports['skein512-72'] = Buffer.from('b329', 'hex');
exports['skein512-80'] = Buffer.from('b32a', 'hex');
exports['skein512-88'] = Buffer.from('b32b', 'hex');
exports['skein512-96'] = Buffer.from('b32c', 'hex');
exports['skein512-104'] = Buffer.from('b32d', 'hex');
exports['skein512-112'] = Buffer.from('b32e', 'hex');
exports['skein512-120'] = Buffer.from('b32f', 'hex');
exports['skein512-128'] = Buffer.from('b330', 'hex');
exports['skein512-136'] = Buffer.from('b331', 'hex');
exports['skein512-144'] = Buffer.from('b332', 'hex');
exports['skein512-152'] = Buffer.from('b333', 'hex');
exports['skein512-160'] = Buffer.from('b334', 'hex');
exports['skein512-168'] = Buffer.from('b335', 'hex');
exports['skein512-176'] = Buffer.from('b336', 'hex');
exports['skein512-184'] = Buffer.from('b337', 'hex');
exports['skein512-192'] = Buffer.from('b338', 'hex');
exports['skein512-200'] = Buffer.from('b339', 'hex');
exports['skein512-208'] = Buffer.from('b33a', 'hex');
exports['skein512-216'] = Buffer.from('b33b', 'hex');
exports['skein512-224'] = Buffer.from('b33c', 'hex');
exports['skein512-232'] = Buffer.from('b33d', 'hex');
exports['skein512-240'] = Buffer.from('b33e', 'hex');
exports['skein512-248'] = Buffer.from('b33f', 'hex');
exports['skein512-256'] = Buffer.from('b340', 'hex');
exports['skein512-264'] = Buffer.from('b341', 'hex');
exports['skein512-272'] = Buffer.from('b342', 'hex');
exports['skein512-280'] = Buffer.from('b343', 'hex');
exports['skein512-288'] = Buffer.from('b344', 'hex');
exports['skein512-296'] = Buffer.from('b345', 'hex');
exports['skein512-304'] = Buffer.from('b346', 'hex');
exports['skein512-312'] = Buffer.from('b347', 'hex');
exports['skein512-320'] = Buffer.from('b348', 'hex');
exports['skein512-328'] = Buffer.from('b349', 'hex');
exports['skein512-336'] = Buffer.from('b34a', 'hex');
exports['skein512-344'] = Buffer.from('b34b', 'hex');
exports['skein512-352'] = Buffer.from('b34c', 'hex');
exports['skein512-360'] = Buffer.from('b34d', 'hex');
exports['skein512-368'] = Buffer.from('b34e', 'hex');
exports['skein512-376'] = Buffer.from('b34f', 'hex');
exports['skein512-384'] = Buffer.from('b350', 'hex');
exports['skein512-392'] = Buffer.from('b351', 'hex');
exports['skein512-400'] = Buffer.from('b352', 'hex');
exports['skein512-408'] = Buffer.from('b353', 'hex');
exports['skein512-416'] = Buffer.from('b354', 'hex');
exports['skein512-424'] = Buffer.from('b355', 'hex');
exports['skein512-432'] = Buffer.from('b356', 'hex');
exports['skein512-440'] = Buffer.from('b357', 'hex');
exports['skein512-448'] = Buffer.from('b358', 'hex');
exports['skein512-456'] = Buffer.from('b359', 'hex');
exports['skein512-464'] = Buffer.from('b35a', 'hex');
exports['skein512-472'] = Buffer.from('b35b', 'hex');
exports['skein512-480'] = Buffer.from('b35c', 'hex');
exports['skein512-488'] = Buffer.from('b35d', 'hex');
exports['skein512-496'] = Buffer.from('b35e', 'hex');
exports['skein512-504'] = Buffer.from('b35f', 'hex');
exports['skein512-512'] = Buffer.from('b360', 'hex');
exports['skein1024-8'] = Buffer.from('b361', 'hex');
exports['skein1024-16'] = Buffer.from('b362', 'hex');
exports['skein1024-24'] = Buffer.from('b363', 'hex');
exports['skein1024-32'] = Buffer.from('b364', 'hex');
exports['skein1024-40'] = Buffer.from('b365', 'hex');
exports['skein1024-48'] = Buffer.from('b366', 'hex');
exports['skein1024-56'] = Buffer.from('b367', 'hex');
exports['skein1024-64'] = Buffer.from('b368', 'hex');
exports['skein1024-72'] = Buffer.from('b369', 'hex');
exports['skein1024-80'] = Buffer.from('b36a', 'hex');
exports['skein1024-88'] = Buffer.from('b36b', 'hex');
exports['skein1024-96'] = Buffer.from('b36c', 'hex');
exports['skein1024-104'] = Buffer.from('b36d', 'hex');
exports['skein1024-112'] = Buffer.from('b36e', 'hex');
exports['skein1024-120'] = Buffer.from('b36f', 'hex');
exports['skein1024-128'] = Buffer.from('b370', 'hex');
exports['skein1024-136'] = Buffer.from('b371', 'hex');
exports['skein1024-144'] = Buffer.from('b372', 'hex');
exports['skein1024-152'] = Buffer.from('b373', 'hex');
exports['skein1024-160'] = Buffer.from('b374', 'hex');
exports['skein1024-168'] = Buffer.from('b375', 'hex');
exports['skein1024-176'] = Buffer.from('b376', 'hex');
exports['skein1024-184'] = Buffer.from('b377', 'hex');
exports['skein1024-192'] = Buffer.from('b378', 'hex');
exports['skein1024-200'] = Buffer.from('b379', 'hex');
exports['skein1024-208'] = Buffer.from('b37a', 'hex');
exports['skein1024-216'] = Buffer.from('b37b', 'hex');
exports['skein1024-224'] = Buffer.from('b37c', 'hex');
exports['skein1024-232'] = Buffer.from('b37d', 'hex');
exports['skein1024-240'] = Buffer.from('b37e', 'hex');
exports['skein1024-248'] = Buffer.from('b37f', 'hex');
exports['skein1024-256'] = Buffer.from('b380', 'hex');
exports['skein1024-264'] = Buffer.from('b381', 'hex');
exports['skein1024-272'] = Buffer.from('b382', 'hex');
exports['skein1024-280'] = Buffer.from('b383', 'hex');
exports['skein1024-288'] = Buffer.from('b384', 'hex');
exports['skein1024-296'] = Buffer.from('b385', 'hex');
exports['skein1024-304'] = Buffer.from('b386', 'hex');
exports['skein1024-312'] = Buffer.from('b387', 'hex');
exports['skein1024-320'] = Buffer.from('b388', 'hex');
exports['skein1024-328'] = Buffer.from('b389', 'hex');
exports['skein1024-336'] = Buffer.from('b38a', 'hex');
exports['skein1024-344'] = Buffer.from('b38b', 'hex');
exports['skein1024-352'] = Buffer.from('b38c', 'hex');
exports['skein1024-360'] = Buffer.from('b38d', 'hex');
exports['skein1024-368'] = Buffer.from('b38e', 'hex');
exports['skein1024-376'] = Buffer.from('b38f', 'hex');
exports['skein1024-384'] = Buffer.from('b390', 'hex');
exports['skein1024-392'] = Buffer.from('b391', 'hex');
exports['skein1024-400'] = Buffer.from('b392', 'hex');
exports['skein1024-408'] = Buffer.from('b393', 'hex');
exports['skein1024-416'] = Buffer.from('b394', 'hex');
exports['skein1024-424'] = Buffer.from('b395', 'hex');
exports['skein1024-432'] = Buffer.from('b396', 'hex');
exports['skein1024-440'] = Buffer.from('b397', 'hex');
exports['skein1024-448'] = Buffer.from('b398', 'hex');
exports['skein1024-456'] = Buffer.from('b399', 'hex');
exports['skein1024-464'] = Buffer.from('b39a', 'hex');
exports['skein1024-472'] = Buffer.from('b39b', 'hex');
exports['skein1024-480'] = Buffer.from('b39c', 'hex');
exports['skein1024-488'] = Buffer.from('b39d', 'hex');
exports['skein1024-496'] = Buffer.from('b39e', 'hex');
exports['skein1024-504'] = Buffer.from('b39f', 'hex');
exports['skein1024-512'] = Buffer.from('b3a0', 'hex');
exports['skein1024-520'] = Buffer.from('b3a1', 'hex');
exports['skein1024-528'] = Buffer.from('b3a2', 'hex');
exports['skein1024-536'] = Buffer.from('b3a3', 'hex');
exports['skein1024-544'] = Buffer.from('b3a4', 'hex');
exports['skein1024-552'] = Buffer.from('b3a5', 'hex');
exports['skein1024-560'] = Buffer.from('b3a6', 'hex');
exports['skein1024-568'] = Buffer.from('b3a7', 'hex');
exports['skein1024-576'] = Buffer.from('b3a8', 'hex');
exports['skein1024-584'] = Buffer.from('b3a9', 'hex');
exports['skein1024-592'] = Buffer.from('b3aa', 'hex');
exports['skein1024-600'] = Buffer.from('b3ab', 'hex');
exports['skein1024-608'] = Buffer.from('b3ac', 'hex');
exports['skein1024-616'] = Buffer.from('b3ad', 'hex');
exports['skein1024-624'] = Buffer.from('b3ae', 'hex');
exports['skein1024-632'] = Buffer.from('b3af', 'hex');
exports['skein1024-640'] = Buffer.from('b3b0', 'hex');
exports['skein1024-648'] = Buffer.from('b3b1', 'hex');
exports['skein1024-656'] = Buffer.from('b3b2', 'hex');
exports['skein1024-664'] = Buffer.from('b3b3', 'hex');
exports['skein1024-672'] = Buffer.from('b3b4', 'hex');
exports['skein1024-680'] = Buffer.from('b3b5', 'hex');
exports['skein1024-688'] = Buffer.from('b3b6', 'hex');
exports['skein1024-696'] = Buffer.from('b3b7', 'hex');
exports['skein1024-704'] = Buffer.from('b3b8', 'hex');
exports['skein1024-712'] = Buffer.from('b3b9', 'hex');
exports['skein1024-720'] = Buffer.from('b3ba', 'hex');
exports['skein1024-728'] = Buffer.from('b3bb', 'hex');
exports['skein1024-736'] = Buffer.from('b3bc', 'hex');
exports['skein1024-744'] = Buffer.from('b3bd', 'hex');
exports['skein1024-752'] = Buffer.from('b3be', 'hex');
exports['skein1024-760'] = Buffer.from('b3bf', 'hex');
exports['skein1024-768'] = Buffer.from('b3c0', 'hex');
exports['skein1024-776'] = Buffer.from('b3c1', 'hex');
exports['skein1024-784'] = Buffer.from('b3c2', 'hex');
exports['skein1024-792'] = Buffer.from('b3c3', 'hex');
exports['skein1024-800'] = Buffer.from('b3c4', 'hex');
exports['skein1024-808'] = Buffer.from('b3c5', 'hex');
exports['skein1024-816'] = Buffer.from('b3c6', 'hex');
exports['skein1024-824'] = Buffer.from('b3c7', 'hex');
exports['skein1024-832'] = Buffer.from('b3c8', 'hex');
exports['skein1024-840'] = Buffer.from('b3c9', 'hex');
exports['skein1024-848'] = Buffer.from('b3ca', 'hex');
exports['skein1024-856'] = Buffer.from('b3cb', 'hex');
exports['skein1024-864'] = Buffer.from('b3cc', 'hex');
exports['skein1024-872'] = Buffer.from('b3cd', 'hex');
exports['skein1024-880'] = Buffer.from('b3ce', 'hex');
exports['skein1024-888'] = Buffer.from('b3cf', 'hex');
exports['skein1024-896'] = Buffer.from('b3d0', 'hex');
exports['skein1024-904'] = Buffer.from('b3d1', 'hex');
exports['skein1024-912'] = Buffer.from('b3d2', 'hex');
exports['skein1024-920'] = Buffer.from('b3d3', 'hex');
exports['skein1024-928'] = Buffer.from('b3d4', 'hex');
exports['skein1024-936'] = Buffer.from('b3d5', 'hex');
exports['skein1024-944'] = Buffer.from('b3d6', 'hex');
exports['skein1024-952'] = Buffer.from('b3d7', 'hex');
exports['skein1024-960'] = Buffer.from('b3d8', 'hex');
exports['skein1024-968'] = Buffer.from('b3d9', 'hex');
exports['skein1024-976'] = Buffer.from('b3da', 'hex');
exports['skein1024-984'] = Buffer.from('b3db', 'hex');
exports['skein1024-992'] = Buffer.from('b3dc', 'hex');
exports['skein1024-1000'] = Buffer.from('b3dd', 'hex');
exports['skein1024-1008'] = Buffer.from('b3de', 'hex');
exports['skein1024-1016'] = Buffer.from('b3df', 'hex');
exports['skein1024-1024'] = Buffer.from('b3e0', 'hex'); // multiaddrs

exports['ip4'] = Buffer.from('04', 'hex');
exports['ip6'] = Buffer.from('29', 'hex');
exports['tcp'] = Buffer.from('06', 'hex');
exports['udp'] = Buffer.from('0111', 'hex');
exports['dccp'] = Buffer.from('21', 'hex');
exports['sctp'] = Buffer.from('84', 'hex');
exports['udt'] = Buffer.from('012d', 'hex');
exports['utp'] = Buffer.from('012e', 'hex');
exports['ipfs'] = Buffer.from('01a5', 'hex');
exports['http'] = Buffer.from('01e0', 'hex');
exports['https'] = Buffer.from('01bb', 'hex');
exports['quic'] = Buffer.from('01cc', 'hex');
exports['ws'] = Buffer.from('01dd', 'hex');
exports['onion'] = Buffer.from('01bc', 'hex');
exports['p2p-circuit'] = Buffer.from('0122', 'hex'); // archiving formats
// image formats
// video formats
// VCS formats

exports['git-raw'] = Buffer.from('78', 'hex'); // IPLD formats

exports['dag-pb'] = Buffer.from('70', 'hex');
exports['dag-cbor'] = Buffer.from('71', 'hex');
exports['git-raw'] = Buffer.from('78', 'hex');
exports['eth-block'] = Buffer.from('90', 'hex');
exports['eth-block-list'] = Buffer.from('91', 'hex');
exports['eth-tx-trie'] = Buffer.from('92', 'hex');
exports['eth-tx'] = Buffer.from('93', 'hex');
exports['eth-tx-receipt-trie'] = Buffer.from('94', 'hex');
exports['eth-tx-receipt'] = Buffer.from('95', 'hex');
exports['eth-state-trie'] = Buffer.from('96', 'hex');
exports['eth-account-snapshot'] = Buffer.from('97', 'hex');
exports['eth-storage-trie'] = Buffer.from('98', 'hex');
exports['bitcoin-block'] = Buffer.from('b0', 'hex');
exports['bitcoin-tx'] = Buffer.from('b1', 'hex');
exports['zcash-block'] = Buffer.from('c0', 'hex');
exports['zcash-tx'] = Buffer.from('c1', 'hex');
exports['stellar-block'] = Buffer.from('d0', 'hex');
exports['stellar-tx'] = Buffer.from('d1', 'hex');
exports['torrent-info'] = Buffer.from('7b', 'hex');
exports['torrent-file'] = Buffer.from('7c', 'hex');
exports['ed25519-pub'] = Buffer.from('ed', 'hex');
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var setImmediate = __webpack_require__(3);

var waterfall = __webpack_require__(27);

var multihashing = __webpack_require__(36);

var CID = __webpack_require__(18);

var resolver = __webpack_require__(20);

var gitUtil = __webpack_require__(5);

var commit = __webpack_require__(69);

var tag = __webpack_require__(70);

var tree = __webpack_require__(71);

exports = module.exports;

exports.serialize = function (dagNode, callback) {
  if (dagNode === null) {
    setImmediate(function () {
      return callback(new Error('dagNode passed to serialize was null'), null);
    });
    return;
  }

  if (Buffer.isBuffer(dagNode)) {
    if (dagNode.slice(0, 4).toString() === 'blob') {
      setImmediate(function () {
        return callback(null, dagNode);
      });
    } else {
      setImmediate(function () {
        return callback(new Error('unexpected dagNode passed to serialize'), null);
      });
    }

    return;
  }

  switch (dagNode.gitType) {
    case 'commit':
      commit.serialize(dagNode, callback);
      break;

    case 'tag':
      tag.serialize(dagNode, callback);
      break;

    default:
      // assume tree as a file named 'type' is legal
      tree.serialize(dagNode, callback);
  }
};

exports.deserialize = function (data, callback) {
  var headLen = gitUtil.find(data, 0);
  var head = data.slice(0, headLen).toString();
  var typeLen = head.match(/([^ ]+) (\d+)/);

  if (!typeLen) {
    setImmediate(function () {
      return callback(new Error('invalid object header'), null);
    });
    return;
  }

  switch (typeLen[1]) {
    case 'blob':
      callback(null, data);
      break;

    case 'commit':
      commit.deserialize(data.slice(headLen + 1), callback);
      break;

    case 'tag':
      tag.deserialize(data.slice(headLen + 1), callback);
      break;

    case 'tree':
      tree.deserialize(data.slice(headLen + 1), callback);
      break;

    default:
      setImmediate(function () {
        return callback(new Error('unknown object type ' + typeLen[1]), null);
      });
  }
};
/**
 * @callback CidCallback
 * @param {?Error} error - Error if getting the CID failed
 * @param {?CID} cid - CID if call was successful
 */

/**
 * Get the CID of the DAG-Node.
 *
 * @param {Object} dagNode - Internal representation
 * @param {Object} [options] - Options to create the CID
 * @param {number} [options.version=1] - CID version number
 * @param {string} [options.hashAlg='sha1'] - Hashing algorithm
 * @param {CidCallback} callback - Callback that handles the return value
 * @returns {void}
 */


exports.cid = function (dagNode, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};
  var hashAlg = options.hashAlg || resolver.defaultHashAlg;
  var version = typeof options.version === 'undefined' ? 1 : options.version;
  waterfall([function (cb) {
    return exports.serialize(dagNode, cb);
  }, function (serialized, cb) {
    return multihashing(serialized, hashAlg, cb);
  }, function (mh, cb) {
    return cb(null, new CID(version, resolver.multicodec, mh));
  }], callback);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, process) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasNextTick = exports.hasSetImmediate = undefined;
exports.fallback = fallback;
exports.wrap = wrap;

var _slice = __webpack_require__(7);

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = exports.hasNextTick = (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
  setTimeout(fn, 0);
}

function wrap(defer) {
  return function (fn
  /*, ...args*/
  ) {
    var args = (0, _slice2.default)(arguments, 1);
    defer(function () {
      fn.apply(null, args);
    });
  };
}

var _defer;

if (hasSetImmediate) {
  _defer = setImmediate;
} else if (hasNextTick) {
  _defer = process.nextTick;
} else {
  _defer = fallback;
}

exports.default = wrap(_defer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12).setImmediate, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(26); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || void 0 && (void 0).setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || void 0 && (void 0).clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc
var Buffer = __webpack_require__(38).Buffer;

module.exports = function base(ALPHABET) {
  var ALPHABET_MAP = {};
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0); // pre-compute lookup table

  for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z);
    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous');
    ALPHABET_MAP[x] = z;
  }

  function encode(source) {
    if (source.length === 0) return '';
    var digits = [0];

    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % BASE;
        carry = carry / BASE | 0;
      }

      while (carry > 0) {
        digits.push(carry % BASE);
        carry = carry / BASE | 0;
      }
    }

    var string = ''; // deal with leading zeros

    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) {
      string += LEADER;
    } // convert digits to a string


    for (var q = digits.length - 1; q >= 0; --q) {
      string += ALPHABET[digits[q]];
    }

    return string;
  }

  function decodeUnsafe(string) {
    if (typeof string !== 'string') throw new TypeError('Expected String');
    if (string.length === 0) return Buffer.allocUnsafe(0);
    var bytes = [0];

    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]];
      if (value === undefined) return;

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE;
        bytes[j] = carry & 0xff;
        carry >>= 8;
      }

      while (carry > 0) {
        bytes.push(carry & 0xff);
        carry >>= 8;
      }
    } // deal with leading zeros


    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0);
    }

    return Buffer.from(bytes.reverse());
  }

  function decode(string) {
    var buffer = decodeUnsafe(string);
    if (buffer) return buffer;
    throw new Error('Non-base' + BASE + ' character');
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint quote-props: off */

/* eslint key-spacing: off */


exports.names = Object.freeze({
  'id': 0x0,
  'sha1': 0x11,
  'sha2-256': 0x12,
  'sha2-512': 0x13,
  'dbl-sha2-256': 0x56,
  'sha3-224': 0x17,
  'sha3-256': 0x16,
  'sha3-384': 0x15,
  'sha3-512': 0x14,
  'shake-128': 0x18,
  'shake-256': 0x19,
  'keccak-224': 0x1A,
  'keccak-256': 0x1B,
  'keccak-384': 0x1C,
  'keccak-512': 0x1D,
  'murmur3-128': 0x22,
  'murmur3-32': 0x23,
  'blake2b-8': 0xb201,
  'blake2b-16': 0xb202,
  'blake2b-24': 0xb203,
  'blake2b-32': 0xb204,
  'blake2b-40': 0xb205,
  'blake2b-48': 0xb206,
  'blake2b-56': 0xb207,
  'blake2b-64': 0xb208,
  'blake2b-72': 0xb209,
  'blake2b-80': 0xb20a,
  'blake2b-88': 0xb20b,
  'blake2b-96': 0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8': 0xb241,
  'blake2s-16': 0xb242,
  'blake2s-24': 0xb243,
  'blake2s-32': 0xb244,
  'blake2s-40': 0xb245,
  'blake2s-48': 0xb246,
  'blake2s-56': 0xb247,
  'blake2s-64': 0xb248,
  'blake2s-72': 0xb249,
  'blake2s-80': 0xb24a,
  'blake2s-88': 0xb24b,
  'blake2s-96': 0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'Skein256-8': 0xb301,
  'Skein256-16': 0xb302,
  'Skein256-24': 0xb303,
  'Skein256-32': 0xb304,
  'Skein256-40': 0xb305,
  'Skein256-48': 0xb306,
  'Skein256-56': 0xb307,
  'Skein256-64': 0xb308,
  'Skein256-72': 0xb309,
  'Skein256-80': 0xb30a,
  'Skein256-88': 0xb30b,
  'Skein256-96': 0xb30c,
  'Skein256-104': 0xb30d,
  'Skein256-112': 0xb30e,
  'Skein256-120': 0xb30f,
  'Skein256-128': 0xb310,
  'Skein256-136': 0xb311,
  'Skein256-144': 0xb312,
  'Skein256-152': 0xb313,
  'Skein256-160': 0xb314,
  'Skein256-168': 0xb315,
  'Skein256-176': 0xb316,
  'Skein256-184': 0xb317,
  'Skein256-192': 0xb318,
  'Skein256-200': 0xb319,
  'Skein256-208': 0xb31a,
  'Skein256-216': 0xb31b,
  'Skein256-224': 0xb31c,
  'Skein256-232': 0xb31d,
  'Skein256-240': 0xb31e,
  'Skein256-248': 0xb31f,
  'Skein256-256': 0xb320,
  'Skein512-8': 0xb321,
  'Skein512-16': 0xb322,
  'Skein512-24': 0xb323,
  'Skein512-32': 0xb324,
  'Skein512-40': 0xb325,
  'Skein512-48': 0xb326,
  'Skein512-56': 0xb327,
  'Skein512-64': 0xb328,
  'Skein512-72': 0xb329,
  'Skein512-80': 0xb32a,
  'Skein512-88': 0xb32b,
  'Skein512-96': 0xb32c,
  'Skein512-104': 0xb32d,
  'Skein512-112': 0xb32e,
  'Skein512-120': 0xb32f,
  'Skein512-128': 0xb330,
  'Skein512-136': 0xb331,
  'Skein512-144': 0xb332,
  'Skein512-152': 0xb333,
  'Skein512-160': 0xb334,
  'Skein512-168': 0xb335,
  'Skein512-176': 0xb336,
  'Skein512-184': 0xb337,
  'Skein512-192': 0xb338,
  'Skein512-200': 0xb339,
  'Skein512-208': 0xb33a,
  'Skein512-216': 0xb33b,
  'Skein512-224': 0xb33c,
  'Skein512-232': 0xb33d,
  'Skein512-240': 0xb33e,
  'Skein512-248': 0xb33f,
  'Skein512-256': 0xb340,
  'Skein512-264': 0xb341,
  'Skein512-272': 0xb342,
  'Skein512-280': 0xb343,
  'Skein512-288': 0xb344,
  'Skein512-296': 0xb345,
  'Skein512-304': 0xb346,
  'Skein512-312': 0xb347,
  'Skein512-320': 0xb348,
  'Skein512-328': 0xb349,
  'Skein512-336': 0xb34a,
  'Skein512-344': 0xb34b,
  'Skein512-352': 0xb34c,
  'Skein512-360': 0xb34d,
  'Skein512-368': 0xb34e,
  'Skein512-376': 0xb34f,
  'Skein512-384': 0xb350,
  'Skein512-392': 0xb351,
  'Skein512-400': 0xb352,
  'Skein512-408': 0xb353,
  'Skein512-416': 0xb354,
  'Skein512-424': 0xb355,
  'Skein512-432': 0xb356,
  'Skein512-440': 0xb357,
  'Skein512-448': 0xb358,
  'Skein512-456': 0xb359,
  'Skein512-464': 0xb35a,
  'Skein512-472': 0xb35b,
  'Skein512-480': 0xb35c,
  'Skein512-488': 0xb35d,
  'Skein512-496': 0xb35e,
  'Skein512-504': 0xb35f,
  'Skein512-512': 0xb360,
  'Skein1024-8': 0xb361,
  'Skein1024-16': 0xb362,
  'Skein1024-24': 0xb363,
  'Skein1024-32': 0xb364,
  'Skein1024-40': 0xb365,
  'Skein1024-48': 0xb366,
  'Skein1024-56': 0xb367,
  'Skein1024-64': 0xb368,
  'Skein1024-72': 0xb369,
  'Skein1024-80': 0xb36a,
  'Skein1024-88': 0xb36b,
  'Skein1024-96': 0xb36c,
  'Skein1024-104': 0xb36d,
  'Skein1024-112': 0xb36e,
  'Skein1024-120': 0xb36f,
  'Skein1024-128': 0xb370,
  'Skein1024-136': 0xb371,
  'Skein1024-144': 0xb372,
  'Skein1024-152': 0xb373,
  'Skein1024-160': 0xb374,
  'Skein1024-168': 0xb375,
  'Skein1024-176': 0xb376,
  'Skein1024-184': 0xb377,
  'Skein1024-192': 0xb378,
  'Skein1024-200': 0xb379,
  'Skein1024-208': 0xb37a,
  'Skein1024-216': 0xb37b,
  'Skein1024-224': 0xb37c,
  'Skein1024-232': 0xb37d,
  'Skein1024-240': 0xb37e,
  'Skein1024-248': 0xb37f,
  'Skein1024-256': 0xb380,
  'Skein1024-264': 0xb381,
  'Skein1024-272': 0xb382,
  'Skein1024-280': 0xb383,
  'Skein1024-288': 0xb384,
  'Skein1024-296': 0xb385,
  'Skein1024-304': 0xb386,
  'Skein1024-312': 0xb387,
  'Skein1024-320': 0xb388,
  'Skein1024-328': 0xb389,
  'Skein1024-336': 0xb38a,
  'Skein1024-344': 0xb38b,
  'Skein1024-352': 0xb38c,
  'Skein1024-360': 0xb38d,
  'Skein1024-368': 0xb38e,
  'Skein1024-376': 0xb38f,
  'Skein1024-384': 0xb390,
  'Skein1024-392': 0xb391,
  'Skein1024-400': 0xb392,
  'Skein1024-408': 0xb393,
  'Skein1024-416': 0xb394,
  'Skein1024-424': 0xb395,
  'Skein1024-432': 0xb396,
  'Skein1024-440': 0xb397,
  'Skein1024-448': 0xb398,
  'Skein1024-456': 0xb399,
  'Skein1024-464': 0xb39a,
  'Skein1024-472': 0xb39b,
  'Skein1024-480': 0xb39c,
  'Skein1024-488': 0xb39d,
  'Skein1024-496': 0xb39e,
  'Skein1024-504': 0xb39f,
  'Skein1024-512': 0xb3a0,
  'Skein1024-520': 0xb3a1,
  'Skein1024-528': 0xb3a2,
  'Skein1024-536': 0xb3a3,
  'Skein1024-544': 0xb3a4,
  'Skein1024-552': 0xb3a5,
  'Skein1024-560': 0xb3a6,
  'Skein1024-568': 0xb3a7,
  'Skein1024-576': 0xb3a8,
  'Skein1024-584': 0xb3a9,
  'Skein1024-592': 0xb3aa,
  'Skein1024-600': 0xb3ab,
  'Skein1024-608': 0xb3ac,
  'Skein1024-616': 0xb3ad,
  'Skein1024-624': 0xb3ae,
  'Skein1024-632': 0xb3af,
  'Skein1024-640': 0xb3b0,
  'Skein1024-648': 0xb3b1,
  'Skein1024-656': 0xb3b2,
  'Skein1024-664': 0xb3b3,
  'Skein1024-672': 0xb3b4,
  'Skein1024-680': 0xb3b5,
  'Skein1024-688': 0xb3b6,
  'Skein1024-696': 0xb3b7,
  'Skein1024-704': 0xb3b8,
  'Skein1024-712': 0xb3b9,
  'Skein1024-720': 0xb3ba,
  'Skein1024-728': 0xb3bb,
  'Skein1024-736': 0xb3bc,
  'Skein1024-744': 0xb3bd,
  'Skein1024-752': 0xb3be,
  'Skein1024-760': 0xb3bf,
  'Skein1024-768': 0xb3c0,
  'Skein1024-776': 0xb3c1,
  'Skein1024-784': 0xb3c2,
  'Skein1024-792': 0xb3c3,
  'Skein1024-800': 0xb3c4,
  'Skein1024-808': 0xb3c5,
  'Skein1024-816': 0xb3c6,
  'Skein1024-824': 0xb3c7,
  'Skein1024-832': 0xb3c8,
  'Skein1024-840': 0xb3c9,
  'Skein1024-848': 0xb3ca,
  'Skein1024-856': 0xb3cb,
  'Skein1024-864': 0xb3cc,
  'Skein1024-872': 0xb3cd,
  'Skein1024-880': 0xb3ce,
  'Skein1024-888': 0xb3cf,
  'Skein1024-896': 0xb3d0,
  'Skein1024-904': 0xb3d1,
  'Skein1024-912': 0xb3d2,
  'Skein1024-920': 0xb3d3,
  'Skein1024-928': 0xb3d4,
  'Skein1024-936': 0xb3d5,
  'Skein1024-944': 0xb3d6,
  'Skein1024-952': 0xb3d7,
  'Skein1024-960': 0xb3d8,
  'Skein1024-968': 0xb3d9,
  'Skein1024-976': 0xb3da,
  'Skein1024-984': 0xb3db,
  'Skein1024-992': 0xb3dc,
  'Skein1024-1000': 0xb3dd,
  'Skein1024-1008': 0xb3de,
  'Skein1024-1016': 0xb3df,
  'Skein1024-1024': 0xb3e0
});
exports.codes = Object.freeze({
  0x11: 'sha1',
  0x12: 'sha2-256',
  0x13: 'sha2-512',
  0x56: 'dbl-sha2-256',
  0x17: 'sha3-224',
  0x16: 'sha3-256',
  0x15: 'sha3-384',
  0x14: 'sha3-512',
  0x18: 'shake-128',
  0x19: 'shake-256',
  0x1A: 'keccak-224',
  0x1B: 'keccak-256',
  0x1C: 'keccak-384',
  0x1D: 'keccak-512',
  0x22: 'murmur3-128',
  0x23: 'murmur3-32',
  // blake2
  0xb201: 'blake2b-8',
  0xb202: 'blake2b-16',
  0xb203: 'blake2b-24',
  0xb204: 'blake2b-32',
  0xb205: 'blake2b-40',
  0xb206: 'blake2b-48',
  0xb207: 'blake2b-56',
  0xb208: 'blake2b-64',
  0xb209: 'blake2b-72',
  0xb20a: 'blake2b-80',
  0xb20b: 'blake2b-88',
  0xb20c: 'blake2b-96',
  0xb20d: 'blake2b-104',
  0xb20e: 'blake2b-112',
  0xb20f: 'blake2b-120',
  0xb210: 'blake2b-128',
  0xb211: 'blake2b-136',
  0xb212: 'blake2b-144',
  0xb213: 'blake2b-152',
  0xb214: 'blake2b-160',
  0xb215: 'blake2b-168',
  0xb216: 'blake2b-176',
  0xb217: 'blake2b-184',
  0xb218: 'blake2b-192',
  0xb219: 'blake2b-200',
  0xb21a: 'blake2b-208',
  0xb21b: 'blake2b-216',
  0xb21c: 'blake2b-224',
  0xb21d: 'blake2b-232',
  0xb21e: 'blake2b-240',
  0xb21f: 'blake2b-248',
  0xb220: 'blake2b-256',
  0xb221: 'blake2b-264',
  0xb222: 'blake2b-272',
  0xb223: 'blake2b-280',
  0xb224: 'blake2b-288',
  0xb225: 'blake2b-296',
  0xb226: 'blake2b-304',
  0xb227: 'blake2b-312',
  0xb228: 'blake2b-320',
  0xb229: 'blake2b-328',
  0xb22a: 'blake2b-336',
  0xb22b: 'blake2b-344',
  0xb22c: 'blake2b-352',
  0xb22d: 'blake2b-360',
  0xb22e: 'blake2b-368',
  0xb22f: 'blake2b-376',
  0xb230: 'blake2b-384',
  0xb231: 'blake2b-392',
  0xb232: 'blake2b-400',
  0xb233: 'blake2b-408',
  0xb234: 'blake2b-416',
  0xb235: 'blake2b-424',
  0xb236: 'blake2b-432',
  0xb237: 'blake2b-440',
  0xb238: 'blake2b-448',
  0xb239: 'blake2b-456',
  0xb23a: 'blake2b-464',
  0xb23b: 'blake2b-472',
  0xb23c: 'blake2b-480',
  0xb23d: 'blake2b-488',
  0xb23e: 'blake2b-496',
  0xb23f: 'blake2b-504',
  0xb240: 'blake2b-512',
  0xb241: 'blake2s-8',
  0xb242: 'blake2s-16',
  0xb243: 'blake2s-24',
  0xb244: 'blake2s-32',
  0xb245: 'blake2s-40',
  0xb246: 'blake2s-48',
  0xb247: 'blake2s-56',
  0xb248: 'blake2s-64',
  0xb249: 'blake2s-72',
  0xb24a: 'blake2s-80',
  0xb24b: 'blake2s-88',
  0xb24c: 'blake2s-96',
  0xb24d: 'blake2s-104',
  0xb24e: 'blake2s-112',
  0xb24f: 'blake2s-120',
  0xb250: 'blake2s-128',
  0xb251: 'blake2s-136',
  0xb252: 'blake2s-144',
  0xb253: 'blake2s-152',
  0xb254: 'blake2s-160',
  0xb255: 'blake2s-168',
  0xb256: 'blake2s-176',
  0xb257: 'blake2s-184',
  0xb258: 'blake2s-192',
  0xb259: 'blake2s-200',
  0xb25a: 'blake2s-208',
  0xb25b: 'blake2s-216',
  0xb25c: 'blake2s-224',
  0xb25d: 'blake2s-232',
  0xb25e: 'blake2s-240',
  0xb25f: 'blake2s-248',
  0xb260: 'blake2s-256',
  // skein
  0xb301: 'Skein256-8',
  0xb302: 'Skein256-16',
  0xb303: 'Skein256-24',
  0xb304: 'Skein256-32',
  0xb305: 'Skein256-40',
  0xb306: 'Skein256-48',
  0xb307: 'Skein256-56',
  0xb308: 'Skein256-64',
  0xb309: 'Skein256-72',
  0xb30a: 'Skein256-80',
  0xb30b: 'Skein256-88',
  0xb30c: 'Skein256-96',
  0xb30d: 'Skein256-104',
  0xb30e: 'Skein256-112',
  0xb30f: 'Skein256-120',
  0xb310: 'Skein256-128',
  0xb311: 'Skein256-136',
  0xb312: 'Skein256-144',
  0xb313: 'Skein256-152',
  0xb314: 'Skein256-160',
  0xb315: 'Skein256-168',
  0xb316: 'Skein256-176',
  0xb317: 'Skein256-184',
  0xb318: 'Skein256-192',
  0xb319: 'Skein256-200',
  0xb31a: 'Skein256-208',
  0xb31b: 'Skein256-216',
  0xb31c: 'Skein256-224',
  0xb31d: 'Skein256-232',
  0xb31e: 'Skein256-240',
  0xb31f: 'Skein256-248',
  0xb320: 'Skein256-256',
  0xb321: 'Skein512-8',
  0xb322: 'Skein512-16',
  0xb323: 'Skein512-24',
  0xb324: 'Skein512-32',
  0xb325: 'Skein512-40',
  0xb326: 'Skein512-48',
  0xb327: 'Skein512-56',
  0xb328: 'Skein512-64',
  0xb329: 'Skein512-72',
  0xb32a: 'Skein512-80',
  0xb32b: 'Skein512-88',
  0xb32c: 'Skein512-96',
  0xb32d: 'Skein512-104',
  0xb32e: 'Skein512-112',
  0xb32f: 'Skein512-120',
  0xb330: 'Skein512-128',
  0xb331: 'Skein512-136',
  0xb332: 'Skein512-144',
  0xb333: 'Skein512-152',
  0xb334: 'Skein512-160',
  0xb335: 'Skein512-168',
  0xb336: 'Skein512-176',
  0xb337: 'Skein512-184',
  0xb338: 'Skein512-192',
  0xb339: 'Skein512-200',
  0xb33a: 'Skein512-208',
  0xb33b: 'Skein512-216',
  0xb33c: 'Skein512-224',
  0xb33d: 'Skein512-232',
  0xb33e: 'Skein512-240',
  0xb33f: 'Skein512-248',
  0xb340: 'Skein512-256',
  0xb341: 'Skein512-264',
  0xb342: 'Skein512-272',
  0xb343: 'Skein512-280',
  0xb344: 'Skein512-288',
  0xb345: 'Skein512-296',
  0xb346: 'Skein512-304',
  0xb347: 'Skein512-312',
  0xb348: 'Skein512-320',
  0xb349: 'Skein512-328',
  0xb34a: 'Skein512-336',
  0xb34b: 'Skein512-344',
  0xb34c: 'Skein512-352',
  0xb34d: 'Skein512-360',
  0xb34e: 'Skein512-368',
  0xb34f: 'Skein512-376',
  0xb350: 'Skein512-384',
  0xb351: 'Skein512-392',
  0xb352: 'Skein512-400',
  0xb353: 'Skein512-408',
  0xb354: 'Skein512-416',
  0xb355: 'Skein512-424',
  0xb356: 'Skein512-432',
  0xb357: 'Skein512-440',
  0xb358: 'Skein512-448',
  0xb359: 'Skein512-456',
  0xb35a: 'Skein512-464',
  0xb35b: 'Skein512-472',
  0xb35c: 'Skein512-480',
  0xb35d: 'Skein512-488',
  0xb35e: 'Skein512-496',
  0xb35f: 'Skein512-504',
  0xb360: 'Skein512-512',
  0xb361: 'Skein1024-8',
  0xb362: 'Skein1024-16',
  0xb363: 'Skein1024-24',
  0xb364: 'Skein1024-32',
  0xb365: 'Skein1024-40',
  0xb366: 'Skein1024-48',
  0xb367: 'Skein1024-56',
  0xb368: 'Skein1024-64',
  0xb369: 'Skein1024-72',
  0xb36a: 'Skein1024-80',
  0xb36b: 'Skein1024-88',
  0xb36c: 'Skein1024-96',
  0xb36d: 'Skein1024-104',
  0xb36e: 'Skein1024-112',
  0xb36f: 'Skein1024-120',
  0xb370: 'Skein1024-128',
  0xb371: 'Skein1024-136',
  0xb372: 'Skein1024-144',
  0xb373: 'Skein1024-152',
  0xb374: 'Skein1024-160',
  0xb375: 'Skein1024-168',
  0xb376: 'Skein1024-176',
  0xb377: 'Skein1024-184',
  0xb378: 'Skein1024-192',
  0xb379: 'Skein1024-200',
  0xb37a: 'Skein1024-208',
  0xb37b: 'Skein1024-216',
  0xb37c: 'Skein1024-224',
  0xb37d: 'Skein1024-232',
  0xb37e: 'Skein1024-240',
  0xb37f: 'Skein1024-248',
  0xb380: 'Skein1024-256',
  0xb381: 'Skein1024-264',
  0xb382: 'Skein1024-272',
  0xb383: 'Skein1024-280',
  0xb384: 'Skein1024-288',
  0xb385: 'Skein1024-296',
  0xb386: 'Skein1024-304',
  0xb387: 'Skein1024-312',
  0xb388: 'Skein1024-320',
  0xb389: 'Skein1024-328',
  0xb38a: 'Skein1024-336',
  0xb38b: 'Skein1024-344',
  0xb38c: 'Skein1024-352',
  0xb38d: 'Skein1024-360',
  0xb38e: 'Skein1024-368',
  0xb38f: 'Skein1024-376',
  0xb390: 'Skein1024-384',
  0xb391: 'Skein1024-392',
  0xb392: 'Skein1024-400',
  0xb393: 'Skein1024-408',
  0xb394: 'Skein1024-416',
  0xb395: 'Skein1024-424',
  0xb396: 'Skein1024-432',
  0xb397: 'Skein1024-440',
  0xb398: 'Skein1024-448',
  0xb399: 'Skein1024-456',
  0xb39a: 'Skein1024-464',
  0xb39b: 'Skein1024-472',
  0xb39c: 'Skein1024-480',
  0xb39d: 'Skein1024-488',
  0xb39e: 'Skein1024-496',
  0xb39f: 'Skein1024-504',
  0xb3a0: 'Skein1024-512',
  0xb3a1: 'Skein1024-520',
  0xb3a2: 'Skein1024-528',
  0xb3a3: 'Skein1024-536',
  0xb3a4: 'Skein1024-544',
  0xb3a5: 'Skein1024-552',
  0xb3a6: 'Skein1024-560',
  0xb3a7: 'Skein1024-568',
  0xb3a8: 'Skein1024-576',
  0xb3a9: 'Skein1024-584',
  0xb3aa: 'Skein1024-592',
  0xb3ab: 'Skein1024-600',
  0xb3ac: 'Skein1024-608',
  0xb3ad: 'Skein1024-616',
  0xb3ae: 'Skein1024-624',
  0xb3af: 'Skein1024-632',
  0xb3b0: 'Skein1024-640',
  0xb3b1: 'Skein1024-648',
  0xb3b2: 'Skein1024-656',
  0xb3b3: 'Skein1024-664',
  0xb3b4: 'Skein1024-672',
  0xb3b5: 'Skein1024-680',
  0xb3b6: 'Skein1024-688',
  0xb3b7: 'Skein1024-696',
  0xb3b8: 'Skein1024-704',
  0xb3b9: 'Skein1024-712',
  0xb3ba: 'Skein1024-720',
  0xb3bb: 'Skein1024-728',
  0xb3bc: 'Skein1024-736',
  0xb3bd: 'Skein1024-744',
  0xb3be: 'Skein1024-752',
  0xb3bf: 'Skein1024-760',
  0xb3c0: 'Skein1024-768',
  0xb3c1: 'Skein1024-776',
  0xb3c2: 'Skein1024-784',
  0xb3c3: 'Skein1024-792',
  0xb3c4: 'Skein1024-800',
  0xb3c5: 'Skein1024-808',
  0xb3c6: 'Skein1024-816',
  0xb3c7: 'Skein1024-824',
  0xb3c8: 'Skein1024-832',
  0xb3c9: 'Skein1024-840',
  0xb3ca: 'Skein1024-848',
  0xb3cb: 'Skein1024-856',
  0xb3cc: 'Skein1024-864',
  0xb3cd: 'Skein1024-872',
  0xb3ce: 'Skein1024-880',
  0xb3cf: 'Skein1024-888',
  0xb3d0: 'Skein1024-896',
  0xb3d1: 'Skein1024-904',
  0xb3d2: 'Skein1024-912',
  0xb3d3: 'Skein1024-920',
  0xb3d4: 'Skein1024-928',
  0xb3d5: 'Skein1024-936',
  0xb3d6: 'Skein1024-944',
  0xb3d7: 'Skein1024-952',
  0xb3d8: 'Skein1024-960',
  0xb3d9: 'Skein1024-968',
  0xb3da: 'Skein1024-976',
  0xb3db: 'Skein1024-984',
  0xb3dc: 'Skein1024-992',
  0xb3dd: 'Skein1024-1000',
  0xb3de: 'Skein1024-1008',
  0xb3df: 'Skein1024-1016',
  0xb3e0: 'Skein1024-1024'
});
exports.defaultLengths = Object.freeze({
  0x11: 20,
  0x12: 32,
  0x13: 64,
  0x56: 32,
  0x17: 28,
  0x16: 32,
  0x15: 48,
  0x14: 64,
  0x18: 32,
  0x19: 64,
  0x1A: 28,
  0x1B: 32,
  0x1C: 48,
  0x1D: 64,
  0x22: 32,
  0xb201: 0x01,
  0xb202: 0x02,
  0xb203: 0x03,
  0xb204: 0x04,
  0xb205: 0x05,
  0xb206: 0x06,
  0xb207: 0x07,
  0xb208: 0x08,
  0xb209: 0x09,
  0xb20a: 0x0a,
  0xb20b: 0x0b,
  0xb20c: 0x0c,
  0xb20d: 0x0d,
  0xb20e: 0x0e,
  0xb20f: 0x0f,
  0xb210: 0x10,
  0xb211: 0x11,
  0xb212: 0x12,
  0xb213: 0x13,
  0xb214: 0x14,
  0xb215: 0x15,
  0xb216: 0x16,
  0xb217: 0x17,
  0xb218: 0x18,
  0xb219: 0x19,
  0xb21a: 0x1a,
  0xb21b: 0x1b,
  0xb21c: 0x1c,
  0xb21d: 0x1d,
  0xb21e: 0x1e,
  0xb21f: 0x1f,
  0xb220: 0x20,
  0xb221: 0x21,
  0xb222: 0x22,
  0xb223: 0x23,
  0xb224: 0x24,
  0xb225: 0x25,
  0xb226: 0x26,
  0xb227: 0x27,
  0xb228: 0x28,
  0xb229: 0x29,
  0xb22a: 0x2a,
  0xb22b: 0x2b,
  0xb22c: 0x2c,
  0xb22d: 0x2d,
  0xb22e: 0x2e,
  0xb22f: 0x2f,
  0xb230: 0x30,
  0xb231: 0x31,
  0xb232: 0x32,
  0xb233: 0x33,
  0xb234: 0x34,
  0xb235: 0x35,
  0xb236: 0x36,
  0xb237: 0x37,
  0xb238: 0x38,
  0xb239: 0x39,
  0xb23a: 0x3a,
  0xb23b: 0x3b,
  0xb23c: 0x3c,
  0xb23d: 0x3d,
  0xb23e: 0x3e,
  0xb23f: 0x3f,
  0xb240: 0x40,
  0xb241: 0x01,
  0xb242: 0x02,
  0xb243: 0x03,
  0xb244: 0x04,
  0xb245: 0x05,
  0xb246: 0x06,
  0xb247: 0x07,
  0xb248: 0x08,
  0xb249: 0x09,
  0xb24a: 0x0a,
  0xb24b: 0x0b,
  0xb24c: 0x0c,
  0xb24d: 0x0d,
  0xb24e: 0x0e,
  0xb24f: 0x0f,
  0xb250: 0x10,
  0xb251: 0x11,
  0xb252: 0x12,
  0xb253: 0x13,
  0xb254: 0x14,
  0xb255: 0x15,
  0xb256: 0x16,
  0xb257: 0x17,
  0xb258: 0x18,
  0xb259: 0x19,
  0xb25a: 0x1a,
  0xb25b: 0x1b,
  0xb25c: 0x1c,
  0xb25d: 0x1d,
  0xb25e: 0x1e,
  0xb25f: 0x1f,
  0xb260: 0x20,
  0xb301: 0x01,
  0xb302: 0x02,
  0xb303: 0x03,
  0xb304: 0x04,
  0xb305: 0x05,
  0xb306: 0x06,
  0xb307: 0x07,
  0xb308: 0x08,
  0xb309: 0x09,
  0xb30a: 0x0a,
  0xb30b: 0x0b,
  0xb30c: 0x0c,
  0xb30d: 0x0d,
  0xb30e: 0x0e,
  0xb30f: 0x0f,
  0xb310: 0x10,
  0xb311: 0x11,
  0xb312: 0x12,
  0xb313: 0x13,
  0xb314: 0x14,
  0xb315: 0x15,
  0xb316: 0x16,
  0xb317: 0x17,
  0xb318: 0x18,
  0xb319: 0x19,
  0xb31a: 0x1a,
  0xb31b: 0x1b,
  0xb31c: 0x1c,
  0xb31d: 0x1d,
  0xb31e: 0x1e,
  0xb31f: 0x1f,
  0xb320: 0x20,
  0xb321: 0x01,
  0xb322: 0x02,
  0xb323: 0x03,
  0xb324: 0x04,
  0xb325: 0x05,
  0xb326: 0x06,
  0xb327: 0x07,
  0xb328: 0x08,
  0xb329: 0x09,
  0xb32a: 0x0a,
  0xb32b: 0x0b,
  0xb32c: 0x0c,
  0xb32d: 0x0d,
  0xb32e: 0x0e,
  0xb32f: 0x0f,
  0xb330: 0x10,
  0xb331: 0x11,
  0xb332: 0x12,
  0xb333: 0x13,
  0xb334: 0x14,
  0xb335: 0x15,
  0xb336: 0x16,
  0xb337: 0x17,
  0xb338: 0x18,
  0xb339: 0x19,
  0xb33a: 0x1a,
  0xb33b: 0x1b,
  0xb33c: 0x1c,
  0xb33d: 0x1d,
  0xb33e: 0x1e,
  0xb33f: 0x1f,
  0xb340: 0x20,
  0xb341: 0x21,
  0xb342: 0x22,
  0xb343: 0x23,
  0xb344: 0x24,
  0xb345: 0x25,
  0xb346: 0x26,
  0xb347: 0x27,
  0xb348: 0x28,
  0xb349: 0x29,
  0xb34a: 0x2a,
  0xb34b: 0x2b,
  0xb34c: 0x2c,
  0xb34d: 0x2d,
  0xb34e: 0x2e,
  0xb34f: 0x2f,
  0xb350: 0x30,
  0xb351: 0x31,
  0xb352: 0x32,
  0xb353: 0x33,
  0xb354: 0x34,
  0xb355: 0x35,
  0xb356: 0x36,
  0xb357: 0x37,
  0xb358: 0x38,
  0xb359: 0x39,
  0xb35a: 0x3a,
  0xb35b: 0x3b,
  0xb35c: 0x3c,
  0xb35d: 0x3d,
  0xb35e: 0x3e,
  0xb35f: 0x3f,
  0xb360: 0x40,
  0xb361: 0x01,
  0xb362: 0x02,
  0xb363: 0x03,
  0xb364: 0x04,
  0xb365: 0x05,
  0xb366: 0x06,
  0xb367: 0x07,
  0xb368: 0x08,
  0xb369: 0x09,
  0xb36a: 0x0a,
  0xb36b: 0x0b,
  0xb36c: 0x0c,
  0xb36d: 0x0d,
  0xb36e: 0x0e,
  0xb36f: 0x0f,
  0xb370: 0x10,
  0xb371: 0x11,
  0xb372: 0x12,
  0xb373: 0x13,
  0xb374: 0x14,
  0xb375: 0x15,
  0xb376: 0x16,
  0xb377: 0x17,
  0xb378: 0x18,
  0xb379: 0x19,
  0xb37a: 0x1a,
  0xb37b: 0x1b,
  0xb37c: 0x1c,
  0xb37d: 0x1d,
  0xb37e: 0x1e,
  0xb37f: 0x1f,
  0xb380: 0x20,
  0xb381: 0x21,
  0xb382: 0x22,
  0xb383: 0x23,
  0xb384: 0x24,
  0xb385: 0x25,
  0xb386: 0x26,
  0xb387: 0x27,
  0xb388: 0x28,
  0xb389: 0x29,
  0xb38a: 0x2a,
  0xb38b: 0x2b,
  0xb38c: 0x2c,
  0xb38d: 0x2d,
  0xb38e: 0x2e,
  0xb38f: 0x2f,
  0xb390: 0x30,
  0xb391: 0x31,
  0xb392: 0x32,
  0xb393: 0x33,
  0xb394: 0x34,
  0xb395: 0x35,
  0xb396: 0x36,
  0xb397: 0x37,
  0xb398: 0x38,
  0xb399: 0x39,
  0xb39a: 0x3a,
  0xb39b: 0x3b,
  0xb39c: 0x3c,
  0xb39d: 0x3d,
  0xb39e: 0x3e,
  0xb39f: 0x3f,
  0xb3a0: 0x40,
  0xb3a1: 0x41,
  0xb3a2: 0x42,
  0xb3a3: 0x43,
  0xb3a4: 0x44,
  0xb3a5: 0x45,
  0xb3a6: 0x46,
  0xb3a7: 0x47,
  0xb3a8: 0x48,
  0xb3a9: 0x49,
  0xb3aa: 0x4a,
  0xb3ab: 0x4b,
  0xb3ac: 0x4c,
  0xb3ad: 0x4d,
  0xb3ae: 0x4e,
  0xb3af: 0x4f,
  0xb3b0: 0x50,
  0xb3b1: 0x51,
  0xb3b2: 0x52,
  0xb3b3: 0x53,
  0xb3b4: 0x54,
  0xb3b5: 0x55,
  0xb3b6: 0x56,
  0xb3b7: 0x57,
  0xb3b8: 0x58,
  0xb3b9: 0x59,
  0xb3ba: 0x5a,
  0xb3bb: 0x5b,
  0xb3bc: 0x5c,
  0xb3bd: 0x5d,
  0xb3be: 0x5e,
  0xb3bf: 0x5f,
  0xb3c0: 0x60,
  0xb3c1: 0x61,
  0xb3c2: 0x62,
  0xb3c3: 0x63,
  0xb3c4: 0x64,
  0xb3c5: 0x65,
  0xb3c6: 0x66,
  0xb3c7: 0x67,
  0xb3c8: 0x68,
  0xb3c9: 0x69,
  0xb3ca: 0x6a,
  0xb3cb: 0x6b,
  0xb3cc: 0x6c,
  0xb3cd: 0x6d,
  0xb3ce: 0x6e,
  0xb3cf: 0x6f,
  0xb3d0: 0x70,
  0xb3d1: 0x71,
  0xb3d2: 0x72,
  0xb3d3: 0x73,
  0xb3d4: 0x74,
  0xb3d5: 0x75,
  0xb3d6: 0x76,
  0xb3d7: 0x77,
  0xb3d8: 0x78,
  0xb3d9: 0x79,
  0xb3da: 0x7a,
  0xb3db: 0x7b,
  0xb3dc: 0x7c,
  0xb3dd: 0x7d,
  0xb3de: 0x7e,
  0xb3df: 0x7f,
  0xb3e0: 0x80
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, Buffer) {

exports.toCallback = function (doWork) {
  return function (input, callback) {
    var res;

    try {
      res = doWork(input);
    } catch (err) {
      process.nextTick(callback, err);
      return;
    }

    process.nextTick(callback, null, res);
  };
};

exports.toBuf = function (doWork, other) {
  return function (input) {
    var result = doWork(input, other);
    return Buffer.from(result, 'hex');
  };
};

exports.fromString = function (doWork, other) {
  return function (_input) {
    var input = Buffer.isBuffer(_input) ? _input.toString() : _input;
    return doWork(input, other);
  };
};

exports.fromNumberTo32BitBuf = function (doWork, other) {
  return function (input) {
    var number = doWork(input, other);
    var bytes = new Array(4);

    for (var i = 0; i < 4; i++) {
      bytes[i] = number & 0xff;
      number = number >> 8;
    }

    return Buffer.from(bytes);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(0).Buffer))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isPromise;

function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array'; // For convenience, let people hash a string, not just a Uint8Array

function normalizeInput(input) {
  var ret;

  if (input instanceof Uint8Array) {
    ret = input;
  } else if (input instanceof Buffer) {
    ret = new Uint8Array(input);
  } else if (typeof input === 'string') {
    ret = new Uint8Array(Buffer.from(input, 'utf8'));
  } else {
    throw new Error(ERROR_MSG_INPUT);
  }

  return ret;
} // Converts a Uint8Array to a hexadecimal string
// For example, toHex([255, 0, 255]) returns "ff00ff"


function toHex(bytes) {
  return Array.prototype.map.call(bytes, function (n) {
    return (n < 16 ? '0' : '') + n.toString(16);
  }).join('');
} // Converts any value in [0...2^32-1] to an 8-character hex string


function uint32ToHex(val) {
  return (0x100000000 + val).toString(16).substring(1);
} // For debugging: prints out hash state in the same format as the RFC
// sample computation exactly, so that you can diff


function debugPrint(label, arr, size) {
  var msg = '\n' + label + ' = ';

  for (var i = 0; i < arr.length; i += 2) {
    if (size === 32) {
      msg += uint32ToHex(arr[i]).toUpperCase();
      msg += ' ';
      msg += uint32ToHex(arr[i + 1]).toUpperCase();
    } else if (size === 64) {
      msg += uint32ToHex(arr[i + 1]).toUpperCase();
      msg += uint32ToHex(arr[i]).toUpperCase();
    } else throw new Error('Invalid size ' + size);

    if (i % 6 === 4) {
      msg += '\n' + new Array(label.length + 4).join(' ');
    } else if (i < arr.length - 2) {
      msg += ' ';
    }
  }

  console.log(msg);
} // For performance testing: generates N bytes of input, hashes M times
// Measures and prints MB/second hash performance each time


function testSpeed(hashFn, N, M) {
  var startMs = new Date().getTime();
  var input = new Uint8Array(N);

  for (var i = 0; i < N; i++) {
    input[i] = i % 256;
  }

  var genMs = new Date().getTime();
  console.log('Generated random input in ' + (genMs - startMs) + 'ms');
  startMs = genMs;

  for (i = 0; i < M; i++) {
    var hashHex = hashFn(input);
    var hashMs = new Date().getTime();
    var ms = hashMs - startMs;
    startMs = hashMs;
    console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...');
    console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND');
  }
}

module.exports = {
  normalizeInput: normalizeInput,
  toHex: toHex,
  debugPrint: debugPrint,
  testSpeed: testSpeed
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mh = __webpack_require__(4);

var multibase = __webpack_require__(55);

var multicodec = __webpack_require__(61);

var codecs = __webpack_require__(9);

var CIDUtil = __webpack_require__(64);

var withIs = __webpack_require__(65);
/**
 * @typedef {Object} SerializedCID
 * @param {string} codec
 * @param {number} version
 * @param {Buffer} multihash
 *
 */

/**
 * Test if the given input is a CID.
 * @function isCID
 * @memberof CID
 * @static
 * @param {any} other
 * @returns {bool}
 */

/**
 * Class representing a CID `<mbase><version><mcodec><mhash>`
 * , as defined in [ipld/cid](https://github.com/multiformats/cid).
 * @class CID
 */


var CID =
/*#__PURE__*/
function () {
  /**
   * Create a new CID.
   *
   * The algorithm for argument input is roughly:
   * ```
   * if (str)
   *   if (1st char is on multibase table) -> CID String
   *   else -> bs58 encoded multihash
   * else if (Buffer)
   *   if (0 or 1) -> CID
   *   else -> multihash
   * else if (Number)
   *   -> construct CID by parts
   *
   * ..if only JS had traits..
   * ```
   *
   * @param {string|Buffer} version
   * @param {string} [codec]
   * @param {Buffer} [multihash]
   *
   * @example
   *
   * new CID(<version>, <codec>, <multihash>)
   * new CID(<cidStr>)
   * new CID(<cid.buffer>)
   * new CID(<multihash>)
   * new CID(<bs58 encoded multihash>)
   * new CID(<cid>)
   *
   */
  function CID(version, codec, multihash) {
    _classCallCheck(this, CID);

    if (module.exports.isCID(version)) {
      var cid = version;
      this.version = cid.version;
      this.codec = cid.codec;
      this.multihash = Buffer.from(cid.multihash);
      return;
    }

    if (typeof version === 'string') {
      if (multibase.isEncoded(version)) {
        // CID String (encoded with multibase)
        var _cid = multibase.decode(version);

        version = parseInt(_cid.slice(0, 1).toString('hex'), 16);
        codec = multicodec.getCodec(_cid.slice(1));
        multihash = multicodec.rmPrefix(_cid.slice(1));
      } else {
        // bs58 string encoded multihash
        codec = 'dag-pb';
        multihash = mh.fromB58String(version);
        version = 0;
      }
    } else if (Buffer.isBuffer(version)) {
      var firstByte = version.slice(0, 1);
      var v = parseInt(firstByte.toString('hex'), 16);

      if (v === 0 || v === 1) {
        // CID
        var _cid2 = version;
        version = v;
        codec = multicodec.getCodec(_cid2.slice(1));
        multihash = multicodec.rmPrefix(_cid2.slice(1));
      } else {
        // multihash
        codec = 'dag-pb';
        multihash = version;
        version = 0;
      }
    }
    /**
     * @type {string}
     */


    this.codec = codec;
    /**
     * @type {number}
     */

    this.version = version;
    /**
     * @type {Buffer}
     */

    this.multihash = multihash;
    CID.validateCID(this);
  }
  /**
   * The CID as a `Buffer`
   *
   * @return {Buffer}
   * @readonly
   *
   * @memberOf CID
   */


  _createClass(CID, [{
    key: "toV0",

    /**
     * Convert to a CID of version `0`.
     *
     * @returns {CID}
     */
    value: function toV0() {
      if (this.codec !== 'dag-pb') {
        throw new Error('Cannot convert a non dag-pb CID to CIDv0');
      }

      var _mh$decode = mh.decode(this.multihash),
          name = _mh$decode.name,
          length = _mh$decode.length;

      if (name !== 'sha2-256') {
        throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
      }

      if (length !== 32) {
        throw new Error('Cannot convert non 32 byte multihash CID to CIDv0');
      }

      return new _CID(0, this.codec, this.multihash);
    }
    /**
     * Convert to a CID of version `1`.
     *
     * @returns {CID}
     */

  }, {
    key: "toV1",
    value: function toV1() {
      return new _CID(1, this.codec, this.multihash);
    }
    /**
     * Encode the CID into a string.
     *
     * @param {string} [base='base58btc'] - Base encoding to use.
     * @returns {string}
     */

  }, {
    key: "toBaseEncodedString",
    value: function toBaseEncodedString(base) {
      base = base || 'base58btc';

      switch (this.version) {
        case 0:
          {
            if (base !== 'base58btc') {
              throw new Error('not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()');
            }

            return mh.toB58String(this.multihash);
          }

        case 1:
          return multibase.encode(base, this.buffer).toString();

        default:
          throw new Error('Unsupported version');
      }
    }
  }, {
    key: "toString",
    value: function toString(base) {
      return this.toBaseEncodedString(base);
    }
    /**
     * Serialize to a plain object.
     *
     * @returns {SerializedCID}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        codec: this.codec,
        version: this.version,
        hash: this.multihash
      };
    }
    /**
     * Compare equality with another CID.
     *
     * @param {CID} other
     * @returns {bool}
     */

  }, {
    key: "equals",
    value: function equals(other) {
      return this.codec === other.codec && this.version === other.version && this.multihash.equals(other.multihash);
    }
    /**
     * Test if the given input is a valid CID object.
     * Throws if it is not.
     *
     * @param {any} other
     * @returns {void}
     */

  }, {
    key: "buffer",
    get: function get() {
      switch (this.version) {
        case 0:
          return this.multihash;

        case 1:
          return Buffer.concat([Buffer.from('01', 'hex'), multicodec.getCodeVarint(this.codec), this.multihash]);

        default:
          throw new Error('unsupported version');
      }
    }
    /**
     * Get the prefix of the CID.
     *
     * @returns {Buffer}
     * @readonly
     */

  }, {
    key: "prefix",
    get: function get() {
      return Buffer.concat([Buffer.from("0".concat(this.version), 'hex'), multicodec.getCodeVarint(this.codec), mh.prefix(this.multihash)]);
    }
  }], [{
    key: "validateCID",
    value: function validateCID(other) {
      var errorMsg = CIDUtil.checkCIDComponents(other);

      if (errorMsg) {
        throw new Error(errorMsg);
      }
    }
  }]);

  return CID;
}();

var _CID = withIs(CID, {
  className: 'CID',
  symbolName: '@ipld/js-cid/CID'
});

_CID.codecs = codecs;
module.exports = _CID;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var varint = __webpack_require__(8);

module.exports = {
  numberToBuffer: numberToBuffer,
  bufferToNumber: bufferToNumber,
  varintBufferEncode: varintBufferEncode,
  varintBufferDecode: varintBufferDecode
};

function bufferToNumber(buf) {
  return parseInt(buf.toString('hex'), 16);
}

function numberToBuffer(num) {
  var hexString = num.toString(16);

  if (hexString.length % 2 === 1) {
    hexString = '0' + hexString;
  }

  return Buffer.from(hexString, 'hex');
}

function varintBufferEncode(input) {
  return Buffer.from(varint.encode(bufferToNumber(input)));
}

function varintBufferDecode(input) {
  return numberToBuffer(varint.decode(input));
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var util = __webpack_require__(10);

var traverse = __webpack_require__(66);

exports = module.exports;
exports.multicodec = 'git-raw';
exports.defaultHashAlg = 'sha1';
var personInfoPaths = ['original', 'name', 'email', 'date'];

exports.resolve = function (binaryBlob, path, callback) {
  if (typeof path === 'function') {
    callback = path;
    path = undefined;
  }

  util.deserialize(binaryBlob, function (err, node) {
    if (err) {
      return callback(err);
    }

    if (!path || path === '/') {
      return callback(null, {
        value: node,
        remainderPath: ''
      });
    }

    if (Buffer.isBuffer(node)) {
      // git blob
      return callback(null, {
        value: node,
        remainderPath: path
      });
    }

    var parts = path.split('/');
    var val = traverse(node).get(parts);

    if (val) {
      return callback(null, {
        value: val,
        remainderPath: ''
      });
    }

    var value;
    var len = parts.length;

    for (var i = 0; i < len; i++) {
      var partialPath = parts.shift();

      if (Array.isArray(node)) {
        value = node[Number(partialPath)];
      }

      if (node[partialPath]) {
        value = node[partialPath];
      } else {
        // can't traverse more
        if (!value) {
          return callback(new Error('path not available at root'));
        } else {
          parts.unshift(partialPath);
          return callback(null, {
            value: value,
            remainderPath: parts.join('/')
          });
        }
      }

      node = value;
    }
  });
};

exports.tree = function (binaryBlob, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  options = options || {};
  util.deserialize(binaryBlob, function (err, node) {
    if (err) {
      return callback(err);
    }

    if (Buffer.isBuffer(node)) {
      // git blob
      return callback(null, []);
    }

    var paths = [];

    switch (node.gitType) {
      case 'commit':
        paths = ['message', 'tree'];
        paths = paths.concat(personInfoPaths.map(function (e) {
          return 'author/' + e;
        }));
        paths = paths.concat(personInfoPaths.map(function (e) {
          return 'committer/' + e;
        }));
        paths = paths.concat(node.parents.map(function (_, e) {
          return 'parents/' + e;
        }));

        if (node.encoding) {
          paths.push('encoding');
        }

        break;

      case 'tag':
        paths = ['object', 'type', 'tag', 'message'];

        if (node.tagger) {
          paths = paths.concat(personInfoPaths.map(function (e) {
            return 'tagger/' + e;
          }));
        }

        break;

      default:
        // tree
        Object.keys(node).forEach(function (dir) {
          paths.push(dir);
          paths.push(dir + '/hash');
          paths.push(dir + '/mode');
        });
    }

    callback(null, paths);
  });
};

exports.isLink = function (binaryBlob, path, callback) {
  exports.resolve(binaryBlob, path, function (err, result) {
    if (err) {
      return callback(err);
    }

    if (result.remainderPath.length > 0) {
      return callback(new Error('path out of scope'));
    }

    if (_typeof(result.value) === 'object' && result.value['/']) {
      callback(null, result.value);
    } else {
      callback(null, false);
    }
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.util = __webpack_require__(10);
exports.resolver = __webpack_require__(20);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

  for (var i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function registerImmediate(handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function onGlobalMessage(event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function registerImmediate(handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function registerImmediate(handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function registerImmediate(handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function registerImmediate(handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? void 0 : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2), __webpack_require__(1)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tasks, callback) {
  callback = (0, _once2.default)(callback || _noop2.default);
  if (!(0, _isArray2.default)(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
  if (!tasks.length) return callback();
  var taskIndex = 0;

  function nextTask(args) {
    var task = (0, _wrapAsync2.default)(tasks[taskIndex++]);
    args.push((0, _onlyOnce2.default)(next));
    task.apply(null, args);
  }

  function next(err
  /*, ...args*/
  ) {
    if (err || taskIndex === tasks.length) {
      return callback.apply(null, arguments);
    }

    nextTask((0, _slice2.default)(arguments, 1));
  }

  nextTask([]);
};

var _isArray = __webpack_require__(28);

var _isArray2 = _interopRequireDefault(_isArray);

var _noop = __webpack_require__(29);

var _noop2 = _interopRequireDefault(_noop);

var _once = __webpack_require__(30);

var _once2 = _interopRequireDefault(_once);

var _slice = __webpack_require__(7);

var _slice2 = _interopRequireDefault(_slice);

var _onlyOnce = __webpack_require__(31);

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

var _wrapAsync = __webpack_require__(32);

var _wrapAsync2 = _interopRequireDefault(_wrapAsync);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = exports['default'];
/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
 *
 * @name waterfall
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
 * to run.
 * Each function should complete with any number of `result` values.
 * The `result` values will be passed as arguments, in order, to the next task.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This will be passed the results of the last task's
 * callback. Invoked with (err, [results]).
 * @returns undefined
 * @example
 *
 * async.waterfall([
 *     function(callback) {
 *         callback(null, 'one', 'two');
 *     },
 *     function(arg1, arg2, callback) {
 *         // arg1 now equals 'one' and arg2 now equals 'two'
 *         callback(null, 'three');
 *     },
 *     function(arg1, callback) {
 *         // arg1 now equals 'three'
 *         callback(null, 'done');
 *     }
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 *
 * // Or, with named functions:
 * async.waterfall([
 *     myFirstFunction,
 *     mySecondFunction,
 *     myLastFunction,
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 * function myFirstFunction(callback) {
 *     callback(null, 'one', 'two');
 * }
 * function mySecondFunction(arg1, arg2, callback) {
 *     // arg1 now equals 'one' and arg2 now equals 'two'
 *     callback(null, 'three');
 * }
 * function myLastFunction(arg1, callback) {
 *     // arg1 now equals 'three'
 *     callback(null, 'done');
 * }
 */

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {// No operation performed.
}

module.exports = noop;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = once;

function once(fn) {
  return function () {
    if (fn === null) return;
    var callFn = fn;
    fn = null;
    callFn.apply(this, arguments);
  };
}

module.exports = exports["default"];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onlyOnce;

function onlyOnce(fn) {
  return function () {
    if (fn === null) throw new Error("Callback was already called.");
    var callFn = fn;
    fn = null;
    callFn.apply(this, arguments);
  };
}

module.exports = exports["default"];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAsync = undefined;

var _asyncify = __webpack_require__(33);

var _asyncify2 = _interopRequireDefault(_asyncify);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
  return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
  return isAsync(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;
}

exports.default = wrapAsync;
exports.isAsync = isAsync;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncify;

var _isObject = __webpack_require__(34);

var _isObject2 = _interopRequireDefault(_isObject);

var _initialParams = __webpack_require__(35);

var _initialParams2 = _interopRequireDefault(_initialParams);

var _setImmediate = __webpack_require__(11);

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */


function asyncify(func) {
  return (0, _initialParams2.default)(function (args, callback) {
    var result;

    try {
      result = func.apply(this, args);
    } catch (e) {
      return callback(e);
    } // if result is Promise object


    if ((0, _isObject2.default)(result) && typeof result.then === 'function') {
      result.then(function (value) {
        invokeCallback(callback, null, value);
      }, function (err) {
        invokeCallback(callback, err.message ? err : new Error(err));
      });
    } else {
      callback(null, result);
    }
  });
}

function invokeCallback(callback, error, value) {
  try {
    callback(error, value);
  } catch (e) {
    (0, _setImmediate2.default)(rethrow, e);
  }
}

function rethrow(error) {
  throw error;
}

module.exports = exports['default'];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  return function ()
  /*...args, callback*/
  {
    var args = (0, _slice2.default)(arguments);
    var callback = args.pop();
    fn.call(this, args, callback);
  };
};

var _slice = __webpack_require__(7);

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var multihash = __webpack_require__(4);

var crypto = __webpack_require__(42);

module.exports = Multihashing;
/**
 * Hash the given `buf` using the algorithm specified
 * by `func`.
 *
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} func - The algorithm to use.
 * @param {number} [length] - Optionally trim the result to this length.
 * @param {function(Error, Buffer)} callback
 * @returns {undefined}
 */

function Multihashing(buf, func, length, callback) {
  if (typeof length === 'function') {
    callback = length;
    length = undefined;
  }

  if (!callback) {
    throw new Error('Missing callback');
  }

  Multihashing.digest(buf, func, length, function (err, digest) {
    if (err) {
      return callback(err);
    }

    callback(null, multihash.encode(digest, func, length));
  });
}
/**
 * The `buffer` module for easy use in the browser.
 *
 * @type {Buffer}
 */


Multihashing.Buffer = Buffer; // for browser things

/**
 * Expose multihash itself, to avoid silly double requires.
 */

Multihashing.multihash = multihash;
/**
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} func - The algorithm to use.
 * @param {number} [length] - Optionally trim the result to this length.
 * @param {function(Error, Buffer)} callback
 * @returns {undefined}
 */

Multihashing.digest = function (buf, func, length, callback) {
  if (typeof length === 'function') {
    callback = length;
    length = undefined;
  }

  if (!callback) {
    throw new Error('Missing callback');
  }

  var cb = callback;

  if (length) {
    cb = function cb(err, digest) {
      if (err) {
        return callback(err);
      }

      callback(null, digest.slice(0, length));
    };
  }

  var hash;

  try {
    hash = Multihashing.createHash(func);
  } catch (err) {
    return cb(err);
  }

  hash(buf, cb);
};
/**
 * @param {string|number} func
 *
 * @returns {function} - The to `func` corresponding hash function.
 */


Multihashing.createHash = function (func) {
  func = multihash.coerceCode(func);

  if (!Multihashing.functions[func]) {
    throw new Error('multihash function ' + func + ' not yet supported');
  }

  return Multihashing.functions[func];
};
/**
 * Mapping of multihash codes to their hashing functions.
 * @type {Object}
 */


Multihashing.functions = {
  // sha1
  0x11: crypto.sha1,
  // sha2-256
  0x12: crypto.sha2256,
  // sha2-512
  0x13: crypto.sha2512,
  // sha3-512
  0x14: crypto.sha3512,
  // sha3-384
  0x15: crypto.sha3384,
  // sha3-256
  0x16: crypto.sha3256,
  // sha3-224
  0x17: crypto.sha3224,
  // shake-128
  0x18: crypto.shake128,
  // shake-256
  0x19: crypto.shake256,
  // keccak-224
  0x1A: crypto.keccak224,
  // keccak-256
  0x1B: crypto.keccak256,
  // keccak-384
  0x1C: crypto.keccak384,
  // keccak-512
  0x1D: crypto.keccak512,
  // murmur3-128
  0x22: crypto.murmur3128,
  // murmur3-32
  0x23: crypto.murmur332,
  // dbl-sha2-256
  0x56: crypto.dblSha2256 // add blake functions

};
crypto.addBlake(Multihashing.functions);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var basex = __webpack_require__(13);

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
module.exports = basex(ALPHABET);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(0);

var Buffer = buffer.Buffer; // alternative to using Object.keys for old browsers

function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
} // Copy static methods from Buffer


copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number');
  }

  return Buffer(arg, encodingOrOffset, length);
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  var buf = Buffer(size);

  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }

  return buf;
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return Buffer(size);
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return buffer.SlowBuffer(size);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = encode;
var MSB = 0x80,
    REST = 0x7F,
    MSBALL = ~REST,
    INT = Math.pow(2, 31);

function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;

  while (num >= INT) {
    out[offset++] = num & 0xFF | MSB;
    num /= 128;
  }

  while (num & MSBALL) {
    out[offset++] = num & 0xFF | MSB;
    num >>>= 7;
  }

  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = read;
var MSB = 0x80,
    REST = 0x7F;

function read(buf, offset) {
  var res = 0,
      offset = offset || 0,
      shift = 0,
      counter = offset,
      b,
      l = buf.length;

  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError('Could not decode varint');
    }

    b = buf[counter++];
    res += shift < 28 ? (b & REST) << shift : (b & REST) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB);

  read.bytes = counter - offset;
  return res;
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);

module.exports = function (value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var sha3 = __webpack_require__(43);

var murmur3 = __webpack_require__(46);

var utils = __webpack_require__(15);

var sha = __webpack_require__(48);

var toCallback = utils.toCallback;
var toBuf = utils.toBuf;
var fromString = utils.fromString;
var fromNumberTo32BitBuf = utils.fromNumberTo32BitBuf;

var dblSha2256 = function dblSha2256(buf, cb) {
  sha.sha2256(buf, function (err, firstHash) {
    if (err) {
      cb(err);
    }

    sha.sha2256(Buffer.from(firstHash), cb);
  });
};

module.exports = {
  sha1: sha.sha1,
  sha2256: sha.sha2256,
  sha2512: sha.sha2512,
  sha3512: toCallback(toBuf(sha3.sha3_512)),
  sha3384: toCallback(toBuf(sha3.sha3_384)),
  sha3256: toCallback(toBuf(sha3.sha3_256)),
  sha3224: toCallback(toBuf(sha3.sha3_224)),
  shake128: toCallback(toBuf(sha3.shake_128, 128)),
  shake256: toCallback(toBuf(sha3.shake_256, 256)),
  keccak224: toCallback(toBuf(sha3.keccak_224)),
  keccak256: toCallback(toBuf(sha3.keccak_256)),
  keccak384: toCallback(toBuf(sha3.keccak_384)),
  keccak512: toCallback(toBuf(sha3.keccak_512)),
  murmur3128: toCallback(toBuf(fromString(murmur3.x64.hash128))),
  murmur332: toCallback(fromNumberTo32BitBuf(fromString(murmur3.x86.hash32))),
  addBlake: __webpack_require__(51),
  dblSha2256: dblSha2256
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */

/*jslint bitwise: true */
(function () {
  'use strict';

  var INPUT_ERROR = 'input is invalid type';
  var FINALIZE_ERROR = 'finalize already called';
  var WINDOW = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';
  var root = WINDOW ? window : {};

  if (root.JS_SHA3_NO_WINDOW) {
    WINDOW = false;
  }

  var WEB_WORKER = !WINDOW && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object';
  var NODE_JS = !root.JS_SHA3_NO_NODE_JS && (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.versions && process.versions.node;

  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }

  var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && ( false ? undefined : _typeof(module)) === 'object' && module.exports;
  var AMD =  true && __webpack_require__(45);
  var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
  var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
  var KECCAK_PADDING = [1, 256, 65536, 16777216];
  var PADDING = [6, 1536, 393216, 100663296];
  var SHIFT = [0, 8, 16, 24];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  var BITS = [224, 256, 384, 512];
  var SHAKE_BITS = [128, 256];
  var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
  var CSHAKE_BYTEPAD = {
    '128': 168,
    '256': 136
  };

  if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return _typeof(obj) === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function createOutputMethod(bits, padding, outputType) {
    return function (message) {
      return new Keccak(bits, padding, bits).update(message)[outputType]();
    };
  };

  var createShakeOutputMethod = function createShakeOutputMethod(bits, padding, outputType) {
    return function (message, outputBits) {
      return new Keccak(bits, padding, outputBits).update(message)[outputType]();
    };
  };

  var createCshakeOutputMethod = function createCshakeOutputMethod(bits, padding, outputType) {
    return function (message, outputBits, n, s) {
      return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
    };
  };

  var createKmacOutputMethod = function createKmacOutputMethod(bits, padding, outputType) {
    return function (key, message, outputBits, s) {
      return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
    };
  };

  var createOutputMethods = function createOutputMethods(method, createMethod, bits, padding) {
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createMethod(bits, padding, type);
    }

    return method;
  };

  var createMethod = function createMethod(bits, padding) {
    var method = createOutputMethod(bits, padding, 'hex');

    method.create = function () {
      return new Keccak(bits, padding, bits);
    };

    method.update = function (message) {
      return method.create().update(message);
    };

    return createOutputMethods(method, createOutputMethod, bits, padding);
  };

  var createShakeMethod = function createShakeMethod(bits, padding) {
    var method = createShakeOutputMethod(bits, padding, 'hex');

    method.create = function (outputBits) {
      return new Keccak(bits, padding, outputBits);
    };

    method.update = function (message, outputBits) {
      return method.create(outputBits).update(message);
    };

    return createOutputMethods(method, createShakeOutputMethod, bits, padding);
  };

  var createCshakeMethod = function createCshakeMethod(bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createCshakeOutputMethod(bits, padding, 'hex');

    method.create = function (outputBits, n, s) {
      if (!n && !s) {
        return methods['shake' + bits].create(outputBits);
      } else {
        return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
      }
    };

    method.update = function (message, outputBits, n, s) {
      return method.create(outputBits, n, s).update(message);
    };

    return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
  };

  var createKmacMethod = function createKmacMethod(bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createKmacOutputMethod(bits, padding, 'hex');

    method.create = function (key, outputBits, s) {
      return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
    };

    method.update = function (key, message, outputBits, s) {
      return method.create(key, outputBits, s).update(message);
    };

    return createOutputMethods(method, createKmacOutputMethod, bits, padding);
  };

  var algorithms = [{
    name: 'keccak',
    padding: KECCAK_PADDING,
    bits: BITS,
    createMethod: createMethod
  }, {
    name: 'sha3',
    padding: PADDING,
    bits: BITS,
    createMethod: createMethod
  }, {
    name: 'shake',
    padding: SHAKE_PADDING,
    bits: SHAKE_BITS,
    createMethod: createShakeMethod
  }, {
    name: 'cshake',
    padding: CSHAKE_PADDING,
    bits: SHAKE_BITS,
    createMethod: createCshakeMethod
  }, {
    name: 'kmac',
    padding: CSHAKE_PADDING,
    bits: SHAKE_BITS,
    createMethod: createKmacMethod
  }];
  var methods = {},
      methodNames = [];

  for (var i = 0; i < algorithms.length; ++i) {
    var algorithm = algorithms[i];
    var bits = algorithm.bits;

    for (var j = 0; j < bits.length; ++j) {
      var methodName = algorithm.name + '_' + bits[j];
      methodNames.push(methodName);
      methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);

      if (algorithm.name !== 'sha3') {
        var newMethodName = algorithm.name + bits[j];
        methodNames.push(newMethodName);
        methods[newMethodName] = methods[methodName];
      }
    }
  }

  function Keccak(bits, padding, outputBits) {
    this.blocks = [];
    this.s = [];
    this.padding = padding;
    this.outputBits = outputBits;
    this.reset = true;
    this.finalized = false;
    this.block = 0;
    this.start = 0;
    this.blockCount = 1600 - (bits << 1) >> 5;
    this.byteCount = this.blockCount << 2;
    this.outputBlocks = outputBits >> 5;
    this.extraBytes = (outputBits & 31) >> 3;

    for (var i = 0; i < 50; ++i) {
      this.s[i] = 0;
    }
  }

  Keccak.prototype.update = function (message) {
    if (this.finalized) {
      throw new Error(FINALIZE_ERROR);
    }

    var notString,
        type = _typeof(message);

    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }

      notString = true;
    }

    var blocks = this.blocks,
        byteCount = this.byteCount,
        length = message.length,
        blockCount = this.blockCount,
        index = 0,
        s = this.s,
        i,
        code;

    while (index < length) {
      if (this.reset) {
        this.reset = false;
        blocks[0] = this.block;

        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }

      if (notString) {
        for (i = this.start; index < length && i < byteCount; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < byteCount; ++index) {
          code = message.charCodeAt(index);

          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
            blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;

      if (i >= byteCount) {
        this.start = i - byteCount;
        this.block = blocks[blockCount];

        for (i = 0; i < blockCount; ++i) {
          s[i] ^= blocks[i];
        }

        f(s);
        this.reset = true;
      } else {
        this.start = i;
      }
    }

    return this;
  };

  Keccak.prototype.encode = function (x, right) {
    var o = x & 255,
        n = 1;
    var bytes = [o];
    x = x >> 8;
    o = x & 255;

    while (o > 0) {
      bytes.unshift(o);
      x = x >> 8;
      o = x & 255;
      ++n;
    }

    if (right) {
      bytes.push(n);
    } else {
      bytes.unshift(n);
    }

    this.update(bytes);
    return bytes.length;
  };

  Keccak.prototype.encodeString = function (str) {
    var notString,
        type = _typeof(str);

    if (type !== 'string') {
      if (type === 'object') {
        if (str === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
          str = new Uint8Array(str);
        } else if (!Array.isArray(str)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }

      notString = true;
    }

    var bytes = 0,
        length = str.length;

    if (notString) {
      bytes = length;
    } else {
      for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);

        if (code < 0x80) {
          bytes += 1;
        } else if (code < 0x800) {
          bytes += 2;
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes += 3;
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | str.charCodeAt(++i) & 0x3ff);
          bytes += 4;
        }
      }
    }

    bytes += this.encode(bytes * 8);
    this.update(str);
    return bytes;
  };

  Keccak.prototype.bytepad = function (strs, w) {
    var bytes = this.encode(w);

    for (var i = 0; i < strs.length; ++i) {
      bytes += this.encodeString(strs[i]);
    }

    var paddingBytes = w - bytes % w;
    var zeros = [];
    zeros.length = paddingBytes;
    this.update(zeros);
    return this;
  };

  Keccak.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }

    this.finalized = true;
    var blocks = this.blocks,
        i = this.lastByteIndex,
        blockCount = this.blockCount,
        s = this.s;
    blocks[i >> 2] |= this.padding[i & 3];

    if (this.lastByteIndex === this.byteCount) {
      blocks[0] = blocks[blockCount];

      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }

    blocks[blockCount - 1] |= 0x80000000;

    for (i = 0; i < blockCount; ++i) {
      s[i] ^= blocks[i];
    }

    f(s);
  };

  Keccak.prototype.toString = Keccak.prototype.hex = function () {
    this.finalize();
    var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
    var hex = '',
        block;

    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        block = s[i];
        hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
      }

      if (j % blockCount === 0) {
        f(s);
        i = 0;
      }
    }

    if (extraBytes) {
      block = s[i];
      hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F];

      if (extraBytes > 1) {
        hex += HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F];
      }

      if (extraBytes > 2) {
        hex += HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F];
      }
    }

    return hex;
  };

  Keccak.prototype.arrayBuffer = function () {
    this.finalize();
    var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
    var bytes = this.outputBits >> 3;
    var buffer;

    if (extraBytes) {
      buffer = new ArrayBuffer(outputBlocks + 1 << 2);
    } else {
      buffer = new ArrayBuffer(bytes);
    }

    var array = new Uint32Array(buffer);

    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        array[j] = s[i];
      }

      if (j % blockCount === 0) {
        f(s);
      }
    }

    if (extraBytes) {
      array[i] = s[i];
      buffer = buffer.slice(0, bytes);
    }

    return buffer;
  };

  Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

  Keccak.prototype.digest = Keccak.prototype.array = function () {
    this.finalize();
    var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
    var array = [],
        offset,
        block;

    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        array[offset + 1] = block >> 8 & 0xFF;
        array[offset + 2] = block >> 16 & 0xFF;
        array[offset + 3] = block >> 24 & 0xFF;
      }

      if (j % blockCount === 0) {
        f(s);
      }
    }

    if (extraBytes) {
      offset = j << 2;
      block = s[i];
      array[offset] = block & 0xFF;

      if (extraBytes > 1) {
        array[offset + 1] = block >> 8 & 0xFF;
      }

      if (extraBytes > 2) {
        array[offset + 2] = block >> 16 & 0xFF;
      }
    }

    return array;
  };

  function Kmac(bits, padding, outputBits) {
    Keccak.call(this, bits, padding, outputBits);
  }

  Kmac.prototype = new Keccak();

  Kmac.prototype.finalize = function () {
    this.encode(this.outputBits, true);
    return Keccak.prototype.finalize.call(this);
  };

  var f = function f(s) {
    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

    for (n = 0; n < 48; n += 2) {
      c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
      c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
      c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
      c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
      c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
      c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
      c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
      c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
      c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
      c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
      h = c8 ^ (c2 << 1 | c3 >>> 31);
      l = c9 ^ (c3 << 1 | c2 >>> 31);
      s[0] ^= h;
      s[1] ^= l;
      s[10] ^= h;
      s[11] ^= l;
      s[20] ^= h;
      s[21] ^= l;
      s[30] ^= h;
      s[31] ^= l;
      s[40] ^= h;
      s[41] ^= l;
      h = c0 ^ (c4 << 1 | c5 >>> 31);
      l = c1 ^ (c5 << 1 | c4 >>> 31);
      s[2] ^= h;
      s[3] ^= l;
      s[12] ^= h;
      s[13] ^= l;
      s[22] ^= h;
      s[23] ^= l;
      s[32] ^= h;
      s[33] ^= l;
      s[42] ^= h;
      s[43] ^= l;
      h = c2 ^ (c6 << 1 | c7 >>> 31);
      l = c3 ^ (c7 << 1 | c6 >>> 31);
      s[4] ^= h;
      s[5] ^= l;
      s[14] ^= h;
      s[15] ^= l;
      s[24] ^= h;
      s[25] ^= l;
      s[34] ^= h;
      s[35] ^= l;
      s[44] ^= h;
      s[45] ^= l;
      h = c4 ^ (c8 << 1 | c9 >>> 31);
      l = c5 ^ (c9 << 1 | c8 >>> 31);
      s[6] ^= h;
      s[7] ^= l;
      s[16] ^= h;
      s[17] ^= l;
      s[26] ^= h;
      s[27] ^= l;
      s[36] ^= h;
      s[37] ^= l;
      s[46] ^= h;
      s[47] ^= l;
      h = c6 ^ (c0 << 1 | c1 >>> 31);
      l = c7 ^ (c1 << 1 | c0 >>> 31);
      s[8] ^= h;
      s[9] ^= l;
      s[18] ^= h;
      s[19] ^= l;
      s[28] ^= h;
      s[29] ^= l;
      s[38] ^= h;
      s[39] ^= l;
      s[48] ^= h;
      s[49] ^= l;
      b0 = s[0];
      b1 = s[1];
      b32 = s[11] << 4 | s[10] >>> 28;
      b33 = s[10] << 4 | s[11] >>> 28;
      b14 = s[20] << 3 | s[21] >>> 29;
      b15 = s[21] << 3 | s[20] >>> 29;
      b46 = s[31] << 9 | s[30] >>> 23;
      b47 = s[30] << 9 | s[31] >>> 23;
      b28 = s[40] << 18 | s[41] >>> 14;
      b29 = s[41] << 18 | s[40] >>> 14;
      b20 = s[2] << 1 | s[3] >>> 31;
      b21 = s[3] << 1 | s[2] >>> 31;
      b2 = s[13] << 12 | s[12] >>> 20;
      b3 = s[12] << 12 | s[13] >>> 20;
      b34 = s[22] << 10 | s[23] >>> 22;
      b35 = s[23] << 10 | s[22] >>> 22;
      b16 = s[33] << 13 | s[32] >>> 19;
      b17 = s[32] << 13 | s[33] >>> 19;
      b48 = s[42] << 2 | s[43] >>> 30;
      b49 = s[43] << 2 | s[42] >>> 30;
      b40 = s[5] << 30 | s[4] >>> 2;
      b41 = s[4] << 30 | s[5] >>> 2;
      b22 = s[14] << 6 | s[15] >>> 26;
      b23 = s[15] << 6 | s[14] >>> 26;
      b4 = s[25] << 11 | s[24] >>> 21;
      b5 = s[24] << 11 | s[25] >>> 21;
      b36 = s[34] << 15 | s[35] >>> 17;
      b37 = s[35] << 15 | s[34] >>> 17;
      b18 = s[45] << 29 | s[44] >>> 3;
      b19 = s[44] << 29 | s[45] >>> 3;
      b10 = s[6] << 28 | s[7] >>> 4;
      b11 = s[7] << 28 | s[6] >>> 4;
      b42 = s[17] << 23 | s[16] >>> 9;
      b43 = s[16] << 23 | s[17] >>> 9;
      b24 = s[26] << 25 | s[27] >>> 7;
      b25 = s[27] << 25 | s[26] >>> 7;
      b6 = s[36] << 21 | s[37] >>> 11;
      b7 = s[37] << 21 | s[36] >>> 11;
      b38 = s[47] << 24 | s[46] >>> 8;
      b39 = s[46] << 24 | s[47] >>> 8;
      b30 = s[8] << 27 | s[9] >>> 5;
      b31 = s[9] << 27 | s[8] >>> 5;
      b12 = s[18] << 20 | s[19] >>> 12;
      b13 = s[19] << 20 | s[18] >>> 12;
      b44 = s[29] << 7 | s[28] >>> 25;
      b45 = s[28] << 7 | s[29] >>> 25;
      b26 = s[38] << 8 | s[39] >>> 24;
      b27 = s[39] << 8 | s[38] >>> 24;
      b8 = s[48] << 14 | s[49] >>> 18;
      b9 = s[49] << 14 | s[48] >>> 18;
      s[0] = b0 ^ ~b2 & b4;
      s[1] = b1 ^ ~b3 & b5;
      s[10] = b10 ^ ~b12 & b14;
      s[11] = b11 ^ ~b13 & b15;
      s[20] = b20 ^ ~b22 & b24;
      s[21] = b21 ^ ~b23 & b25;
      s[30] = b30 ^ ~b32 & b34;
      s[31] = b31 ^ ~b33 & b35;
      s[40] = b40 ^ ~b42 & b44;
      s[41] = b41 ^ ~b43 & b45;
      s[2] = b2 ^ ~b4 & b6;
      s[3] = b3 ^ ~b5 & b7;
      s[12] = b12 ^ ~b14 & b16;
      s[13] = b13 ^ ~b15 & b17;
      s[22] = b22 ^ ~b24 & b26;
      s[23] = b23 ^ ~b25 & b27;
      s[32] = b32 ^ ~b34 & b36;
      s[33] = b33 ^ ~b35 & b37;
      s[42] = b42 ^ ~b44 & b46;
      s[43] = b43 ^ ~b45 & b47;
      s[4] = b4 ^ ~b6 & b8;
      s[5] = b5 ^ ~b7 & b9;
      s[14] = b14 ^ ~b16 & b18;
      s[15] = b15 ^ ~b17 & b19;
      s[24] = b24 ^ ~b26 & b28;
      s[25] = b25 ^ ~b27 & b29;
      s[34] = b34 ^ ~b36 & b38;
      s[35] = b35 ^ ~b37 & b39;
      s[44] = b44 ^ ~b46 & b48;
      s[45] = b45 ^ ~b47 & b49;
      s[6] = b6 ^ ~b8 & b0;
      s[7] = b7 ^ ~b9 & b1;
      s[16] = b16 ^ ~b18 & b10;
      s[17] = b17 ^ ~b19 & b11;
      s[26] = b26 ^ ~b28 & b20;
      s[27] = b27 ^ ~b29 & b21;
      s[36] = b36 ^ ~b38 & b30;
      s[37] = b37 ^ ~b39 & b31;
      s[46] = b46 ^ ~b48 & b40;
      s[47] = b47 ^ ~b49 & b41;
      s[8] = b8 ^ ~b0 & b2;
      s[9] = b9 ^ ~b1 & b3;
      s[18] = b18 ^ ~b10 & b12;
      s[19] = b19 ^ ~b11 & b13;
      s[28] = b28 ^ ~b20 & b22;
      s[29] = b29 ^ ~b21 & b23;
      s[38] = b38 ^ ~b30 & b32;
      s[39] = b39 ^ ~b31 & b33;
      s[48] = b48 ^ ~b40 & b42;
      s[49] = b49 ^ ~b41 & b43;
      s[0] ^= RC[n];
      s[1] ^= RC[n + 1];
    }
  };

  if (COMMON_JS) {
    module.exports = methods;
  } else {
    for (i = 0; i < methodNames.length; ++i) {
      root[methodNames[i]] = methods[methodNames[i]];
    }

    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return methods;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(2), __webpack_require__(44)(module)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(47);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* jshint -W086: true */
// +----------------------------------------------------------------------+
// | murmurHash3js.js v3.0.1 // https://github.com/pid/murmurHash3js
// | A javascript implementation of MurmurHash3's x86 hashing algorithms. |
// |----------------------------------------------------------------------|
// | Copyright (c) 2012-2015 Karan Lyons                                       |
// | https://github.com/karanlyons/murmurHash3.js/blob/c1778f75792abef7bdd74bc85d2d4e1a3d25cfe9/murmurHash3.js |
// | Freely distributable under the MIT license.                          |
// +----------------------------------------------------------------------+
;

(function (root, undefined) {
  'use strict'; // Create a local object that'll be exported or referenced globally.

  var library = {
    'version': '3.0.1',
    'x86': {},
    'x64': {}
  }; // PRIVATE FUNCTIONS
  // -----------------

  function _x86Multiply(m, n) {
    //
    // Given two 32bit ints, returns the two multiplied together as a
    // 32bit int.
    //
    return (m & 0xffff) * n + (((m >>> 16) * n & 0xffff) << 16);
  }

  function _x86Rotl(m, n) {
    //
    // Given a 32bit int and an int representing a number of bit positions,
    // returns the 32bit int rotated left by that number of positions.
    //
    return m << n | m >>> 32 - n;
  }

  function _x86Fmix(h) {
    //
    // Given a block, returns murmurHash3's final x86 mix of that block.
    //
    h ^= h >>> 16;
    h = _x86Multiply(h, 0x85ebca6b);
    h ^= h >>> 13;
    h = _x86Multiply(h, 0xc2b2ae35);
    h ^= h >>> 16;
    return h;
  }

  function _x64Add(m, n) {
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // added together as a 64bit int (as an array of two 32bit ints).
    //
    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
    var o = [0, 0, 0, 0];
    o[3] += m[3] + n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 0xffff;
    o[2] += m[2] + n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 0xffff;
    o[1] += m[1] + n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;
    o[0] += m[0] + n[0];
    o[0] &= 0xffff;
    return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
  }

  function _x64Multiply(m, n) {
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // multiplied together as a 64bit int (as an array of two 32bit ints).
    //
    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
    var o = [0, 0, 0, 0];
    o[3] += m[3] * n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 0xffff;
    o[2] += m[2] * n[3];
    o[1] += o[2] >>> 16;
    o[2] &= 0xffff;
    o[2] += m[3] * n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 0xffff;
    o[1] += m[1] * n[3];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;
    o[1] += m[2] * n[2];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;
    o[1] += m[3] * n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 0xffff;
    o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
    o[0] &= 0xffff;
    return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
  }

  function _x64Rotl(m, n) {
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) rotated left by that number of positions.
    //
    n %= 64;

    if (n === 32) {
      return [m[1], m[0]];
    } else if (n < 32) {
      return [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n];
    } else {
      n -= 32;
      return [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n];
    }
  }

  function _x64LeftShift(m, n) {
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) shifted left by that number of positions.
    //
    n %= 64;

    if (n === 0) {
      return m;
    } else if (n < 32) {
      return [m[0] << n | m[1] >>> 32 - n, m[1] << n];
    } else {
      return [m[1] << n - 32, 0];
    }
  }

  function _x64Xor(m, n) {
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // xored together as a 64bit int (as an array of two 32bit ints).
    //
    return [m[0] ^ n[0], m[1] ^ n[1]];
  }

  function _x64Fmix(h) {
    //
    // Given a block, returns murmurHash3's final x64 mix of that block.
    // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
    // only place where we need to right shift 64bit ints.)
    //
    h = _x64Xor(h, [0, h[0] >>> 1]);
    h = _x64Multiply(h, [0xff51afd7, 0xed558ccd]);
    h = _x64Xor(h, [0, h[0] >>> 1]);
    h = _x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
    h = _x64Xor(h, [0, h[0] >>> 1]);
    return h;
  } // PUBLIC FUNCTIONS
  // ----------------


  library.x86.hash32 = function (key, seed) {
    //
    // Given a string and an optional seed as an int, returns a 32 bit hash
    // using the x86 flavor of MurmurHash3, as an unsigned int.
    //
    key = key || '';
    seed = seed || 0;
    var remainder = key.length % 4;
    var bytes = key.length - remainder;
    var h1 = seed;
    var k1 = 0;
    var c1 = 0xcc9e2d51;
    var c2 = 0x1b873593;

    for (var i = 0; i < bytes; i = i + 4) {
      k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(i + 1) & 0xff) << 8 | (key.charCodeAt(i + 2) & 0xff) << 16 | (key.charCodeAt(i + 3) & 0xff) << 24;
      k1 = _x86Multiply(k1, c1);
      k1 = _x86Rotl(k1, 15);
      k1 = _x86Multiply(k1, c2);
      h1 ^= k1;
      h1 = _x86Rotl(h1, 13);
      h1 = _x86Multiply(h1, 5) + 0xe6546b64;
    }

    k1 = 0;

    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;

      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;

      case 1:
        k1 ^= key.charCodeAt(i) & 0xff;
        k1 = _x86Multiply(k1, c1);
        k1 = _x86Rotl(k1, 15);
        k1 = _x86Multiply(k1, c2);
        h1 ^= k1;
    }

    h1 ^= key.length;
    h1 = _x86Fmix(h1);
    return h1 >>> 0;
  };

  library.x86.hash128 = function (key, seed) {
    //
    // Given a string and an optional seed as an int, returns a 128 bit
    // hash using the x86 flavor of MurmurHash3, as an unsigned hex.
    //
    key = key || '';
    seed = seed || 0;
    var remainder = key.length % 16;
    var bytes = key.length - remainder;
    var h1 = seed;
    var h2 = seed;
    var h3 = seed;
    var h4 = seed;
    var k1 = 0;
    var k2 = 0;
    var k3 = 0;
    var k4 = 0;
    var c1 = 0x239b961b;
    var c2 = 0xab0e9789;
    var c3 = 0x38b34ae5;
    var c4 = 0xa1e38b93;

    for (var i = 0; i < bytes; i = i + 16) {
      k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(i + 1) & 0xff) << 8 | (key.charCodeAt(i + 2) & 0xff) << 16 | (key.charCodeAt(i + 3) & 0xff) << 24;
      k2 = key.charCodeAt(i + 4) & 0xff | (key.charCodeAt(i + 5) & 0xff) << 8 | (key.charCodeAt(i + 6) & 0xff) << 16 | (key.charCodeAt(i + 7) & 0xff) << 24;
      k3 = key.charCodeAt(i + 8) & 0xff | (key.charCodeAt(i + 9) & 0xff) << 8 | (key.charCodeAt(i + 10) & 0xff) << 16 | (key.charCodeAt(i + 11) & 0xff) << 24;
      k4 = key.charCodeAt(i + 12) & 0xff | (key.charCodeAt(i + 13) & 0xff) << 8 | (key.charCodeAt(i + 14) & 0xff) << 16 | (key.charCodeAt(i + 15) & 0xff) << 24;
      k1 = _x86Multiply(k1, c1);
      k1 = _x86Rotl(k1, 15);
      k1 = _x86Multiply(k1, c2);
      h1 ^= k1;
      h1 = _x86Rotl(h1, 19);
      h1 += h2;
      h1 = _x86Multiply(h1, 5) + 0x561ccd1b;
      k2 = _x86Multiply(k2, c2);
      k2 = _x86Rotl(k2, 16);
      k2 = _x86Multiply(k2, c3);
      h2 ^= k2;
      h2 = _x86Rotl(h2, 17);
      h2 += h3;
      h2 = _x86Multiply(h2, 5) + 0x0bcaa747;
      k3 = _x86Multiply(k3, c3);
      k3 = _x86Rotl(k3, 17);
      k3 = _x86Multiply(k3, c4);
      h3 ^= k3;
      h3 = _x86Rotl(h3, 15);
      h3 += h4;
      h3 = _x86Multiply(h3, 5) + 0x96cd1c35;
      k4 = _x86Multiply(k4, c4);
      k4 = _x86Rotl(k4, 18);
      k4 = _x86Multiply(k4, c1);
      h4 ^= k4;
      h4 = _x86Rotl(h4, 13);
      h4 += h1;
      h4 = _x86Multiply(h4, 5) + 0x32ac3b17;
    }

    k1 = 0;
    k2 = 0;
    k3 = 0;
    k4 = 0;

    switch (remainder) {
      case 15:
        k4 ^= key.charCodeAt(i + 14) << 16;

      case 14:
        k4 ^= key.charCodeAt(i + 13) << 8;

      case 13:
        k4 ^= key.charCodeAt(i + 12);
        k4 = _x86Multiply(k4, c4);
        k4 = _x86Rotl(k4, 18);
        k4 = _x86Multiply(k4, c1);
        h4 ^= k4;

      case 12:
        k3 ^= key.charCodeAt(i + 11) << 24;

      case 11:
        k3 ^= key.charCodeAt(i + 10) << 16;

      case 10:
        k3 ^= key.charCodeAt(i + 9) << 8;

      case 9:
        k3 ^= key.charCodeAt(i + 8);
        k3 = _x86Multiply(k3, c3);
        k3 = _x86Rotl(k3, 17);
        k3 = _x86Multiply(k3, c4);
        h3 ^= k3;

      case 8:
        k2 ^= key.charCodeAt(i + 7) << 24;

      case 7:
        k2 ^= key.charCodeAt(i + 6) << 16;

      case 6:
        k2 ^= key.charCodeAt(i + 5) << 8;

      case 5:
        k2 ^= key.charCodeAt(i + 4);
        k2 = _x86Multiply(k2, c2);
        k2 = _x86Rotl(k2, 16);
        k2 = _x86Multiply(k2, c3);
        h2 ^= k2;

      case 4:
        k1 ^= key.charCodeAt(i + 3) << 24;

      case 3:
        k1 ^= key.charCodeAt(i + 2) << 16;

      case 2:
        k1 ^= key.charCodeAt(i + 1) << 8;

      case 1:
        k1 ^= key.charCodeAt(i);
        k1 = _x86Multiply(k1, c1);
        k1 = _x86Rotl(k1, 15);
        k1 = _x86Multiply(k1, c2);
        h1 ^= k1;
    }

    h1 ^= key.length;
    h2 ^= key.length;
    h3 ^= key.length;
    h4 ^= key.length;
    h1 += h2;
    h1 += h3;
    h1 += h4;
    h2 += h1;
    h3 += h1;
    h4 += h1;
    h1 = _x86Fmix(h1);
    h2 = _x86Fmix(h2);
    h3 = _x86Fmix(h3);
    h4 = _x86Fmix(h4);
    h1 += h2;
    h1 += h3;
    h1 += h4;
    h2 += h1;
    h3 += h1;
    h4 += h1;
    return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
  };

  library.x64.hash128 = function (key, seed) {
    //
    // Given a string and an optional seed as an int, returns a 128 bit
    // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
    //
    key = key || '';
    seed = seed || 0;
    var remainder = key.length % 16;
    var bytes = key.length - remainder;
    var h1 = [0, seed];
    var h2 = [0, seed];
    var k1 = [0, 0];
    var k2 = [0, 0];
    var c1 = [0x87c37b91, 0x114253d5];
    var c2 = [0x4cf5ad43, 0x2745937f];

    for (var i = 0; i < bytes; i = i + 16) {
      k1 = [key.charCodeAt(i + 4) & 0xff | (key.charCodeAt(i + 5) & 0xff) << 8 | (key.charCodeAt(i + 6) & 0xff) << 16 | (key.charCodeAt(i + 7) & 0xff) << 24, key.charCodeAt(i) & 0xff | (key.charCodeAt(i + 1) & 0xff) << 8 | (key.charCodeAt(i + 2) & 0xff) << 16 | (key.charCodeAt(i + 3) & 0xff) << 24];
      k2 = [key.charCodeAt(i + 12) & 0xff | (key.charCodeAt(i + 13) & 0xff) << 8 | (key.charCodeAt(i + 14) & 0xff) << 16 | (key.charCodeAt(i + 15) & 0xff) << 24, key.charCodeAt(i + 8) & 0xff | (key.charCodeAt(i + 9) & 0xff) << 8 | (key.charCodeAt(i + 10) & 0xff) << 16 | (key.charCodeAt(i + 11) & 0xff) << 24];
      k1 = _x64Multiply(k1, c1);
      k1 = _x64Rotl(k1, 31);
      k1 = _x64Multiply(k1, c2);
      h1 = _x64Xor(h1, k1);
      h1 = _x64Rotl(h1, 27);
      h1 = _x64Add(h1, h2);
      h1 = _x64Add(_x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
      k2 = _x64Multiply(k2, c2);
      k2 = _x64Rotl(k2, 33);
      k2 = _x64Multiply(k2, c1);
      h2 = _x64Xor(h2, k2);
      h2 = _x64Rotl(h2, 31);
      h2 = _x64Add(h2, h1);
      h2 = _x64Add(_x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
    }

    k1 = [0, 0];
    k2 = [0, 0];

    switch (remainder) {
      case 15:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 14)], 48));

      case 14:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 13)], 40));

      case 13:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 12)], 32));

      case 12:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 11)], 24));

      case 11:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 10)], 16));

      case 10:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 9)], 8));

      case 9:
        k2 = _x64Xor(k2, [0, key.charCodeAt(i + 8)]);
        k2 = _x64Multiply(k2, c2);
        k2 = _x64Rotl(k2, 33);
        k2 = _x64Multiply(k2, c1);
        h2 = _x64Xor(h2, k2);

      case 8:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 7)], 56));

      case 7:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 6)], 48));

      case 6:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 5)], 40));

      case 5:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 4)], 32));

      case 4:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 3)], 24));

      case 3:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 2)], 16));

      case 2:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 1)], 8));

      case 1:
        k1 = _x64Xor(k1, [0, key.charCodeAt(i)]);
        k1 = _x64Multiply(k1, c1);
        k1 = _x64Rotl(k1, 31);
        k1 = _x64Multiply(k1, c2);
        h1 = _x64Xor(h1, k1);
    }

    h1 = _x64Xor(h1, [0, key.length]);
    h2 = _x64Xor(h2, [0, key.length]);
    h1 = _x64Add(h1, h2);
    h2 = _x64Add(h2, h1);
    h1 = _x64Fmix(h1);
    h2 = _x64Fmix(h2);
    h1 = _x64Add(h1, h2);
    h2 = _x64Add(h2, h1);
    return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
  }; // INITIALIZATION
  // --------------
  // Export murmurHash3 for CommonJS, either as an AMD module or just as part
  // of the global object.


  if (true) {
    if ( true && module.exports) {
      exports = module.exports = library;
    }

    exports.murmurHash3 = library;
  } else {}
})(void 0);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* global self */


var nodeify = __webpack_require__(49);

var webCrypto = getWebCrypto();

function getWebCrypto() {
  if (self.crypto) {
    return self.crypto.subtle || self.crypto.webkitSubtle;
  }

  if (self.msCrypto) {
    return self.msCrypto.subtle;
  }
}

function webCryptoHash(type) {
  if (!webCrypto) {
    throw new Error('Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context');
  }

  return function (data, callback) {
    var res = webCrypto.digest({
      name: type
    }, data);

    if (typeof res.then !== 'function') {
      // IE11
      res.onerror = function () {
        callback(new Error("hashing data using ".concat(type)));
      };

      res.oncomplete = function (e) {
        callback(null, e.target.result);
      };

      return;
    }

    nodeify(res.then(function (raw) {
      return Buffer.from(new Uint8Array(raw));
    }), callback);
  };
}

function sha1(buf, callback) {
  webCryptoHash('SHA-1')(buf, callback);
}

function sha2256(buf, callback) {
  webCryptoHash('SHA-256')(buf, callback);
}

function sha2512(buf, callback) {
  webCryptoHash('SHA-512')(buf, callback);
}

module.exports = {
  sha1: sha1,
  sha2256: sha2256,
  sha2512: sha2512
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, process) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Promise = __webpack_require__(50);

var isPromise = __webpack_require__(16);

var nextTick;
if (typeof setImmediate === 'function') nextTick = setImmediate;else if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process && process.nextTick) nextTick = process.nextTick;else nextTick = function nextTick(cb) {
  setTimeout(cb, 0);
};
module.exports = nodeify;

function nodeify(promise, cb) {
  if (typeof cb !== 'function') return promise;
  return promise.then(function (res) {
    nextTick(function () {
      cb(null, res);
    });
  }, function (err) {
    nextTick(function () {
      cb(err);
    });
  });
}

function nodeifyThis(cb) {
  return nodeify(this, cb);
}

nodeify.extend = extend;
nodeify.Promise = NodeifyPromise;

function extend(prom) {
  if (prom && isPromise(prom)) {
    prom.nodeify = nodeifyThis;
    var then = prom.then;

    prom.then = function () {
      return extend(then.apply(this, arguments));
    };

    return prom;
  } else if (typeof prom === 'function') {
    prom.prototype.nodeify = nodeifyThis;
  } else {
    Promise.prototype.nodeify = nodeifyThis;
  }
}

function NodeifyPromise(fn) {
  if (!(this instanceof NodeifyPromise)) {
    return new NodeifyPromise(fn);
  }

  Promise.call(this, fn);
  extend(this);
}

NodeifyPromise.prototype = Object.create(Promise.prototype);
NodeifyPromise.prototype.constructor = NodeifyPromise;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12).setImmediate, __webpack_require__(1)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isPromise = __webpack_require__(16);

var nextTick;
if (typeof setImediate === 'function') nextTick = setImediate;else if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process && process.nextTick) nextTick = process.nextTick;else nextTick = function nextTick(cb) {
  setTimeout(cb, 0);
};
var extensions = [];
module.exports = Promise;

function Promise(fn) {
  if (!(this instanceof Promise)) {
    return typeof fn === 'function' ? new Promise(fn) : defer();
  }

  var isResolved = false;
  var isFulfilled = false;
  var value;
  var waiting = [];
  var running = false;

  function next(skipTimeout) {
    if (waiting.length) {
      running = true;
      waiting.shift()(skipTimeout || false);
    } else {
      running = false;
    }
  }

  this.then = then;

  function then(cb, eb) {
    return new Promise(function (resolver) {
      function done(skipTimeout) {
        var callback = isFulfilled ? cb : eb;

        if (typeof callback === 'function') {
          var timeoutDone = function timeoutDone() {
            var val;

            try {
              val = callback(value);
            } catch (ex) {
              resolver.reject(ex);
              return next();
            }

            resolver.fulfill(val);
            next(true);
          };

          if (skipTimeout) timeoutDone();else nextTick(timeoutDone);
        } else if (isFulfilled) {
          resolver.fulfill(value);
          next(skipTimeout);
        } else {
          resolver.reject(value);
          next(skipTimeout);
        }
      }

      waiting.push(done);
      if (isResolved && !running) next();
    });
  }

  (function () {
    function fulfill(val) {
      if (isResolved) return;
      if (isPromise(val)) val.then(fulfill, reject);else {
        isResolved = isFulfilled = true;
        value = val;
        next();
      }
    }

    function reject(err) {
      if (isResolved) return;
      isResolved = true;
      isFulfilled = false;
      value = err;
      next();
    }

    var resolver = {
      fulfill: fulfill,
      reject: reject
    };

    for (var i = 0; i < extensions.length; i++) {
      extensions[i](this, resolver);
    }

    if (typeof fn === 'function') {
      try {
        fn(resolver);
      } catch (ex) {
        resolver.reject(ex);
      }
    }
  })();
}

function defer() {
  var resolver;
  var promise = new Promise(function (res) {
    resolver = res;
  });
  return {
    resolver: resolver,
    promise: promise
  };
}

Promise.use = function (extension) {
  extensions.push(extension);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var blake = __webpack_require__(52);

var toCallback = __webpack_require__(15).toCallback;

var minB = 0xb201;
var minS = 0xb241;
var blake2b = {
  init: blake.blake2bInit,
  update: blake.blake2bUpdate,
  digest: blake.blake2bFinal
};
var blake2s = {
  init: blake.blake2sInit,
  update: blake.blake2sUpdate,
  digest: blake.blake2sFinal
};

var makeB2Hash = function makeB2Hash(size, hf) {
  return toCallback(function (buf) {
    var ctx = hf.init(size, null);
    hf.update(ctx, buf);
    return Buffer.from(hf.digest(ctx));
  });
};

module.exports = function (table) {
  for (var i = 0; i < 64; i++) {
    table[minB + i] = makeB2Hash(i + 1, blake2b);
  }

  for (var _i = 0; _i < 32; _i++) {
    table[minS + _i] = makeB2Hash(_i + 1, blake2s);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var b2b = __webpack_require__(53);

var b2s = __webpack_require__(54);

module.exports = {
  blake2b: b2b.blake2b,
  blake2bHex: b2b.blake2bHex,
  blake2bInit: b2b.blake2bInit,
  blake2bUpdate: b2b.blake2bUpdate,
  blake2bFinal: b2b.blake2bFinal,
  blake2s: b2s.blake2s,
  blake2sHex: b2s.blake2sHex,
  blake2sInit: b2s.blake2sInit,
  blake2sUpdate: b2s.blake2sUpdate,
  blake2sFinal: b2s.blake2sFinal
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Blake2B in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch
var util = __webpack_require__(17); // 64-bit unsigned addition
// Sets v[a,a+1] += v[b,b+1]
// v should be a Uint32Array


function ADD64AA(v, a, b) {
  var o0 = v[a] + v[b];
  var o1 = v[a + 1] + v[b + 1];

  if (o0 >= 0x100000000) {
    o1++;
  }

  v[a] = o0;
  v[a + 1] = o1;
} // 64-bit unsigned addition
// Sets v[a,a+1] += b
// b0 is the low 32 bits of b, b1 represents the high 32 bits


function ADD64AC(v, a, b0, b1) {
  var o0 = v[a] + b0;

  if (b0 < 0) {
    o0 += 0x100000000;
  }

  var o1 = v[a + 1] + b1;

  if (o0 >= 0x100000000) {
    o1++;
  }

  v[a] = o0;
  v[a + 1] = o1;
} // Little-endian byte access


function B2B_GET32(arr, i) {
  return arr[i] ^ arr[i + 1] << 8 ^ arr[i + 2] << 16 ^ arr[i + 3] << 24;
} // G Mixing function
// The ROTRs are inlined for speed


function B2B_G(a, b, c, d, ix, iy) {
  var x0 = m[ix];
  var x1 = m[ix + 1];
  var y0 = m[iy];
  var y1 = m[iy + 1];
  ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s

  ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits
  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits

  var xor0 = v[d] ^ v[a];
  var xor1 = v[d + 1] ^ v[a + 1];
  v[d] = xor1;
  v[d + 1] = xor0;
  ADD64AA(v, c, d); // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits

  xor0 = v[b] ^ v[c];
  xor1 = v[b + 1] ^ v[c + 1];
  v[b] = xor0 >>> 24 ^ xor1 << 8;
  v[b + 1] = xor1 >>> 24 ^ xor0 << 8;
  ADD64AA(v, a, b);
  ADD64AC(v, a, y0, y1); // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits

  xor0 = v[d] ^ v[a];
  xor1 = v[d + 1] ^ v[a + 1];
  v[d] = xor0 >>> 16 ^ xor1 << 16;
  v[d + 1] = xor1 >>> 16 ^ xor0 << 16;
  ADD64AA(v, c, d); // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits

  xor0 = v[b] ^ v[c];
  xor1 = v[b + 1] ^ v[c + 1];
  v[b] = xor1 >>> 31 ^ xor0 << 1;
  v[b + 1] = xor0 >>> 31 ^ xor1 << 1;
} // Initialization Vector


var BLAKE2B_IV32 = new Uint32Array([0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85, 0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A, 0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C, 0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19]);
var SIGMA8 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]; // These are offsets into a uint64 buffer.
// Multiply them all by 2 to make them offsets into a uint32 buffer,
// because this is Javascript and we don't have uint64s

var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) {
  return x * 2;
})); // Compression function. 'last' flag indicates last block.
// Note we're representing 16 uint64s as 32 uint32s

var v = new Uint32Array(32);
var m = new Uint32Array(32);

function blake2bCompress(ctx, last) {
  var i = 0; // init work variables

  for (i = 0; i < 16; i++) {
    v[i] = ctx.h[i];
    v[i + 16] = BLAKE2B_IV32[i];
  } // low 64 bits of offset


  v[24] = v[24] ^ ctx.t;
  v[25] = v[25] ^ ctx.t / 0x100000000; // high 64 bits not supported, offset may not be higher than 2**53-1
  // last block flag set ?

  if (last) {
    v[28] = ~v[28];
    v[29] = ~v[29];
  } // get little-endian words


  for (i = 0; i < 32; i++) {
    m[i] = B2B_GET32(ctx.b, 4 * i);
  } // twelve rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 64)


  for (i = 0; i < 12; i++) {
    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
  } // util.debugPrint('   (i=12) v[16]', v, 64)


  for (i = 0; i < 16; i++) {
    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
  } // util.debugPrint('h[8]', ctx.h, 64)

} // Creates a BLAKE2b hashing context
// Requires an output length between 1 and 64 bytes
// Takes an optional Uint8Array key


function blake2bInit(outlen, key) {
  if (outlen === 0 || outlen > 64) {
    throw new Error('Illegal output length, expected 0 < length <= 64');
  }

  if (key && key.length > 64) {
    throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64');
  } // state, 'param block'


  var ctx = {
    b: new Uint8Array(128),
    h: new Uint32Array(16),
    t: 0,
    // input count
    c: 0,
    // pointer within buffer
    outlen: outlen // output length in bytes
    // initialize hash state

  };

  for (var i = 0; i < 16; i++) {
    ctx.h[i] = BLAKE2B_IV32[i];
  }

  var keylen = key ? key.length : 0;
  ctx.h[0] ^= 0x01010000 ^ keylen << 8 ^ outlen; // key the hash, if applicable

  if (key) {
    blake2bUpdate(ctx, key); // at the end

    ctx.c = 128;
  }

  return ctx;
} // Updates a BLAKE2b streaming hash
// Requires hash context and Uint8Array (byte array)


function blake2bUpdate(ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 128) {
      // buffer full ?
      ctx.t += ctx.c; // add counters

      blake2bCompress(ctx, false); // compress (not last)

      ctx.c = 0; // counter to zero
    }

    ctx.b[ctx.c++] = input[i];
  }
} // Completes a BLAKE2b streaming hash
// Returns a Uint8Array containing the message digest


function blake2bFinal(ctx) {
  ctx.t += ctx.c; // mark last block offset

  while (ctx.c < 128) {
    // fill up with zeros
    ctx.b[ctx.c++] = 0;
  }

  blake2bCompress(ctx, true); // final block flag = 1
  // little endian convert and store

  var out = new Uint8Array(ctx.outlen);

  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = ctx.h[i >> 2] >> 8 * (i & 3);
  }

  return out;
} // Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64


function blake2b(input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 64;
  input = util.normalizeInput(input); // do the math

  var ctx = blake2bInit(outlen, key);
  blake2bUpdate(ctx, input);
  return blake2bFinal(ctx);
} // Computes the BLAKE2B hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64


function blake2bHex(input, key, outlen) {
  var output = blake2b(input, key, outlen);
  return util.toHex(output);
}

module.exports = {
  blake2b: blake2b,
  blake2bHex: blake2bHex,
  blake2bInit: blake2bInit,
  blake2bUpdate: blake2bUpdate,
  blake2bFinal: blake2bFinal
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// BLAKE2s hash function in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch
var util = __webpack_require__(17); // Little-endian byte access.
// Expects a Uint8Array and an index
// Returns the little-endian uint32 at v[i..i+3]


function B2S_GET32(v, i) {
  return v[i] ^ v[i + 1] << 8 ^ v[i + 2] << 16 ^ v[i + 3] << 24;
} // Mixing function G.


function B2S_G(a, b, c, d, x, y) {
  v[a] = v[a] + v[b] + x;
  v[d] = ROTR32(v[d] ^ v[a], 16);
  v[c] = v[c] + v[d];
  v[b] = ROTR32(v[b] ^ v[c], 12);
  v[a] = v[a] + v[b] + y;
  v[d] = ROTR32(v[d] ^ v[a], 8);
  v[c] = v[c] + v[d];
  v[b] = ROTR32(v[b] ^ v[c], 7);
} // 32-bit right rotation
// x should be a uint32
// y must be between 1 and 31, inclusive


function ROTR32(x, y) {
  return x >>> y ^ x << 32 - y;
} // Initialization Vector.


var BLAKE2S_IV = new Uint32Array([0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]);
var SIGMA = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]); // Compression function. "last" flag indicates last block

var v = new Uint32Array(16);
var m = new Uint32Array(16);

function blake2sCompress(ctx, last) {
  var i = 0;

  for (i = 0; i < 8; i++) {
    // init work variables
    v[i] = ctx.h[i];
    v[i + 8] = BLAKE2S_IV[i];
  }

  v[12] ^= ctx.t; // low 32 bits of offset

  v[13] ^= ctx.t / 0x100000000; // high 32 bits

  if (last) {
    // last block flag set ?
    v[14] = ~v[14];
  }

  for (i = 0; i < 16; i++) {
    // get little-endian words
    m[i] = B2S_GET32(ctx.b, 4 * i);
  } // ten rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 32)


  for (i = 0; i < 10; i++) {
    // util.debugPrint('   (i=' + i + ')  v[16]', v, 32)
    B2S_G(0, 4, 8, 12, m[SIGMA[i * 16 + 0]], m[SIGMA[i * 16 + 1]]);
    B2S_G(1, 5, 9, 13, m[SIGMA[i * 16 + 2]], m[SIGMA[i * 16 + 3]]);
    B2S_G(2, 6, 10, 14, m[SIGMA[i * 16 + 4]], m[SIGMA[i * 16 + 5]]);
    B2S_G(3, 7, 11, 15, m[SIGMA[i * 16 + 6]], m[SIGMA[i * 16 + 7]]);
    B2S_G(0, 5, 10, 15, m[SIGMA[i * 16 + 8]], m[SIGMA[i * 16 + 9]]);
    B2S_G(1, 6, 11, 12, m[SIGMA[i * 16 + 10]], m[SIGMA[i * 16 + 11]]);
    B2S_G(2, 7, 8, 13, m[SIGMA[i * 16 + 12]], m[SIGMA[i * 16 + 13]]);
    B2S_G(3, 4, 9, 14, m[SIGMA[i * 16 + 14]], m[SIGMA[i * 16 + 15]]);
  } // util.debugPrint('   (i=10) v[16]', v, 32)


  for (i = 0; i < 8; i++) {
    ctx.h[i] ^= v[i] ^ v[i + 8];
  } // util.debugPrint('h[8]', ctx.h, 32)

} // Creates a BLAKE2s hashing context
// Requires an output length between 1 and 32 bytes
// Takes an optional Uint8Array key


function blake2sInit(outlen, key) {
  if (!(outlen > 0 && outlen <= 32)) {
    throw new Error('Incorrect output length, should be in [1, 32]');
  }

  var keylen = key ? key.length : 0;

  if (key && !(keylen > 0 && keylen <= 32)) {
    throw new Error('Incorrect key length, should be in [1, 32]');
  }

  var ctx = {
    h: new Uint32Array(BLAKE2S_IV),
    // hash state
    b: new Uint32Array(64),
    // input block
    c: 0,
    // pointer within block
    t: 0,
    // input count
    outlen: outlen // output length in bytes

  };
  ctx.h[0] ^= 0x01010000 ^ keylen << 8 ^ outlen;

  if (keylen > 0) {
    blake2sUpdate(ctx, key);
    ctx.c = 64; // at the end
  }

  return ctx;
} // Updates a BLAKE2s streaming hash
// Requires hash context and Uint8Array (byte array)


function blake2sUpdate(ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 64) {
      // buffer full ?
      ctx.t += ctx.c; // add counters

      blake2sCompress(ctx, false); // compress (not last)

      ctx.c = 0; // counter to zero
    }

    ctx.b[ctx.c++] = input[i];
  }
} // Completes a BLAKE2s streaming hash
// Returns a Uint8Array containing the message digest


function blake2sFinal(ctx) {
  ctx.t += ctx.c; // mark last block offset

  while (ctx.c < 64) {
    // fill up with zeros
    ctx.b[ctx.c++] = 0;
  }

  blake2sCompress(ctx, true); // final block flag = 1
  // little endian convert and store

  var out = new Uint8Array(ctx.outlen);

  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = ctx.h[i >> 2] >> 8 * (i & 3) & 0xFF;
  }

  return out;
} // Computes the BLAKE2S hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64


function blake2s(input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 32;
  input = util.normalizeInput(input); // do the math

  var ctx = blake2sInit(outlen, key);
  blake2sUpdate(ctx, input);
  return blake2sFinal(ctx);
} // Computes the BLAKE2S hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64


function blake2sHex(input, key, outlen) {
  var output = blake2s(input, key, outlen);
  return util.toHex(output);
}

module.exports = {
  blake2s: blake2s,
  blake2sHex: blake2sHex,
  blake2sInit: blake2sInit,
  blake2sUpdate: blake2sUpdate,
  blake2sFinal: blake2sFinal
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 * @module Multibase
 */


var constants = __webpack_require__(56);

exports = module.exports = multibase;
exports.encode = encode;
exports.decode = decode;
exports.isEncoded = isEncoded;
exports.names = Object.freeze(Object.keys(constants.names));
exports.codes = Object.freeze(Object.keys(constants.codes));
var errNotSupported = new Error('Unsupported encoding');
/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @memberof Multibase
 * @returns {Buffer}
 */

function multibase(nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer');
  }

  var base = getBase(nameOrCode);
  var codeBuf = Buffer.from(base.code);
  var name = base.name;
  validEncode(name, buf);
  return Buffer.concat([codeBuf, buf]);
}
/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 * @memberof Multibase
 */


function encode(nameOrCode, buf) {
  var base = getBase(nameOrCode);
  var name = base.name;
  return multibase(name, Buffer.from(base.encode(buf)));
}
/**
 * Takes a buffer or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Buffer|string} bufOrString
 * @returns {Buffer}
 * @memberof Multibase
 *
 */


function decode(bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString();
  }

  var code = bufOrString.substring(0, 1);
  bufOrString = bufOrString.substring(1, bufOrString.length);

  if (typeof bufOrString === 'string') {
    bufOrString = Buffer.from(bufOrString);
  }

  var base = getBase(code);
  return Buffer.from(base.decode(bufOrString.toString()));
}
/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} bufOrString
 * @returns {boolean}
 * @memberof Multibase
 */


function isEncoded(bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString();
  } // Ensure bufOrString is a string


  if (Object.prototype.toString.call(bufOrString) !== '[object String]') {
    return false;
  }

  var code = bufOrString.substring(0, 1);

  try {
    var base = getBase(code);
    return base.name;
  } catch (err) {
    return false;
  }
}
/**
 * @param {string} name
 * @param {Buffer} buf
 * @private
 * @returns {undefined}
 */


function validEncode(name, buf) {
  var base = getBase(name);
  base.decode(buf.toString());
}

function getBase(nameOrCode) {
  var base;

  if (constants.names[nameOrCode]) {
    base = constants.names[nameOrCode];
  } else if (constants.codes[nameOrCode]) {
    base = constants.codes[nameOrCode];
  } else {
    throw errNotSupported;
  }

  if (!base.isImplemented()) {
    throw new Error('Base ' + nameOrCode + ' is not implemented yet');
  }

  return base;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Base = __webpack_require__(57);

var baseX = __webpack_require__(13);

var base16 = __webpack_require__(58);

var base32 = __webpack_require__(59);

var base64 = __webpack_require__(60); // name, code, implementation, alphabet


var constants = [['base1', '1', '', '1'], ['base2', '0', baseX, '01'], ['base8', '7', baseX, '01234567'], ['base10', '9', baseX, '0123456789'], ['base16', 'f', base16, '0123456789abcdef'], ['base32', 'b', base32, 'abcdefghijklmnopqrstuvwxyz234567'], ['base32pad', 'c', base32, 'abcdefghijklmnopqrstuvwxyz234567='], ['base32hex', 'v', base32, '0123456789abcdefghijklmnopqrstuv'], ['base32hexpad', 't', base32, '0123456789abcdefghijklmnopqrstuv='], ['base32z', 'h', base32, 'ybndrfg8ejkmcpqxot1uwisza345h769'], ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'], ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'], ['base64', 'm', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'], ['base64pad', 'M', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='], ['base64url', 'u', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'], ['base64urlpad', 'U', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']];
var names = constants.reduce(function (prev, tupple) {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3]);
  return prev;
}, {});
var codes = constants.reduce(function (prev, tupple) {
  prev[tupple[1]] = names[tupple[0]];
  return prev;
}, {});
module.exports = {
  names: names,
  codes: codes
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Base =
/*#__PURE__*/
function () {
  function Base(name, code, implementation, alphabet) {
    _classCallCheck(this, Base);

    this.name = name;
    this.code = code;
    this.alphabet = alphabet;

    if (implementation && alphabet) {
      this.engine = implementation(alphabet);
    }
  }

  _createClass(Base, [{
    key: "encode",
    value: function encode(stringOrBuffer) {
      return this.engine.encode(stringOrBuffer);
    }
  }, {
    key: "decode",
    value: function decode(stringOrBuffer) {
      return this.engine.decode(stringOrBuffer);
    }
  }, {
    key: "isImplemented",
    value: function isImplemented() {
      return this.engine;
    }
  }]);

  return Base;
}();

module.exports = Base;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

module.exports = function base16(alphabet) {
  return {
    encode: function encode(input) {
      if (typeof input === 'string') {
        return Buffer.from(input).toString('hex');
      }

      return input.toString('hex');
    },
    decode: function decode(input) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var char = _step.value;

          if (alphabet.indexOf(char) < 0) {
            throw new Error('invalid base16 character');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return Buffer.from(input, 'hex');
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

function _decode(input, alphabet) {
  input = input.replace(new RegExp('=', 'g'), '');
  var length = input.length;
  var bits = 0;
  var value = 0;
  var index = 0;
  var output = new Uint8Array(length * 5 / 8 | 0);

  for (var i = 0; i < length; i++) {
    value = value << 5 | alphabet.indexOf(input[i]);
    bits += 5;

    if (bits >= 8) {
      output[index++] = value >>> bits - 8 & 255;
      bits -= 8;
    }
  }

  return output.buffer;
}

function _encode(buffer, alphabet) {
  var length = buffer.byteLength;
  var view = new Uint8Array(buffer);
  var padding = alphabet.indexOf('=') === alphabet.length - 1;

  if (padding) {
    alphabet = alphabet.substring(0, alphabet.length - 2);
  }

  var bits = 0;
  var value = 0;
  var output = '';

  for (var i = 0; i < length; i++) {
    value = value << 8 | view[i];
    bits += 8;

    while (bits >= 5) {
      output += alphabet[value >>> bits - 5 & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += alphabet[value << 5 - bits & 31];
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += '=';
    }
  }

  return output;
}

module.exports = function base32(alphabet) {
  return {
    encode: function encode(input) {
      if (typeof input === 'string') {
        return _encode(Buffer.from(input), alphabet);
      }

      return _encode(input, alphabet);
    },
    decode: function decode(input) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var char = _step.value;

          if (alphabet.indexOf(char) < 0) {
            throw new Error('invalid base32 character');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _decode(input, alphabet);
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

module.exports = function base64(alphabet) {
  // The alphabet is only used to know:
  //   1. If padding is enabled (must contain '=')
  //   2. If the output must be url-safe (must contain '-' and '_')
  //   3. If the input of the output function is valid
  // The alphabets from RFC 4648 are always used.
  var padding = alphabet.indexOf('=') > -1;
  var url = alphabet.indexOf('-') > -1 && alphabet.indexOf('_') > -1;
  return {
    encode: function encode(input) {
      var output = '';

      if (typeof input === 'string') {
        output = Buffer.from(input).toString('base64');
      } else {
        output = input.toString('base64');
      }

      if (url) {
        output = output.replace(/\+/g, '-').replace(/\//g, '_');
      }

      var pad = output.indexOf('=');

      if (pad > 0 && !padding) {
        output = output.substring(0, pad);
      }

      return output;
    },
    decode: function decode(input) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var char = _step.value;

          if (alphabet.indexOf(char) < 0) {
            throw new Error('invalid base64 character');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return Buffer.from(input, 'base64');
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Implementation of the multicodec specification.
 *
 * @module multicodec
 * @example
 * const multicodec = require('multicodec')
 *
 * const prefixedProtobuf = multicodec.addPrefix('protobuf', protobufBuffer)
 * // prefixedProtobuf 0x50...
 *
 */


var varint = __webpack_require__(8);

var codecNameToCodeVarint = __webpack_require__(62);

var codeToCodecName = __webpack_require__(63);

var util = __webpack_require__(19);

exports = module.exports;
/**
 * Prefix a buffer with a multicodec-packed.
 *
 * @param {string|number} multicodecStrOrCode
 * @param {Buffer} data
 * @returns {Buffer}
 */

exports.addPrefix = function (multicodecStrOrCode, data) {
  var prefix;

  if (Buffer.isBuffer(multicodecStrOrCode)) {
    prefix = util.varintBufferEncode(multicodecStrOrCode);
  } else {
    if (codecNameToCodeVarint[multicodecStrOrCode]) {
      prefix = codecNameToCodeVarint[multicodecStrOrCode];
    } else {
      throw new Error('multicodec not recognized');
    }
  }

  return Buffer.concat([prefix, data]);
};
/**
 * Decapsulate the multicodec-packed prefix from the data.
 *
 * @param {Buffer} data
 * @returns {Buffer}
 */


exports.rmPrefix = function (data) {
  varint.decode(data);
  return data.slice(varint.decode.bytes);
};
/**
 * Get the codec of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {string}
 */


exports.getCodec = function (prefixedData) {
  var code = util.varintBufferDecode(prefixedData);
  var codecName = codeToCodecName[code.toString('hex')];

  if (codecName === undefined) {
    throw new Error('Code `0x' + code.toString('hex') + '` not found');
  }

  return codecName;
};
/**
 * Get the code as varint of a codec name.
 * @param {string} codecName
 * @returns {Buffer}
 */


exports.getCodeVarint = function (codecName) {
  var code = codecNameToCodeVarint[codecName];

  if (code === undefined) {
    throw new Error('Codec `' + codecName + '` not found');
  }

  return code;
};
/**
 * Add a new codec
 * @param {string} name Name of the codec
 * @param {Buffer} code The code of the codec
 * @returns {void}
 */


exports.addCodec = function (name, code) {
  codecNameToCodeVarint[name] = util.varintBufferEncode(code);
  codeToCodecName[code.toString('hex')] = name;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseTable = __webpack_require__(9);

var varintBufferEncode = __webpack_require__(19).varintBufferEncode; // this creates a map for codecName -> codeVarintBuffer


var varintTable = {};
module.exports = varintTable;

for (var encodingName in baseTable) {
  var code = baseTable[encodingName];
  varintTable[encodingName] = varintBufferEncode(code);
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseTable = __webpack_require__(9); // this creates a map for code as hexString -> codecName


var nameTable = {};
module.exports = nameTable;

for (var encodingName in baseTable) {
  var code = baseTable[encodingName];
  nameTable[code.toString('hex')] = encodingName;
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var mh = __webpack_require__(4);

var CIDUtil = {
  /**
   * Test if the given input is a valid CID object.
   * Returns an error message if it is not.
   * Returns undefined if it is a valid CID.
   *
   * @param {any} other
   * @returns {string}
   */
  checkCIDComponents: function checkCIDComponents(other) {
    if (other == null) {
      return 'null values are not valid CIDs';
    }

    if (!(other.version === 0 || other.version === 1)) {
      return 'Invalid version, must be a number equal to 1 or 0';
    }

    if (typeof other.codec !== 'string') {
      return 'codec must be string';
    }

    if (!Buffer.isBuffer(other.multihash)) {
      return 'multihash must be a Buffer';
    }

    try {
      mh.validate(other.multihash);
    } catch (err) {
      var errorMsg = err.message;

      if (!errorMsg) {
        // Just in case mh.validate() throws an error with empty error message
        errorMsg = 'Multihash validation failed';
      }

      return errorMsg;
    }
  }
};
module.exports = CIDUtil;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function withIs(Class, _ref) {
  var className = _ref.className,
      symbolName = _ref.symbolName;
  var symbol = Symbol.for(symbolName);

  var ClassIsWrapper = _defineProperty({}, className,
  /*#__PURE__*/
  function (_Class) {
    _inherits(_class, _Class);

    function _class() {
      var _getPrototypeOf2;

      var _this2;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), symbol, {
        value: true
      });
      return _this2;
    }

    _createClass(_class, [{
      key: Symbol.toStringTag,
      get: function get() {
        return className;
      }
    }]);

    return _class;
  }(Class))[className];

  ClassIsWrapper["is".concat(className)] = function (obj) {
    return !!(obj && obj[symbol]);
  };

  return ClassIsWrapper;
}

function withIsProto(Class, _ref2) {
  var className = _ref2.className,
      symbolName = _ref2.symbolName,
      withoutNew = _ref2.withoutNew;
  var symbol = Symbol.for(symbolName);
  /* eslint-disable object-shorthand */

  var ClassIsWrapper = _defineProperty({}, className, function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (withoutNew && !(this instanceof ClassIsWrapper)) {
      return _construct(ClassIsWrapper, args);
    }

    var _this = Class.call.apply(Class, [this].concat(args)) || this;

    if (_this && !_this[symbol]) {
      Object.defineProperty(_this, symbol, {
        value: true
      });
    }

    return _this;
  })[className];
  /* eslint-enable object-shorthand */


  ClassIsWrapper.prototype = Object.create(Class.prototype);
  ClassIsWrapper.prototype.constructor = ClassIsWrapper;
  Object.defineProperty(ClassIsWrapper.prototype, Symbol.toStringTag, {
    get: function get() {
      return className;
    }
  });

  ClassIsWrapper["is".concat(className)] = function (obj) {
    return !!(obj && obj[symbol]);
  };

  return ClassIsWrapper;
}

module.exports = withIs;
module.exports.proto = withIsProto;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var traverse = module.exports = function (obj) {
  return new Traverse(obj);
};

function Traverse(obj) {
  this.value = obj;
}

Traverse.prototype.get = function (ps) {
  var node = this.value;

  for (var i = 0; i < ps.length; i++) {
    var key = ps[i];

    if (!node || !hasOwnProperty.call(node, key)) {
      node = undefined;
      break;
    }

    node = node[key];
  }

  return node;
};

Traverse.prototype.has = function (ps) {
  var node = this.value;

  for (var i = 0; i < ps.length; i++) {
    var key = ps[i];

    if (!node || !hasOwnProperty.call(node, key)) {
      return false;
    }

    node = node[key];
  }

  return true;
};

Traverse.prototype.set = function (ps, value) {
  var node = this.value;

  for (var i = 0; i < ps.length - 1; i++) {
    var key = ps[i];
    if (!hasOwnProperty.call(node, key)) node[key] = {};
    node = node[key];
  }

  node[ps[i]] = value;
  return value;
};

Traverse.prototype.map = function (cb) {
  return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
  this.value = walk(this.value, cb, false);
  return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
  var skip = arguments.length === 1;
  var acc = skip ? this.value : init;
  this.forEach(function (x) {
    if (!this.isRoot || !skip) {
      acc = cb.call(this, acc, x);
    }
  });
  return acc;
};

Traverse.prototype.paths = function () {
  var acc = [];
  this.forEach(function (x) {
    acc.push(this.path);
  });
  return acc;
};

Traverse.prototype.nodes = function () {
  var acc = [];
  this.forEach(function (x) {
    acc.push(this.node);
  });
  return acc;
};

Traverse.prototype.clone = function () {
  var parents = [],
      nodes = [];
  return function clone(src) {
    for (var i = 0; i < parents.length; i++) {
      if (parents[i] === src) {
        return nodes[i];
      }
    }

    if (_typeof(src) === 'object' && src !== null) {
      var dst = copy(src);
      parents.push(src);
      nodes.push(dst);
      forEach(objectKeys(src), function (key) {
        dst[key] = clone(src[key]);
      });
      parents.pop();
      nodes.pop();
      return dst;
    } else {
      return src;
    }
  }(this.value);
};

function walk(root, cb, immutable) {
  var path = [];
  var parents = [];
  var alive = true;
  return function walker(node_) {
    var node = immutable ? copy(node_) : node_;
    var modifiers = {};
    var keepGoing = true;
    var state = {
      node: node,
      node_: node_,
      path: [].concat(path),
      parent: parents[parents.length - 1],
      parents: parents,
      key: path.slice(-1)[0],
      isRoot: path.length === 0,
      level: path.length,
      circular: null,
      update: function update(x, stopHere) {
        if (!state.isRoot) {
          state.parent.node[state.key] = x;
        }

        state.node = x;
        if (stopHere) keepGoing = false;
      },
      'delete': function _delete(stopHere) {
        delete state.parent.node[state.key];
        if (stopHere) keepGoing = false;
      },
      remove: function remove(stopHere) {
        if (isArray(state.parent.node)) {
          state.parent.node.splice(state.key, 1);
        } else {
          delete state.parent.node[state.key];
        }

        if (stopHere) keepGoing = false;
      },
      keys: null,
      before: function before(f) {
        modifiers.before = f;
      },
      after: function after(f) {
        modifiers.after = f;
      },
      pre: function pre(f) {
        modifiers.pre = f;
      },
      post: function post(f) {
        modifiers.post = f;
      },
      stop: function stop() {
        alive = false;
      },
      block: function block() {
        keepGoing = false;
      }
    };
    if (!alive) return state;

    function updateState() {
      if (_typeof(state.node) === 'object' && state.node !== null) {
        if (!state.keys || state.node_ !== state.node) {
          state.keys = objectKeys(state.node);
        }

        state.isLeaf = state.keys.length == 0;

        for (var i = 0; i < parents.length; i++) {
          if (parents[i].node_ === node_) {
            state.circular = parents[i];
            break;
          }
        }
      } else {
        state.isLeaf = true;
        state.keys = null;
      }

      state.notLeaf = !state.isLeaf;
      state.notRoot = !state.isRoot;
    }

    updateState(); // use return values to update if defined

    var ret = cb.call(state, state.node);
    if (ret !== undefined && state.update) state.update(ret);
    if (modifiers.before) modifiers.before.call(state, state.node);
    if (!keepGoing) return state;

    if (_typeof(state.node) == 'object' && state.node !== null && !state.circular) {
      parents.push(state);
      updateState();
      forEach(state.keys, function (key, i) {
        path.push(key);
        if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
        var child = walker(state.node[key]);

        if (immutable && hasOwnProperty.call(state.node, key)) {
          state.node[key] = child.node;
        }

        child.isLast = i == state.keys.length - 1;
        child.isFirst = i == 0;
        if (modifiers.post) modifiers.post.call(state, child);
        path.pop();
      });
      parents.pop();
    }

    if (modifiers.after) modifiers.after.call(state, state.node);
    return state;
  }(root).node;
}

function copy(src) {
  if (_typeof(src) === 'object' && src !== null) {
    var dst;

    if (isArray(src)) {
      dst = [];
    } else if (isDate(src)) {
      dst = new Date(src.getTime ? src.getTime() : src);
    } else if (isRegExp(src)) {
      dst = new RegExp(src);
    } else if (isError(src)) {
      dst = {
        message: src.message
      };
    } else if (isBoolean(src)) {
      dst = new Boolean(src);
    } else if (isNumber(src)) {
      dst = new Number(src);
    } else if (isString(src)) {
      dst = new String(src);
    } else if (Object.create && Object.getPrototypeOf) {
      dst = Object.create(Object.getPrototypeOf(src));
    } else if (src.constructor === Object) {
      dst = {};
    } else {
      var proto = src.constructor && src.constructor.prototype || src.__proto__ || {};

      var T = function T() {};

      T.prototype = proto;
      dst = new T();
    }

    forEach(objectKeys(src), function (key) {
      dst[key] = src[key];
    });
    return dst;
  } else return src;
}

var objectKeys = Object.keys || function keys(obj) {
  var res = [];

  for (var key in obj) {
    res.push(key);
  }

  return res;
};

function toS(obj) {
  return Object.prototype.toString.call(obj);
}

function isDate(obj) {
  return toS(obj) === '[object Date]';
}

function isRegExp(obj) {
  return toS(obj) === '[object RegExp]';
}

function isError(obj) {
  return toS(obj) === '[object Error]';
}

function isBoolean(obj) {
  return toS(obj) === '[object Boolean]';
}

function isNumber(obj) {
  return toS(obj) === '[object Number]';
}

function isString(obj) {
  return toS(obj) === '[object String]';
}

var isArray = Array.isArray || function isArray(xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

var forEach = function forEach(xs, fn) {
  if (xs.forEach) return xs.forEach(fn);else for (var i = 0; i < xs.length; i++) {
    fn(xs[i], i, xs);
  }
};

forEach(objectKeys(Traverse.prototype), function (key) {
  traverse[key] = function (obj) {
    var args = [].slice.call(arguments, 1);
    var t = new Traverse(obj);
    return t[key].apply(t, args);
  };
});

var hasOwnProperty = Object.hasOwnProperty || function (obj, key) {
  return key in obj;
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Error strings
 */

var ERRORS = {
  INVALID_ENCODING: 'Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.',
  INVALID_SMARTBUFFER_SIZE: 'Invalid size provided. Size must be a valid integer greater than zero.',
  INVALID_SMARTBUFFER_BUFFER: 'Invalid Buffer provided in SmartBufferOptions.',
  INVALID_SMARTBUFFER_OBJECT: 'Invalid SmartBufferOptions object supplied to SmartBuffer constructor or factory methods.',
  INVALID_OFFSET: 'An invalid offset value was provided.',
  INVALID_OFFSET_NON_NUMBER: 'An invalid offset value was provided. A numeric value is required.',
  INVALID_LENGTH: 'An invalid length value was provided.',
  INVALID_LENGTH_NON_NUMBER: 'An invalid length value was provived. A numeric value is required.',
  INVALID_TARGET_OFFSET: 'Target offset is beyond the bounds of the internal SmartBuffer data.',
  INVALID_TARGET_LENGTH: 'Specified length value moves cursor beyong the bounds of the internal SmartBuffer data.',
  INVALID_READ_BEYOND_BOUNDS: 'Attempted to read beyond the bounds of the managed data.',
  INVALID_WRITE_BEYOND_BOUNDS: 'Attempted to write beyond the bounds of the managed data.'
};
exports.ERRORS = ERRORS;
/**
 * Checks if a given encoding is a valid Buffer encoding. (Throws an exception if check fails)
 *
 * @param { String } encoding The encoding string to check.
 */

function checkEncoding(encoding) {
  if (!Buffer.isEncoding(encoding)) {
    throw new Error(ERRORS.INVALID_ENCODING);
  }
}

exports.checkEncoding = checkEncoding;
/**
 * Checks if a given number is a finite integer. (Throws an exception if check fails)
 *
 * @param { Number } value The number value to check.
 */

function isFiniteInteger(value) {
  return typeof value === 'number' && isFinite(value) && isInteger(value);
}

exports.isFiniteInteger = isFiniteInteger;
/**
 * Checks if an offset/length value is valid. (Throws an exception if check fails)
 *
 * @param value The value to check.
 * @param offset True if checking an offset, false if checking a length.
 */

function checkOffsetOrLengthValue(value, offset) {
  if (typeof value === 'number') {
    // Check for non finite/non integers
    if (!isFiniteInteger(value) || value < 0) {
      throw new Error(offset ? ERRORS.INVALID_OFFSET : ERRORS.INVALID_LENGTH);
    }
  } else {
    throw new Error(offset ? ERRORS.INVALID_OFFSET_NON_NUMBER : ERRORS.INVALID_LENGTH_NON_NUMBER);
  }
}
/**
 * Checks if a length value is valid. (Throws an exception if check fails)
 *
 * @param { Number } length The value to check.
 */


function checkLengthValue(length) {
  checkOffsetOrLengthValue(length, false);
}

exports.checkLengthValue = checkLengthValue;
/**
 * Checks if a offset value is valid. (Throws an exception if check fails)
 *
 * @param { Number } offset The value to check.
 */

function checkOffsetValue(offset) {
  checkOffsetOrLengthValue(offset, true);
}

exports.checkOffsetValue = checkOffsetValue;
/**
 * Checks if a target offset value is out of bounds. (Throws an exception if check fails)
 *
 * @param { Number } offset The offset value to check.
 * @param { SmartBuffer } buff The SmartBuffer instance to check against.
 */

function checkTargetOffset(offset, buff) {
  if (offset < 0 || offset > buff.length) {
    throw new Error(ERRORS.INVALID_TARGET_OFFSET);
  }
}

exports.checkTargetOffset = checkTargetOffset;
/**
 * Determines whether a given number is a integer.
 * @param value The number to check.
 */

function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {// THIS FILE IS GENERATED, DO NO EDIT MANUALLY
// For more information see the README.md

/* eslint-disable dot-notation */
 // miscellaneous

exports['raw'] = Buffer.from('55', 'hex'); // serialization formats

exports['cbor'] = Buffer.from('51', 'hex');
exports['protobuf'] = Buffer.from('50', 'hex');
exports['rlp'] = Buffer.from('60', 'hex');
exports['bencode'] = Buffer.from('63', 'hex'); // multiformats

exports['multicodec'] = Buffer.from('30', 'hex');
exports['multihash'] = Buffer.from('31', 'hex');
exports['multiaddr'] = Buffer.from('32', 'hex');
exports['multibase'] = Buffer.from('33', 'hex'); // multihashes

exports['identity'] = Buffer.from('00', 'hex');
exports['md4'] = Buffer.from('d4', 'hex');
exports['md5'] = Buffer.from('d5', 'hex');
exports['sha1'] = Buffer.from('11', 'hex');
exports['sha2-256'] = Buffer.from('12', 'hex');
exports['sha2-512'] = Buffer.from('13', 'hex');
exports['dbl-sha2-256'] = Buffer.from('56', 'hex');
exports['sha3-224'] = Buffer.from('17', 'hex');
exports['sha3-256'] = Buffer.from('16', 'hex');
exports['sha3-384'] = Buffer.from('15', 'hex');
exports['sha3-512'] = Buffer.from('14', 'hex');
exports['shake-128'] = Buffer.from('18', 'hex');
exports['shake-256'] = Buffer.from('19', 'hex');
exports['keccak-224'] = Buffer.from('1a', 'hex');
exports['keccak-256'] = Buffer.from('1b', 'hex');
exports['keccak-384'] = Buffer.from('1c', 'hex');
exports['keccak-512'] = Buffer.from('1d', 'hex');
exports['murmur3-128'] = Buffer.from('22', 'hex');
exports['murmur3-32'] = Buffer.from('23', 'hex');
exports['x11'] = Buffer.from('1100', 'hex');
exports['blake2b-8'] = Buffer.from('b201', 'hex');
exports['blake2b-16'] = Buffer.from('b202', 'hex');
exports['blake2b-24'] = Buffer.from('b203', 'hex');
exports['blake2b-32'] = Buffer.from('b204', 'hex');
exports['blake2b-40'] = Buffer.from('b205', 'hex');
exports['blake2b-48'] = Buffer.from('b206', 'hex');
exports['blake2b-56'] = Buffer.from('b207', 'hex');
exports['blake2b-64'] = Buffer.from('b208', 'hex');
exports['blake2b-72'] = Buffer.from('b209', 'hex');
exports['blake2b-80'] = Buffer.from('b20a', 'hex');
exports['blake2b-88'] = Buffer.from('b20b', 'hex');
exports['blake2b-96'] = Buffer.from('b20c', 'hex');
exports['blake2b-104'] = Buffer.from('b20d', 'hex');
exports['blake2b-112'] = Buffer.from('b20e', 'hex');
exports['blake2b-120'] = Buffer.from('b20f', 'hex');
exports['blake2b-128'] = Buffer.from('b210', 'hex');
exports['blake2b-136'] = Buffer.from('b211', 'hex');
exports['blake2b-144'] = Buffer.from('b212', 'hex');
exports['blake2b-152'] = Buffer.from('b213', 'hex');
exports['blake2b-160'] = Buffer.from('b214', 'hex');
exports['blake2b-168'] = Buffer.from('b215', 'hex');
exports['blake2b-176'] = Buffer.from('b216', 'hex');
exports['blake2b-184'] = Buffer.from('b217', 'hex');
exports['blake2b-192'] = Buffer.from('b218', 'hex');
exports['blake2b-200'] = Buffer.from('b219', 'hex');
exports['blake2b-208'] = Buffer.from('b21a', 'hex');
exports['blake2b-216'] = Buffer.from('b21b', 'hex');
exports['blake2b-224'] = Buffer.from('b21c', 'hex');
exports['blake2b-232'] = Buffer.from('b21d', 'hex');
exports['blake2b-240'] = Buffer.from('b21e', 'hex');
exports['blake2b-248'] = Buffer.from('b21f', 'hex');
exports['blake2b-256'] = Buffer.from('b220', 'hex');
exports['blake2b-264'] = Buffer.from('b221', 'hex');
exports['blake2b-272'] = Buffer.from('b222', 'hex');
exports['blake2b-280'] = Buffer.from('b223', 'hex');
exports['blake2b-288'] = Buffer.from('b224', 'hex');
exports['blake2b-296'] = Buffer.from('b225', 'hex');
exports['blake2b-304'] = Buffer.from('b226', 'hex');
exports['blake2b-312'] = Buffer.from('b227', 'hex');
exports['blake2b-320'] = Buffer.from('b228', 'hex');
exports['blake2b-328'] = Buffer.from('b229', 'hex');
exports['blake2b-336'] = Buffer.from('b22a', 'hex');
exports['blake2b-344'] = Buffer.from('b22b', 'hex');
exports['blake2b-352'] = Buffer.from('b22c', 'hex');
exports['blake2b-360'] = Buffer.from('b22d', 'hex');
exports['blake2b-368'] = Buffer.from('b22e', 'hex');
exports['blake2b-376'] = Buffer.from('b22f', 'hex');
exports['blake2b-384'] = Buffer.from('b230', 'hex');
exports['blake2b-392'] = Buffer.from('b231', 'hex');
exports['blake2b-400'] = Buffer.from('b232', 'hex');
exports['blake2b-408'] = Buffer.from('b233', 'hex');
exports['blake2b-416'] = Buffer.from('b234', 'hex');
exports['blake2b-424'] = Buffer.from('b235', 'hex');
exports['blake2b-432'] = Buffer.from('b236', 'hex');
exports['blake2b-440'] = Buffer.from('b237', 'hex');
exports['blake2b-448'] = Buffer.from('b238', 'hex');
exports['blake2b-456'] = Buffer.from('b239', 'hex');
exports['blake2b-464'] = Buffer.from('b23a', 'hex');
exports['blake2b-472'] = Buffer.from('b23b', 'hex');
exports['blake2b-480'] = Buffer.from('b23c', 'hex');
exports['blake2b-488'] = Buffer.from('b23d', 'hex');
exports['blake2b-496'] = Buffer.from('b23e', 'hex');
exports['blake2b-504'] = Buffer.from('b23f', 'hex');
exports['blake2b-512'] = Buffer.from('b240', 'hex');
exports['blake2s-8'] = Buffer.from('b241', 'hex');
exports['blake2s-16'] = Buffer.from('b242', 'hex');
exports['blake2s-24'] = Buffer.from('b243', 'hex');
exports['blake2s-32'] = Buffer.from('b244', 'hex');
exports['blake2s-40'] = Buffer.from('b245', 'hex');
exports['blake2s-48'] = Buffer.from('b246', 'hex');
exports['blake2s-56'] = Buffer.from('b247', 'hex');
exports['blake2s-64'] = Buffer.from('b248', 'hex');
exports['blake2s-72'] = Buffer.from('b249', 'hex');
exports['blake2s-80'] = Buffer.from('b24a', 'hex');
exports['blake2s-88'] = Buffer.from('b24b', 'hex');
exports['blake2s-96'] = Buffer.from('b24c', 'hex');
exports['blake2s-104'] = Buffer.from('b24d', 'hex');
exports['blake2s-112'] = Buffer.from('b24e', 'hex');
exports['blake2s-120'] = Buffer.from('b24f', 'hex');
exports['blake2s-128'] = Buffer.from('b250', 'hex');
exports['blake2s-136'] = Buffer.from('b251', 'hex');
exports['blake2s-144'] = Buffer.from('b252', 'hex');
exports['blake2s-152'] = Buffer.from('b253', 'hex');
exports['blake2s-160'] = Buffer.from('b254', 'hex');
exports['blake2s-168'] = Buffer.from('b255', 'hex');
exports['blake2s-176'] = Buffer.from('b256', 'hex');
exports['blake2s-184'] = Buffer.from('b257', 'hex');
exports['blake2s-192'] = Buffer.from('b258', 'hex');
exports['blake2s-200'] = Buffer.from('b259', 'hex');
exports['blake2s-208'] = Buffer.from('b25a', 'hex');
exports['blake2s-216'] = Buffer.from('b25b', 'hex');
exports['blake2s-224'] = Buffer.from('b25c', 'hex');
exports['blake2s-232'] = Buffer.from('b25d', 'hex');
exports['blake2s-240'] = Buffer.from('b25e', 'hex');
exports['blake2s-248'] = Buffer.from('b25f', 'hex');
exports['blake2s-256'] = Buffer.from('b260', 'hex');
exports['skein256-8'] = Buffer.from('b301', 'hex');
exports['skein256-16'] = Buffer.from('b302', 'hex');
exports['skein256-24'] = Buffer.from('b303', 'hex');
exports['skein256-32'] = Buffer.from('b304', 'hex');
exports['skein256-40'] = Buffer.from('b305', 'hex');
exports['skein256-48'] = Buffer.from('b306', 'hex');
exports['skein256-56'] = Buffer.from('b307', 'hex');
exports['skein256-64'] = Buffer.from('b308', 'hex');
exports['skein256-72'] = Buffer.from('b309', 'hex');
exports['skein256-80'] = Buffer.from('b30a', 'hex');
exports['skein256-88'] = Buffer.from('b30b', 'hex');
exports['skein256-96'] = Buffer.from('b30c', 'hex');
exports['skein256-104'] = Buffer.from('b30d', 'hex');
exports['skein256-112'] = Buffer.from('b30e', 'hex');
exports['skein256-120'] = Buffer.from('b30f', 'hex');
exports['skein256-128'] = Buffer.from('b310', 'hex');
exports['skein256-136'] = Buffer.from('b311', 'hex');
exports['skein256-144'] = Buffer.from('b312', 'hex');
exports['skein256-152'] = Buffer.from('b313', 'hex');
exports['skein256-160'] = Buffer.from('b314', 'hex');
exports['skein256-168'] = Buffer.from('b315', 'hex');
exports['skein256-176'] = Buffer.from('b316', 'hex');
exports['skein256-184'] = Buffer.from('b317', 'hex');
exports['skein256-192'] = Buffer.from('b318', 'hex');
exports['skein256-200'] = Buffer.from('b319', 'hex');
exports['skein256-208'] = Buffer.from('b31a', 'hex');
exports['skein256-216'] = Buffer.from('b31b', 'hex');
exports['skein256-224'] = Buffer.from('b31c', 'hex');
exports['skein256-232'] = Buffer.from('b31d', 'hex');
exports['skein256-240'] = Buffer.from('b31e', 'hex');
exports['skein256-248'] = Buffer.from('b31f', 'hex');
exports['skein256-256'] = Buffer.from('b320', 'hex');
exports['skein512-8'] = Buffer.from('b321', 'hex');
exports['skein512-16'] = Buffer.from('b322', 'hex');
exports['skein512-24'] = Buffer.from('b323', 'hex');
exports['skein512-32'] = Buffer.from('b324', 'hex');
exports['skein512-40'] = Buffer.from('b325', 'hex');
exports['skein512-48'] = Buffer.from('b326', 'hex');
exports['skein512-56'] = Buffer.from('b327', 'hex');
exports['skein512-64'] = Buffer.from('b328', 'hex');
exports['skein512-72'] = Buffer.from('b329', 'hex');
exports['skein512-80'] = Buffer.from('b32a', 'hex');
exports['skein512-88'] = Buffer.from('b32b', 'hex');
exports['skein512-96'] = Buffer.from('b32c', 'hex');
exports['skein512-104'] = Buffer.from('b32d', 'hex');
exports['skein512-112'] = Buffer.from('b32e', 'hex');
exports['skein512-120'] = Buffer.from('b32f', 'hex');
exports['skein512-128'] = Buffer.from('b330', 'hex');
exports['skein512-136'] = Buffer.from('b331', 'hex');
exports['skein512-144'] = Buffer.from('b332', 'hex');
exports['skein512-152'] = Buffer.from('b333', 'hex');
exports['skein512-160'] = Buffer.from('b334', 'hex');
exports['skein512-168'] = Buffer.from('b335', 'hex');
exports['skein512-176'] = Buffer.from('b336', 'hex');
exports['skein512-184'] = Buffer.from('b337', 'hex');
exports['skein512-192'] = Buffer.from('b338', 'hex');
exports['skein512-200'] = Buffer.from('b339', 'hex');
exports['skein512-208'] = Buffer.from('b33a', 'hex');
exports['skein512-216'] = Buffer.from('b33b', 'hex');
exports['skein512-224'] = Buffer.from('b33c', 'hex');
exports['skein512-232'] = Buffer.from('b33d', 'hex');
exports['skein512-240'] = Buffer.from('b33e', 'hex');
exports['skein512-248'] = Buffer.from('b33f', 'hex');
exports['skein512-256'] = Buffer.from('b340', 'hex');
exports['skein512-264'] = Buffer.from('b341', 'hex');
exports['skein512-272'] = Buffer.from('b342', 'hex');
exports['skein512-280'] = Buffer.from('b343', 'hex');
exports['skein512-288'] = Buffer.from('b344', 'hex');
exports['skein512-296'] = Buffer.from('b345', 'hex');
exports['skein512-304'] = Buffer.from('b346', 'hex');
exports['skein512-312'] = Buffer.from('b347', 'hex');
exports['skein512-320'] = Buffer.from('b348', 'hex');
exports['skein512-328'] = Buffer.from('b349', 'hex');
exports['skein512-336'] = Buffer.from('b34a', 'hex');
exports['skein512-344'] = Buffer.from('b34b', 'hex');
exports['skein512-352'] = Buffer.from('b34c', 'hex');
exports['skein512-360'] = Buffer.from('b34d', 'hex');
exports['skein512-368'] = Buffer.from('b34e', 'hex');
exports['skein512-376'] = Buffer.from('b34f', 'hex');
exports['skein512-384'] = Buffer.from('b350', 'hex');
exports['skein512-392'] = Buffer.from('b351', 'hex');
exports['skein512-400'] = Buffer.from('b352', 'hex');
exports['skein512-408'] = Buffer.from('b353', 'hex');
exports['skein512-416'] = Buffer.from('b354', 'hex');
exports['skein512-424'] = Buffer.from('b355', 'hex');
exports['skein512-432'] = Buffer.from('b356', 'hex');
exports['skein512-440'] = Buffer.from('b357', 'hex');
exports['skein512-448'] = Buffer.from('b358', 'hex');
exports['skein512-456'] = Buffer.from('b359', 'hex');
exports['skein512-464'] = Buffer.from('b35a', 'hex');
exports['skein512-472'] = Buffer.from('b35b', 'hex');
exports['skein512-480'] = Buffer.from('b35c', 'hex');
exports['skein512-488'] = Buffer.from('b35d', 'hex');
exports['skein512-496'] = Buffer.from('b35e', 'hex');
exports['skein512-504'] = Buffer.from('b35f', 'hex');
exports['skein512-512'] = Buffer.from('b360', 'hex');
exports['skein1024-8'] = Buffer.from('b361', 'hex');
exports['skein1024-16'] = Buffer.from('b362', 'hex');
exports['skein1024-24'] = Buffer.from('b363', 'hex');
exports['skein1024-32'] = Buffer.from('b364', 'hex');
exports['skein1024-40'] = Buffer.from('b365', 'hex');
exports['skein1024-48'] = Buffer.from('b366', 'hex');
exports['skein1024-56'] = Buffer.from('b367', 'hex');
exports['skein1024-64'] = Buffer.from('b368', 'hex');
exports['skein1024-72'] = Buffer.from('b369', 'hex');
exports['skein1024-80'] = Buffer.from('b36a', 'hex');
exports['skein1024-88'] = Buffer.from('b36b', 'hex');
exports['skein1024-96'] = Buffer.from('b36c', 'hex');
exports['skein1024-104'] = Buffer.from('b36d', 'hex');
exports['skein1024-112'] = Buffer.from('b36e', 'hex');
exports['skein1024-120'] = Buffer.from('b36f', 'hex');
exports['skein1024-128'] = Buffer.from('b370', 'hex');
exports['skein1024-136'] = Buffer.from('b371', 'hex');
exports['skein1024-144'] = Buffer.from('b372', 'hex');
exports['skein1024-152'] = Buffer.from('b373', 'hex');
exports['skein1024-160'] = Buffer.from('b374', 'hex');
exports['skein1024-168'] = Buffer.from('b375', 'hex');
exports['skein1024-176'] = Buffer.from('b376', 'hex');
exports['skein1024-184'] = Buffer.from('b377', 'hex');
exports['skein1024-192'] = Buffer.from('b378', 'hex');
exports['skein1024-200'] = Buffer.from('b379', 'hex');
exports['skein1024-208'] = Buffer.from('b37a', 'hex');
exports['skein1024-216'] = Buffer.from('b37b', 'hex');
exports['skein1024-224'] = Buffer.from('b37c', 'hex');
exports['skein1024-232'] = Buffer.from('b37d', 'hex');
exports['skein1024-240'] = Buffer.from('b37e', 'hex');
exports['skein1024-248'] = Buffer.from('b37f', 'hex');
exports['skein1024-256'] = Buffer.from('b380', 'hex');
exports['skein1024-264'] = Buffer.from('b381', 'hex');
exports['skein1024-272'] = Buffer.from('b382', 'hex');
exports['skein1024-280'] = Buffer.from('b383', 'hex');
exports['skein1024-288'] = Buffer.from('b384', 'hex');
exports['skein1024-296'] = Buffer.from('b385', 'hex');
exports['skein1024-304'] = Buffer.from('b386', 'hex');
exports['skein1024-312'] = Buffer.from('b387', 'hex');
exports['skein1024-320'] = Buffer.from('b388', 'hex');
exports['skein1024-328'] = Buffer.from('b389', 'hex');
exports['skein1024-336'] = Buffer.from('b38a', 'hex');
exports['skein1024-344'] = Buffer.from('b38b', 'hex');
exports['skein1024-352'] = Buffer.from('b38c', 'hex');
exports['skein1024-360'] = Buffer.from('b38d', 'hex');
exports['skein1024-368'] = Buffer.from('b38e', 'hex');
exports['skein1024-376'] = Buffer.from('b38f', 'hex');
exports['skein1024-384'] = Buffer.from('b390', 'hex');
exports['skein1024-392'] = Buffer.from('b391', 'hex');
exports['skein1024-400'] = Buffer.from('b392', 'hex');
exports['skein1024-408'] = Buffer.from('b393', 'hex');
exports['skein1024-416'] = Buffer.from('b394', 'hex');
exports['skein1024-424'] = Buffer.from('b395', 'hex');
exports['skein1024-432'] = Buffer.from('b396', 'hex');
exports['skein1024-440'] = Buffer.from('b397', 'hex');
exports['skein1024-448'] = Buffer.from('b398', 'hex');
exports['skein1024-456'] = Buffer.from('b399', 'hex');
exports['skein1024-464'] = Buffer.from('b39a', 'hex');
exports['skein1024-472'] = Buffer.from('b39b', 'hex');
exports['skein1024-480'] = Buffer.from('b39c', 'hex');
exports['skein1024-488'] = Buffer.from('b39d', 'hex');
exports['skein1024-496'] = Buffer.from('b39e', 'hex');
exports['skein1024-504'] = Buffer.from('b39f', 'hex');
exports['skein1024-512'] = Buffer.from('b3a0', 'hex');
exports['skein1024-520'] = Buffer.from('b3a1', 'hex');
exports['skein1024-528'] = Buffer.from('b3a2', 'hex');
exports['skein1024-536'] = Buffer.from('b3a3', 'hex');
exports['skein1024-544'] = Buffer.from('b3a4', 'hex');
exports['skein1024-552'] = Buffer.from('b3a5', 'hex');
exports['skein1024-560'] = Buffer.from('b3a6', 'hex');
exports['skein1024-568'] = Buffer.from('b3a7', 'hex');
exports['skein1024-576'] = Buffer.from('b3a8', 'hex');
exports['skein1024-584'] = Buffer.from('b3a9', 'hex');
exports['skein1024-592'] = Buffer.from('b3aa', 'hex');
exports['skein1024-600'] = Buffer.from('b3ab', 'hex');
exports['skein1024-608'] = Buffer.from('b3ac', 'hex');
exports['skein1024-616'] = Buffer.from('b3ad', 'hex');
exports['skein1024-624'] = Buffer.from('b3ae', 'hex');
exports['skein1024-632'] = Buffer.from('b3af', 'hex');
exports['skein1024-640'] = Buffer.from('b3b0', 'hex');
exports['skein1024-648'] = Buffer.from('b3b1', 'hex');
exports['skein1024-656'] = Buffer.from('b3b2', 'hex');
exports['skein1024-664'] = Buffer.from('b3b3', 'hex');
exports['skein1024-672'] = Buffer.from('b3b4', 'hex');
exports['skein1024-680'] = Buffer.from('b3b5', 'hex');
exports['skein1024-688'] = Buffer.from('b3b6', 'hex');
exports['skein1024-696'] = Buffer.from('b3b7', 'hex');
exports['skein1024-704'] = Buffer.from('b3b8', 'hex');
exports['skein1024-712'] = Buffer.from('b3b9', 'hex');
exports['skein1024-720'] = Buffer.from('b3ba', 'hex');
exports['skein1024-728'] = Buffer.from('b3bb', 'hex');
exports['skein1024-736'] = Buffer.from('b3bc', 'hex');
exports['skein1024-744'] = Buffer.from('b3bd', 'hex');
exports['skein1024-752'] = Buffer.from('b3be', 'hex');
exports['skein1024-760'] = Buffer.from('b3bf', 'hex');
exports['skein1024-768'] = Buffer.from('b3c0', 'hex');
exports['skein1024-776'] = Buffer.from('b3c1', 'hex');
exports['skein1024-784'] = Buffer.from('b3c2', 'hex');
exports['skein1024-792'] = Buffer.from('b3c3', 'hex');
exports['skein1024-800'] = Buffer.from('b3c4', 'hex');
exports['skein1024-808'] = Buffer.from('b3c5', 'hex');
exports['skein1024-816'] = Buffer.from('b3c6', 'hex');
exports['skein1024-824'] = Buffer.from('b3c7', 'hex');
exports['skein1024-832'] = Buffer.from('b3c8', 'hex');
exports['skein1024-840'] = Buffer.from('b3c9', 'hex');
exports['skein1024-848'] = Buffer.from('b3ca', 'hex');
exports['skein1024-856'] = Buffer.from('b3cb', 'hex');
exports['skein1024-864'] = Buffer.from('b3cc', 'hex');
exports['skein1024-872'] = Buffer.from('b3cd', 'hex');
exports['skein1024-880'] = Buffer.from('b3ce', 'hex');
exports['skein1024-888'] = Buffer.from('b3cf', 'hex');
exports['skein1024-896'] = Buffer.from('b3d0', 'hex');
exports['skein1024-904'] = Buffer.from('b3d1', 'hex');
exports['skein1024-912'] = Buffer.from('b3d2', 'hex');
exports['skein1024-920'] = Buffer.from('b3d3', 'hex');
exports['skein1024-928'] = Buffer.from('b3d4', 'hex');
exports['skein1024-936'] = Buffer.from('b3d5', 'hex');
exports['skein1024-944'] = Buffer.from('b3d6', 'hex');
exports['skein1024-952'] = Buffer.from('b3d7', 'hex');
exports['skein1024-960'] = Buffer.from('b3d8', 'hex');
exports['skein1024-968'] = Buffer.from('b3d9', 'hex');
exports['skein1024-976'] = Buffer.from('b3da', 'hex');
exports['skein1024-984'] = Buffer.from('b3db', 'hex');
exports['skein1024-992'] = Buffer.from('b3dc', 'hex');
exports['skein1024-1000'] = Buffer.from('b3dd', 'hex');
exports['skein1024-1008'] = Buffer.from('b3de', 'hex');
exports['skein1024-1016'] = Buffer.from('b3df', 'hex');
exports['skein1024-1024'] = Buffer.from('b3e0', 'hex'); // multiaddrs

exports['ip4'] = Buffer.from('04', 'hex');
exports['ip6'] = Buffer.from('29', 'hex');
exports['ip6zone'] = Buffer.from('2a', 'hex');
exports['tcp'] = Buffer.from('06', 'hex');
exports['udp'] = Buffer.from('0111', 'hex');
exports['dccp'] = Buffer.from('21', 'hex');
exports['sctp'] = Buffer.from('84', 'hex');
exports['udt'] = Buffer.from('012d', 'hex');
exports['utp'] = Buffer.from('012e', 'hex');
exports['p2p'] = Buffer.from('01a5', 'hex');
exports['ipfs'] = Buffer.from('01a5', 'hex');
exports['http'] = Buffer.from('01e0', 'hex');
exports['https'] = Buffer.from('01bb', 'hex');
exports['quic'] = Buffer.from('01cc', 'hex');
exports['ws'] = Buffer.from('01dd', 'hex');
exports['wss'] = Buffer.from('01de', 'hex');
exports['onion'] = Buffer.from('01bc', 'hex');
exports['onion3'] = Buffer.from('01bd', 'hex');
exports['garlic64'] = Buffer.from('01be', 'hex');
exports['p2p-circuit'] = Buffer.from('0122', 'hex');
exports['dns'] = Buffer.from('35', 'hex');
exports['dns4'] = Buffer.from('36', 'hex');
exports['dns6'] = Buffer.from('37', 'hex');
exports['dnsaddr'] = Buffer.from('38', 'hex');
exports['p2p-websocket-star'] = Buffer.from('01df', 'hex');
exports['p2p-webrtc-star'] = Buffer.from('0113', 'hex');
exports['p2p-webrtc-direct'] = Buffer.from('0114', 'hex');
exports['unix'] = Buffer.from('0190', 'hex'); // archiving formats
// image formats
// video formats
// IPLD formats

exports['dag-pb'] = Buffer.from('70', 'hex');
exports['dag-cbor'] = Buffer.from('71', 'hex');
exports['dag-json'] = Buffer.from('0129', 'hex');
exports['git-raw'] = Buffer.from('78', 'hex');
exports['eth-block'] = Buffer.from('90', 'hex');
exports['eth-block-list'] = Buffer.from('91', 'hex');
exports['eth-tx-trie'] = Buffer.from('92', 'hex');
exports['eth-tx'] = Buffer.from('93', 'hex');
exports['eth-tx-receipt-trie'] = Buffer.from('94', 'hex');
exports['eth-tx-receipt'] = Buffer.from('95', 'hex');
exports['eth-state-trie'] = Buffer.from('96', 'hex');
exports['eth-account-snapshot'] = Buffer.from('97', 'hex');
exports['eth-storage-trie'] = Buffer.from('98', 'hex');
exports['bitcoin-block'] = Buffer.from('b0', 'hex');
exports['bitcoin-tx'] = Buffer.from('b1', 'hex');
exports['zcash-block'] = Buffer.from('c0', 'hex');
exports['zcash-tx'] = Buffer.from('c1', 'hex');
exports['stellar-block'] = Buffer.from('d0', 'hex');
exports['stellar-tx'] = Buffer.from('d1', 'hex');
exports['decred-block'] = Buffer.from('e0', 'hex');
exports['decred-tx'] = Buffer.from('e1', 'hex');
exports['dash-block'] = Buffer.from('f0', 'hex');
exports['dash-tx'] = Buffer.from('f1', 'hex');
exports['torrent-info'] = Buffer.from('7b', 'hex');
exports['torrent-file'] = Buffer.from('7c', 'hex');
exports['ed25519-pub'] = Buffer.from('ed', 'hex');
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var setImmediate = __webpack_require__(3);

var SmartBuffer = __webpack_require__(6).SmartBuffer;

var gitUtil = __webpack_require__(5);

exports = module.exports;

exports.serialize = function (dagNode, callback) {
  var lines = [];
  lines.push('tree ' + gitUtil.cidToSha(dagNode.tree['/']).toString('hex'));
  dagNode.parents.forEach(function (parent) {
    lines.push('parent ' + gitUtil.cidToSha(parent['/']).toString('hex'));
  });
  lines.push('author ' + gitUtil.serializePersonLine(dagNode.author));
  lines.push('committer ' + gitUtil.serializePersonLine(dagNode.committer));

  if (dagNode.encoding) {
    lines.push('encoding ' + dagNode.encoding);
  }

  if (dagNode.mergetag) {
    dagNode.mergetag.forEach(function (tag) {
      lines.push('mergetag object ' + gitUtil.cidToSha(tag.object['/']).toString('hex'));
      lines.push(tag.text);
    });
  }

  if (dagNode.signature) {
    lines.push('gpgsig -----BEGIN PGP SIGNATURE-----');
    lines.push(dagNode.signature.text);
  }

  lines.push('');
  lines.push(dagNode.message);
  var data = lines.join('\n');
  var outBuf = new SmartBuffer();
  outBuf.writeString('commit ');
  outBuf.writeString(data.length.toString());
  outBuf.writeUInt8(0);
  outBuf.writeString(data);
  setImmediate(function () {
    return callback(null, outBuf.toBuffer());
  });
};

exports.deserialize = function (data, callback) {
  var lines = data.toString().split('\n');
  var res = {
    gitType: 'commit',
    parents: []
  };

  var _loop = function _loop(_line) {
    var m = lines[_line].match(/^([^ ]+) (.+)$/);

    if (!m) {
      if (lines[_line] !== '') {
        setImmediate(function () {
          return callback(new Error('Invalid commit line ' + _line));
        });
      }

      res.message = lines.slice(_line + 1).join('\n');
      line = _line;
      return "break";
    }

    var key = m[1];
    var value = m[2];

    switch (key) {
      case 'tree':
        res.tree = {
          '/': gitUtil.shaToCid(Buffer.from(value, 'hex'))
        };
        break;

      case 'committer':
        res.committer = gitUtil.parsePersonLine(value);
        break;

      case 'author':
        res.author = gitUtil.parsePersonLine(value);
        break;

      case 'parent':
        res.parents.push({
          '/': gitUtil.shaToCid(Buffer.from(value, 'hex'))
        });
        break;

      case 'gpgsig':
        {
          if (value !== '-----BEGIN PGP SIGNATURE-----') {
            setImmediate(function () {
              return callback(new Error('Invalid commit line ' + _line));
            });
          }

          res.signature = {};
          var startLine = _line;

          for (; _line < lines.length - 1; _line++) {
            if (lines[_line + 1][0] !== ' ') {
              res.signature.text = lines.slice(startLine + 1, _line + 1).join('\n');
              break;
            }
          }

          break;
        }

      case 'mergetag':
        {
          var mt = value.match(/^object ([0-9a-f]{40})$/);

          if (!mt) {
            setImmediate(function () {
              return callback(new Error('Invalid commit line ' + _line));
            });
          }

          var tag = {
            object: {
              '/': gitUtil.shaToCid(Buffer.from(mt[1], 'hex'))
            }
          };
          var _startLine = _line;

          for (; _line < lines.length - 1; _line++) {
            if (lines[_line + 1][0] !== ' ') {
              tag.text = lines.slice(_startLine + 1, _line + 1).join('\n');
              break;
            }
          }

          if (!res.mergetag) {
            res.mergetag = [];
          }

          res.mergetag.push(tag);
        }
        break;

      default:
        res[key] = value;
    }

    line = _line;
  };

  for (var line = 0; line < lines.length; line++) {
    var _ret = _loop(line);

    if (_ret === "break") break;
  }

  setImmediate(function () {
    return callback(null, res);
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var setImmediate = __webpack_require__(3);

var SmartBuffer = __webpack_require__(6).SmartBuffer;

var gitUtil = __webpack_require__(5);

exports = module.exports;

exports.serialize = function (dagNode, callback) {
  var lines = [];
  lines.push('object ' + gitUtil.cidToSha(dagNode.object['/']).toString('hex'));
  lines.push('type ' + dagNode.type);
  lines.push('tag ' + dagNode.tag);

  if (dagNode.tagger !== null) {
    lines.push('tagger ' + gitUtil.serializePersonLine(dagNode.tagger));
  }

  lines.push('');
  lines.push(dagNode.message);
  var data = lines.join('\n');
  var outBuf = new SmartBuffer();
  outBuf.writeString('tag ');
  outBuf.writeString(data.length.toString());
  outBuf.writeUInt8(0);
  outBuf.writeString(data);
  setImmediate(function () {
    return callback(null, outBuf.toBuffer());
  });
};

exports.deserialize = function (data, callback) {
  var lines = data.toString().split('\n');
  var res = {
    gitType: 'tag'
  };

  var _loop = function _loop(line) {
    var m = lines[line].match(/^([^ ]+) (.+)$/);

    if (m === null) {
      if (lines[line] !== '') {
        setImmediate(function () {
          return callback(new Error('Invalid tag line ' + line));
        });
      }

      res.message = lines.slice(line + 1).join('\n');
      return "break";
    }

    var key = m[1];
    var value = m[2];

    switch (key) {
      case 'object':
        res.object = {
          '/': gitUtil.shaToCid(Buffer.from(value, 'hex'))
        };
        break;

      case 'tagger':
        res.tagger = gitUtil.parsePersonLine(value);
        break;

      case 'tag':
        res.tag = value;
        break;

      case 'type':
        res.type = value;
        break;

      default:
        res[key] = value;
    }
  };

  for (var line = 0; line < lines.length; line++) {
    var _ret = _loop(line);

    if (_ret === "break") break;
  }

  setImmediate(function () {
    return callback(null, res);
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setImmediate = __webpack_require__(3);

var SmartBuffer = __webpack_require__(6).SmartBuffer;

var gitUtil = __webpack_require__(5);

exports = module.exports;

exports.serialize = function (dagNode, callback) {
  var entries = [];
  Object.keys(dagNode).forEach(function (name) {
    entries.push([name, dagNode[name]]);
  });
  entries.sort(function (a, b) {
    return a[0] > b[0] ? 1 : -1;
  });
  var buf = new SmartBuffer();
  entries.forEach(function (entry) {
    buf.writeStringNT(entry[1].mode + ' ' + entry[0]);
    buf.writeBuffer(gitUtil.cidToSha(entry[1].hash['/']));
  });
  var outBuf = new SmartBuffer();
  outBuf.writeString('tree ');
  outBuf.writeString(buf.length.toString());
  outBuf.writeUInt8(0);
  outBuf.writeBuffer(buf.toBuffer());
  setImmediate(function () {
    return callback(null, outBuf.toBuffer());
  });
};

exports.deserialize = function (data, callback) {
  var res = {};
  var buf = SmartBuffer.fromBuffer(data, 'utf8');

  for (;;) {
    var modeName = buf.readStringNT();

    if (modeName === '') {
      break;
    }

    var hash = buf.readBuffer(gitUtil.SHA1_LENGTH);
    var modNameMatched = modeName.match(/^(\d+) (.+)$/);

    if (!modNameMatched) {
      setImmediate(function () {
        return callback(new Error('invalid file mode/name'));
      });
    }

    if (res[modNameMatched[2]]) {
      setImmediate(function () {
        return callback(new Error('duplicate file in tree'));
      });
    }

    res[modNameMatched[2]] = {
      mode: modNameMatched[1],
      hash: {
        '/': gitUtil.shaToCid(hash)
      }
    };
  }

  setImmediate(function () {
    return callback(null, res);
  });
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map