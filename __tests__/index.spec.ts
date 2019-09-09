import ExpressionParse from "../src";
import * as D from "../src/data";
test("init unaryOps,binaryOps,literals, init simple expression", () => {
  const instance = new ExpressionParse({
    expression: "@@@@@1 ##### empty",
    unaryOps: ["@@@@@"],
    binaryOps: {
      "#####": 5
    },
    literals: {
      empty: "empty"
    }
  });
  const unaryOps = instance.getUnaryOps();
  const binaryOps = instance.getBinaryOps();
  const literals = instance.getLiterals();
  expect(unaryOps).toEqual(["@@@@@"]);
  expect(binaryOps).toEqual({
    "#####": 5
  });
  expect(literals).toEqual({
    empty: "empty"
  });
  const expectAst = {
    type: D.BINARY_EXPRESSION,
    left: {
      type: D.UNARY_EXPRESSION,
      operate: { type: D.UNARY_OPERATOR, value: "@@@@@", start: 0, end: 5 },
      argument: { type: D.LITERAL, value: 1, start: 5, end: 6, raw: "1" }
    },
    operator: { type: D.BINARY_OPERATOR, value: "#####", start: 7, end: 12 },
    right: { type: D.LITERAL, start: 13, end: 18, value: "empty", raw: "empty" }
  };
  expect(instance.getAst()).toEqual(expectAst);
});

test("add unaryOps,binaryOps,literals, init simple expression", () => {
  const instance = new ExpressionParse({
    expression: "@@@@@1 ##### empty + 1"
  });
  const ast = instance
    .addBinaryOps({
      "#####": 5
    })
    .addUnaryOps(["@@@@@"])
    .addLiterals({
      empty: "empty"
    })
    .getAst();
  const expectAst = {
    type: "BinaryExpression",
    left: {
      type: "UnaryExpression",
      operate: {
        type: "UnaryOperator",
        value: "@@@@@",
        start: 0,
        end: 5
      },
      argument: {
        type: "Literal",
        value: 1,
        start: 5,
        end: 6,
        raw: "1"
      }
    },
    operator: {
      type: "BinaryOperator",
      value: "#####",
      start: 7,
      end: 12
    },
    right: {
      type: "BinaryExpression",
      left: {
        type: "Literal",
        start: 13,
        end: 18,
        value: "empty",
        raw: "empty"
      },
      operator: {
        type: "BinaryOperator",
        value: "+",
        start: 19,
        end: 20
      },
      right: {
        type: "Literal",
        value: 1,
        start: 21,
        end: 22,
        raw: "1"
      }
    }
  };
  expect(ast).toEqual(expectAst);
});
test("delete unaryOps,binaryOps,literals, catch error", () => {
  const instance = new ExpressionParse({
    expression: "-1+1*false"
  });
  instance
    .removeBinaryOps(["+"])
    .removeUnaryOps(["-"])
    .removeLiterals(["false"]);
  expect(() => {
    instance.getAst();
  }).toThrow();
});
test("test ternary expression", () => {
  const instance = new ExpressionParse({
    expression: "a?b:c"
  });
  const expectAst = {
    type: "ConditionalExpression",
    test: { type: "Identifier", start: 0, end: 1, name: "a" },
    consequent: { type: "Identifier", start: 2, end: 3, name: "b" },
    alternate: { type: "Identifier", start: 4, end: 5, name: "c" }
  };
  expect(instance.getAst()).toEqual(expectAst);
});
test("test function", () => {
  const instance = new ExpressionParse({
    expression: "isEmpty(a,b,c)?true:false"
  });
  const expectAst = {
    type: "ConditionalExpression",
    test: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        start: 0,
        end: 7,
        name: "isEmpty"
      },
      arguments: [
        {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "a"
        },
        {
          type: "Identifier",
          start: 10,
          end: 11,
          name: "b"
        },
        {
          type: "Identifier",
          start: 12,
          end: 13,
          name: "c"
        }
      ]
    },
    consequent: {
      type: "Literal",
      start: 15,
      end: 19,
      value: true,
      raw: "true"
    },
    alternate: {
      type: "Literal",
      start: 20,
      end: 25,
      value: false,
      raw: "false"
    }
  };
  expect(instance.getAst()).toEqual(expectAst);
});

