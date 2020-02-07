<div align="center">

[![NPM version](https://img.shields.io/npm/v/simple-expression-parsing)](https://www.npmjs.com/package/simple-expression-parsing)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/xingzhichen/expression-parsing.svg?branch=dev)](https://travis-ci.org/xingzhichen/expression-parsing)
[![Coverage Status](https://coveralls.io/repos/github/xingzhichen/expression-parsing/badge.svg?branch=dev)](https://coveralls.io/github/xingzhichen/expression-parsing?branch=dev)

# simple-expression-parsing

</div>

A simple expression parsing library that supports unary, binary, and ternary expressions. supports function parsing, supports custom binary and unary operators

## Basic usage

### install

```bash
npm install simple-expression-parsing --save-dev
yarn add simple-expression-parsing
```

### use

```javascript
import { ExpressionParse } from "simple-expression-parsing";
const instance = new ExpressionParse({
  expression: "a.b?c:d"
});
instance.getAst();
{
//   "type": "ConditionalExpression",
//   "test": {
//       "type": "MemberExpression",
//       "computed": false,
//       "object": {
//           "type": "Identifier",
//           "start": 0,
//           "end": 1,
//           "name": "a"
//       },
//       "property": {
//           "type": "Identifier",
//           "start": 2,
//           "end": 3,
//           "name": "b"
//       }
//   },
//   "consequent": {
//       "type": "Identifier",
//       "start": 4,
//       "end": 5,
//       "name": "c"
//   },
//   "alternate": {
//       "type": "Identifier",
//       "start": 6,
//       "end": 7,
//       "name": "d"
//   }
// }
```

## Browser Usage

### install

```javascript
<script src="./dist/index.js"></script>
```

### use

```javascript
const { ExpressionParse } = window;
const instance = new ExpressionParse({
  expression: "a+b"
});
instance.getAst();
```

## example

```javascript
const instance = new ExpressionParse({
  expression: "a+b"
});
console.log(instance.getAst());
// {
//     "type": "BinaryExpression",
//     "left": {
//         "type": "Identifier",
//         "start": 0,
//         "end": 1,
//         "name": "a"
//     },
//     "operator": {
//         "type": "BinaryOperator",
//         "value": "+",
//         "start": 1,
//         "end": 2
//     },
//     "right": {
//         "type": "Identifier",
//         "start": 2,
//         "end": 3,
//         "name": "b"
//     }
// }
```

```javascript
const instance = new ExpressionParse({
  expression: "a@@b"
});
instance.addBinaryOps({
  "@@": 6
});
console.log(instance.getAst());
// {
//     "type": "BinaryExpression",
//     "left": {
//         "type": "Identifier",
//         "start": 0,
//         "end": 1,
//         "name": "a"
//     },
//     "operator": {
//         "type": "BinaryOperator",
//         "value": "@@",
//         "start": 1,
//         "end": 3
//     },
//     "right": {
//         "type": "Identifier",
//         "start": 3,
//         "end": 4,
//         "name": "b"
//     }
// }
```

## docs

```javascript
const instance = new ExpressionParse({
  //The string you need to parse
  expression: "a+b",
  //Remove all default unary  operators, replacing them with custom unary  operators
  unaryOps: ["@@@@@"],
  //Remove all default binary operators, replacing them with custom binary operators
  //The value means the precedence of the operator. You can compare the priority of the default binary operator to determine your priority.
  binaryOps: {
    "#####": 5
  },
  //Remove all default literals, replacing them with custom literals
  literals: {
    this: "that"
  }
});
instance
  //Add an extra binary operator, not the same as the initialization time, will not delete the default binary operator
  .addBinaryOps({
    "##": 5
  })
  //Add an extra unary operator
  .addUnaryOps(["@@"])
  //Add an extra unary literals
  .addLiterals({
    hard: "hard"
  })
  //Remove the specified binary operators
  .removeBinaryOps(["##", "+"])
  //Remove the specified unary operators
  .removeUnaryOps(["@@"])
  //Remove the specified literals
  .removeLiterals(["hard"])
  .getAst();
```

## default data

```javascript
//default unary operators
const unaryOps = {
  "!": true,
  "-": true,
  "+": true
};
//default binary operators
const binaryOps = {
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
//default literals
const literals = {
  undefined: undefined,
  null: null,
  false: false,
  true: true
};
```

## License

The `simple-expression-parsing` is [MIT licensed](./LICENSE).
