<div align="center">

[![NPM version](https://img.shields.io/npm/v/simple-expression-parsing)](https://www.npmjs.com/package/simple-expression-parsing)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)
[![code coverage](https://img.shields.io/coveralls/xingzhichen/simple-expression-parsing.svg?style=flat-square)](https://coveralls.io/r/xingzhichen/simple-expression-parsing)

# simple-expression-parsing

</div>
a simple expression parsing library

## install

```bash
npm install simple-expression-parsing --save-dev
yarn add simple-expression-parsing
<script src="./dist/index"></script>
```

## quick start

```javascript
import { ExpressionParse } from "simple-expression-parsing";
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

## docs

```

```

## default data

```

```

## License

The `simple-expression-parsing` is [MIT licensed](./LICENSE).