test("test complex expression", () => {
  const instance = new ExpressionParse({
    expression:
      "fn(a@@@b,c@@d,e)?this:isEmpty('2')?this:(@#$1+2*3@@@##4)||(-1&&g===j)"
  });
  const ast = instance
    .addBinaryOps({
      "@@@": 5,
      "@@": 6
    })
    .addUnaryOps(["@#$", "##"])
    .addLiterals({
      empty: "empty",
      this: "that"
    })
    .getAst();
  const expectAst = {
    type: "ConditionalExpression",
    test: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        start: 0,
        end: 2,
        name: "fn"
      },
      arguments: [
        {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            start: 3,
            end: 4,
            name: "a"
          },
          operator: {
            type: "BinaryOperator",
            value: "@@@",
            start: 4,
            end: 7
          },
          right: {
            type: "Identifier",
            start: 7,
            end: 8,
            name: "b"
          }
        },
        {
          type: "BinaryExpression",
          left: {
            type: "Identifier",
            start: 9,
            end: 10,
            name: "c"
          },
          operator: {
            type: "BinaryOperator",
            value: "@@",
            start: 10,
            end: 12
          },
          right: {
            type: "Identifier",
            start: 12,
            end: 13,
            name: "d"
          }
        },
        {
          type: "Identifier",
          start: 14,
          end: 15,
          name: "e"
        }
      ]
    },
    consequent: {
      type: "Literal",
      start: 17,
      end: 21,
      value: "that",
      raw: "this"
    },
    alternate: {
      type: "ConditionalExpression",
      test: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          start: 22,
          end: 29,
          name: "isEmpty"
        },
        arguments: [
          {
            type: "Literal",
            value: "2",
            start: 30,
            end: 33,
            raw: "'2'"
          }
        ]
      },
      consequent: {
        type: "Literal",
        start: 35,
        end: 39,
        value: "that",
        raw: "this"
      },
      alternate: {
        type: "BinaryExpression",
        left: {
          type: "BinaryExpression",
          left: {
            type: "BinaryExpression",
            left: {
              type: "UnaryExpression",
              operate: {
                type: "UnaryOperator",
                value: "@#$",
                start: 41,
                end: 44
              },
              argument: {
                type: "Literal",
                value: 1,
                start: 44,
                end: 45,
                raw: "1"
              }
            },
            operator: {
              type: "BinaryOperator",
              value: "+",
              start: 45,
              end: 46
            },
            right: {
              type: "BinaryExpression",
              left: {
                type: "Literal",
                value: 2,
                start: 46,
                end: 47,
                raw: "2"
              },
              operator: {
                type: "BinaryOperator",
                value: "*",
                start: 47,
                end: 48
              },
              right: {
                type: "Literal",
                value: 3,
                start: 48,
                end: 49,
                raw: "3"
              }
            }
          },
          operator: {
            type: "BinaryOperator",
            value: "@@@",
            start: 49,
            end: 52
          },
          right: {
            type: "UnaryExpression",
            operate: {
              type: "UnaryOperator",
              value: "##",
              start: 52,
              end: 54
            },
            argument: {
              type: "Literal",
              value: 4,
              start: 54,
              end: 55,
              raw: "4"
            }
          }
        },
        operator: {
          type: "BinaryOperator",
          value: "||",
          start: 56,
          end: 58
        },
        right: {
          type: "BinaryExpression",
          left: {
            type: "UnaryExpression",
            operate: {
              type: "UnaryOperator",
              value: "-",
              start: 59,
              end: 60
            },
            argument: {
              type: "Literal",
              value: 1,
              start: 60,
              end: 61,
              raw: "1"
            }
          },
          operator: {
            type: "BinaryOperator",
            value: "&&",
            start: 61,
            end: 63
          },
          right: {
            type: "BinaryExpression",
            left: {
              type: "Identifier",
              start: 63,
              end: 64,
              name: "g"
            },
            operator: {
              type: "BinaryOperator",
              value: "===",
              start: 64,
              end: 67
            },
            right: {
              type: "Identifier",
              start: 67,
              end: 68,
              name: "j"
            }
          }
        }
      }
    }
  };
  expect(ast).toEqual(expectAst);
});
