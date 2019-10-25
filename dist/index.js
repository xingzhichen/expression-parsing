(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/data/index.ts
var UNARY_OPS = {
  "!": true,
  "-": true,
  "+": true
};
var BINARY_OPS = {
  "||": 1,
  "&&": 2,
  "|": 3,
  "^": 4,
  "&": 5,
  "==": 6,
  "!=": 6,
  "===": 6,
  "!==": 6,
  "<": 7,
  ">": 7,
  "<=": 7,
  ">=": 7,
  "<<": 8,
  ">>": 8,
  "+": 9,
  "-": 9,
  "*": 10,
  "/": 10,
  "%": 10
};
var LITERALS = {
  undefined: undefined,
  "null": null,
  "false": false,
  "true": true
};
var DOT = ".";
var QUESTION = "?";
var COLON = ":";
var SINGLE_QUOTE_MARK = "'";
var DOUBLE_QUOTE_MARK = "\"";
var LEFT_BRACKET = "[";
var RIGHT_BRACKET = "]";
var COMMA = ",";
var LEFT_PAREN = "(";
var RIGHT_PAREN = ")";
var SEMICOLON = ";"; //expression Type

var CONDITIONAL_EXPRESSION = "ConditionalExpression";
var UNARY_EXPRESSION = "UnaryExpression";
var BINARY_EXPRESSION = "BinaryExpression";
var BINARY_OPERATOR = "BinaryOperator";
var UNARY_OPERATOR = "UnaryOperator";
var LITERAL = "Literal";
var IDENTIFIER = "Identifier";
var ARRAY_EXPRESSION = "ArrayExpression";
var MEMBER_EXPRESSION = "MemberExpression";
var CALL_EXPRESSION = "CallExpression";
// CONCATENATED MODULE: ./src/utils/index.ts
function transFormArrToObj(arr) {
  return arr.reduce(function (result, op) {
    if (typeof op === "string" || typeof op === "number") {
      result[op] = true;
    }

    return result;
  }, {});
}
function deleteProperty(data, proArr) {
  proArr.forEach(function (key) {
    delete data[key];
  });

  if (Array.isArray(data)) {
    return data.filter(function (_) {
      return _;
    }); //filter empty
  }

  return data;
}
// CONCATENATED MODULE: ./src/operator.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var operator_Operator =
/*#__PURE__*/
function () {
  function Operator(_ref) {
    var unaryOps = _ref.unaryOps,
        binaryOps = _ref.binaryOps,
        literals = _ref.literals;

    _classCallCheck(this, Operator);

    this.maxBinaryLen = 1;
    this.maxUnary = 1;
    this.binaryOps = _objectSpread({}, BINARY_OPS);
    this.unaryOps = _objectSpread({}, UNARY_OPS);
    this.literals = _objectSpread({}, LITERALS);

    if (binaryOps && Object.keys(binaryOps).length) {
      this.binaryOps = _objectSpread({}, binaryOps);
    }

    if (unaryOps && unaryOps.length) {
      this.unaryOps = _objectSpread({}, transFormArrToObj(unaryOps));
    }

    if (literals && Object.keys(literals).length) {
      this.literals = _objectSpread({}, literals);
    }

    this.maxBinaryLen = this.getMaxBinaryLen();
    this.maxUnary = this.getMaxUnaryLen();
  }

  _createClass(Operator, [{
    key: "getMaxBinaryLen",
    value: function getMaxBinaryLen() {
      return Object.keys(this.binaryOps).reduce(function (max, op) {
        return op.length > max ? op.length : max;
      }, 1);
    }
  }, {
    key: "getMaxUnaryLen",
    value: function getMaxUnaryLen() {
      return Object.keys(this.unaryOps).reduce(function (max, op) {
        return op.length > max ? op.length : max;
      }, 1);
    }
  }, {
    key: "addBinaryOps",
    value: function addBinaryOps() {
      var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.binaryOps = _objectSpread({}, this.binaryOps, {}, ops);
      this.maxBinaryLen = this.getMaxBinaryLen();
      return this;
    }
  }, {
    key: "addUnaryOps",
    value: function addUnaryOps() {
      var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.unaryOps = _objectSpread({}, this.unaryOps, {}, transFormArrToObj(ops));
      this.maxUnary = this.getMaxUnaryLen();
      return this;
    }
  }, {
    key: "addLiterals",
    value: function addLiterals() {
      var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.literals = _objectSpread({}, this.literals, {}, ops);
      return this;
    }
  }, {
    key: "removeUnaryOps",
    value: function removeUnaryOps() {
      var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      deleteProperty(this.unaryOps, ops);
      this.maxUnary = this.getMaxUnaryLen();
      return this;
    }
  }, {
    key: "removeBinaryOps",
    value: function removeBinaryOps() {
      var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      deleteProperty(this.binaryOps, ops);
      this.maxBinaryLen = this.getMaxBinaryLen();
      return this;
    }
  }, {
    key: "removeLiterals",
    value: function removeLiterals() {
      var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      deleteProperty(this.literals, ops);
      return this;
    }
  }, {
    key: "getUnaryOps",
    value: function getUnaryOps() {
      return Object.keys(this.unaryOps);
    }
  }, {
    key: "getBinaryOps",
    value: function getBinaryOps() {
      return _objectSpread({}, this.binaryOps);
    }
  }, {
    key: "getLiterals",
    value: function getLiterals() {
      return _objectSpread({}, this.literals);
    }
  }]);

  return Operator;
}();


// CONCATENATED MODULE: ./src/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionParse", function() { return src_ExpressionParse; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Expression-> BinaryExpression{?Expression:Expression}


var src_ExpressionParse =
/*#__PURE__*/
function (_Operator) {
  _inherits(ExpressionParse, _Operator);

  function ExpressionParse(args) {
    var _this;

    src_classCallCheck(this, ExpressionParse);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExpressionParse).call(this, args));
    _this.expression = "";
    _this.index = 0;
    var expression = args.expression;
    _this.expression = expression;
    return _this;
  }

  src_createClass(ExpressionParse, [{
    key: "error",
    value: function error() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unexpected ".concat(this.getCurrentChar());
      var index = arguments.length > 1 ? arguments[1] : undefined;
      var err = new Error("".concat(msg, " at character ").concat(index || this.index));
      throw err;
    }
  }, {
    key: "getCurrentChar",
    value: function getCurrentChar() {
      return this.expression[this.index];
    }
  }, {
    key: "jumpOverSpace",
    value: function jumpOverSpace() {
      var spaceReg = /\s/;

      while (this.index < this.expression.length) {
        var _char = this.getCurrentChar();

        if (!_char || !spaceReg.test(_char)) {
          return;
        }

        this.index++;
      }
    }
  }, {
    key: "isIdentifierStart",
    value: function isIdentifierStart(_char2) {
      return _char2 ? /[\$_A-Za-z]/.test(_char2) : false;
    }
  }, {
    key: "isIdentifierPart",
    value: function isIdentifierPart(_char3) {
      return _char3 ? /[\$_A-Za-z0-9]/.test(_char3) : false;
    }
  }, {
    key: "getAst",
    value: function getAst() {
      this.index = 0;
      var result = [this.parseExpression()];

      while (this.index < this.expression.length) {
        this.jumpOverSpace();

        if (this.getCurrentChar() === SEMICOLON) {
          this.index++;
        }

        var expression = this.parseExpression();
        result.push(expression);
      }

      return result.length > 1 ? result : result[0];
    }
  }, {
    key: "parseExpression",
    value: function parseExpression() {
      if (!this.expression) {
        return null;
      }

      var expression = this.parseBinaryExpression();
      this.jumpOverSpace();

      if (this.getCurrentChar() === QUESTION) {
        this.index++;
        var consequent = this.parseExpression();

        if (!consequent) {
          this.error("Expected Expression");
        }

        if (this.getCurrentChar() !== COLON) {
          this.error("Expected ".concat(COLON));
        }

        this.index++;
        var alternate = this.parseExpression();

        if (!alternate) {
          this.error("Expected Expression");
        }

        var ast = {
          type: CONDITIONAL_EXPRESSION,
          test: expression,
          consequent: consequent,
          alternate: alternate
        };
        return ast;
      }

      return expression;
    }
  }, {
    key: "parseBinaryExpression",
    value: function parseBinaryExpression() {
      var left = this.parseToken();
      var operator = this.parseBinaryOperator();

      if (!operator) {
        return left;
      }

      var right = this.parseToken();

      if (operator && !right) {
        this.error();
      } //operate priority


      var tokenQueue = [left, right];
      var operatorQueue = [operator];

      var setToken = function setToken() {
        var op = operatorQueue.pop();
        var right = tokenQueue.pop();
        var left = tokenQueue.pop();
        var node = {
          type: BINARY_EXPRESSION,
          left: left,
          operator: op,
          right: right
        };
        tokenQueue.push(node);
      };

      var _opt = null;

      while (_opt = this.parseBinaryOperator()) {
        while (operatorQueue[operatorQueue.length - 1] && this.binaryOps[operatorQueue[operatorQueue.length - 1].value] >= this.binaryOps[_opt.value]) {
          setToken();
        }

        operatorQueue.push(_opt);
        var token = this.parseToken();

        if (!token) {
          this.error();
        }

        tokenQueue.push(token);
      }

      while (operatorQueue.length) {
        setToken();
      }

      return tokenQueue[0];
    }
  }, {
    key: "parseBinaryOperator",
    value: function parseBinaryOperator() {
      this.jumpOverSpace();
      var max = this.maxBinaryLen;
      var start = this.index;

      while (max > 0) {
        var str = this.expression.slice(this.index, this.index + max);

        if (!str) {
          return null;
        }

        if (this.binaryOps.hasOwnProperty(str)) {
          this.index += max;
          return {
            type: BINARY_OPERATOR,
            value: str,
            start: start,
            end: this.index
          };
        }

        max--;
      }

      return null;
    }
  }, {
    key: "parseToken",
    value: function parseToken() {
      this.jumpOverSpace();

      var _char4 = this.getCurrentChar();

      if (!_char4) {
        return null;
      }

      var ast = this.parseUnary() || this.parseVariable() || this.parseNumber() || this.parseString() || this.parseArray();

      if (!ast) {
        this.error();
      }

      return ast;
    }
  }, {
    key: "parseUnary",
    value: function parseUnary() {
      var max = this.maxUnary;
      var start = this.index;

      while (max > 0) {
        var str = this.expression.slice(this.index, this.index + max);

        if (!str) {
          return null;
        }

        if (this.unaryOps.hasOwnProperty(str)) {
          this.index += max;
          var end = this.index;
          var argument = this.parseToken();
          return {
            type: UNARY_EXPRESSION,
            operate: {
              type: UNARY_OPERATOR,
              value: str,
              start: start,
              end: end
            },
            argument: argument
          };
        }

        max--;
      }

      return null;
    }
  }, {
    key: "parseNumber",
    value: function parseNumber() {
      var number = "";
      var start = this.index;
      var firstDot = false;

      if (this.getCurrentChar() === DOT) {
        firstDot = true;
        number += this.getCurrentChar();
        this.index++;
      }

      while (this.getCurrentChar() && /^([\de\.])/.test(this.getCurrentChar())) {
        number += this.getCurrentChar();

        if (this.getCurrentChar() === DOT) {
          if (firstDot) {
            this.error();
          }

          firstDot = true;
        }

        this.index++;
      }

      if (!number) {
        return null;
      }

      if (this.isIdentifierStart(this.getCurrentChar())) {
        this.error("Variable cannot start with number", start);
      }

      return {
        type: LITERAL,
        value: parseFloat(number),
        start: start,
        end: this.index,
        raw: number
      };
    }
  }, {
    key: "parseString",
    value: function parseString() {
      var str = "",
          closed = false;
      var quote = this.getCurrentChar();
      var start = this.index;

      if (quote !== SINGLE_QUOTE_MARK && quote !== DOUBLE_QUOTE_MARK) {
        return null;
      }

      while (this.index < this.expression.length) {
        this.index++;

        var _char5 = this.getCurrentChar();

        if (_char5 === quote) {
          closed = true;
          break;
        } else if (_char5 === "\\") {
          this.index++;

          switch (this.getCurrentChar()) {
            case "n":
              str += "\n";
              break;

            case "r":
              str += "\r";
              break;

            case "t":
              str += "\t";
              break;

            case "b":
              str += "\b";
              break;

            case "f":
              str += "\f";
              break;

            case "v":
              str += "\x0B";
              break;

            default:
              str += this.getCurrentChar();
          }
        } else {
          str += _char5;
        }
      }

      this.index++;

      if (!closed) {
        this.error("Unclosed quote after \"'".concat(str, "'\""));
      }

      return {
        type: LITERAL,
        value: str,
        start: start,
        end: this.index,
        raw: "".concat(quote).concat(str).concat(quote)
      };
    }
  }, {
    key: "parseArguments",
    value: function parseArguments() {
      var args = [];

      while (this.index < this.expression.length) {
        this.jumpOverSpace();

        var _comma = this.getCurrentChar();

        if (_comma === RIGHT_BRACKET || _comma === RIGHT_PAREN) {
          break;
        }

        var arg = this.parseExpression();
        this.jumpOverSpace();
        var comma = this.getCurrentChar();

        if (comma === RIGHT_BRACKET || comma === RIGHT_PAREN) {
          args.push(arg);
          break;
        }

        if (comma === COMMA) {
          if (arg) {
            args.push(arg);
          }
        }

        this.index++;
      }

      return args;
    }
  }, {
    key: "parseArray",
    value: function parseArray() {
      if (this.getCurrentChar() === LEFT_BRACKET) {
        this.index++;
        var arg = this.parseArguments();
        this.jumpOverSpace();

        if (this.getCurrentChar() === RIGHT_BRACKET) {
          this.index++;
          return {
            type: ARRAY_EXPRESSION,
            arguments: arg
          };
        } else {
          this.error("Expected ".concat(RIGHT_BRACKET));
        }
      }

      return null;
    }
  }, {
    key: "parseVariable",
    value: function parseVariable() {
      return this.parseGroup() || this.parseObject();
    }
  }, {
    key: "parseGroup",
    value: function parseGroup() {
      if (this.getCurrentChar() === LEFT_PAREN) {
        this.index++;
        this.jumpOverSpace();
        var expression = this.parseExpression();
        this.jumpOverSpace();

        if (this.getCurrentChar() === RIGHT_PAREN) {
          this.index++;
          return expression;
        } else {
          this.error("Expected ".concat(RIGHT_PAREN));
        }
      }

      return null;
    }
  }, {
    key: "parseObject",
    value: function parseObject() {
      var obj = this.parseLiteral();

      if (!obj) {
        return null;
      }

      if (this.getCurrentChar() === LEFT_PAREN) {
        this.index++;
        this.jumpOverSpace();
        var args = this.parseArguments();
        this.jumpOverSpace();

        if (this.getCurrentChar() === RIGHT_PAREN) {
          this.index++;
          obj = {
            type: CALL_EXPRESSION,
            callee: obj,
            arguments: args
          };
        } else {
          this.error("Expected ".concat(RIGHT_PAREN));
        }
      }

      if (this.getCurrentChar() !== DOT && this.getCurrentChar() !== LEFT_BRACKET) {
        return obj;
      }

      while (this.getCurrentChar() === DOT || this.getCurrentChar() === LEFT_BRACKET) {
        if (this.getCurrentChar() === DOT) {
          this.index++;
          var property = this.parseLiteral();
          obj = {
            type: MEMBER_EXPRESSION,
            computed: false,
            object: obj,
            property: property
          };
        } else if (this.getCurrentChar() === LEFT_BRACKET) {
          this.index++;

          var _property = this.parseExpression();

          this.jumpOverSpace();

          if (this.getCurrentChar() === RIGHT_BRACKET) {
            this.index++;
            obj = {
              type: MEMBER_EXPRESSION,
              computed: true,
              object: obj,
              property: _property
            };
          } else {
            this.error("Expected ".concat(RIGHT_BRACKET));
          }
        }
      }

      return obj;
    }
  }, {
    key: "parseLiteral",
    value: function parseLiteral() {
      this.jumpOverSpace();
      var start = this.index;
      var str = this.getCurrentChar();

      if (this.isIdentifierStart(this.getCurrentChar())) {
        this.index++;

        while (this.getCurrentChar() && this.isIdentifierPart(this.getCurrentChar())) {
          str += this.getCurrentChar();
          this.index++;
        }

        if (this.literals.hasOwnProperty(str)) {
          return {
            type: LITERAL,
            start: start,
            end: this.index,
            value: this.literals[str],
            raw: str
          };
        } else {
          return {
            type: IDENTIFIER,
            start: start,
            end: this.index,
            name: str
          };
        }
      }

      return null;
    }
  }]);

  return ExpressionParse;
}(operator_Operator);
src_ExpressionParse.version = "1.0.2";

/***/ })
/******/ ]);
});