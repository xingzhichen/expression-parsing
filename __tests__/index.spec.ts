import { ExpressionParse } from "../src";
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
    type: D.BINARY_EXPRESSION,
    left: {
      type: D.UNARY_EXPRESSION,
      operate: {
        type: D.UNARY_OPERATOR,
        value: "@@@@@",
        start: 0,
        end: 5
      },
      argument: {
        type: D.LITERAL,
        value: 1,
        start: 5,
        end: 6,
        raw: "1"
      }
    },
    operator: {
      type: D.BINARY_OPERATOR,
      value: "#####",
      start: 7,
      end: 12
    },
    right: {
      type: D.BINARY_EXPRESSION,
      left: {
        type: D.LITERAL,
        start: 13,
        end: 18,
        value: "empty",
        raw: "empty"
      },
      operator: {
        type: D.BINARY_OPERATOR,
        value: "+",
        start: 19,
        end: 20
      },
      right: {
        type: D.LITERAL,
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
    type: D.CONDITIONAL_EXPRESSION,
    test: { type: D.IDENTIFIER, start: 0, end: 1, name: "a" },
    consequent: { type: D.IDENTIFIER, start: 2, end: 3, name: "b" },
    alternate: { type: D.IDENTIFIER, start: 4, end: 5, name: "c" }
  };
  expect(instance.getAst()).toEqual(expectAst);
});
test("test function", () => {
  const instance = new ExpressionParse({
    expression: "isEmpty(a,b,c)?true:false"
  });
  const expectAst = {
    type: D.CONDITIONAL_EXPRESSION,
    test: {
      type: D.CALL_EXPRESSION,
      callee: {
        type: D.IDENTIFIER,
        start: 0,
        end: 7,
        name: "isEmpty"
      },
      arguments: [
        {
          type: D.IDENTIFIER,
          start: 8,
          end: 9,
          name: "a"
        },
        {
          type: D.IDENTIFIER,
          start: 10,
          end: 11,
          name: "b"
        },
        {
          type: D.IDENTIFIER,
          start: 12,
          end: 13,
          name: "c"
        }
      ]
    },
    consequent: {
      type: D.LITERAL,
      start: 15,
      end: 19,
      value: true,
      raw: "true"
    },
    alternate: {
      type: D.LITERAL,
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
    type: D.CONDITIONAL_EXPRESSION,
    test: {
      type: D.CALL_EXPRESSION,
      callee: {
        type: D.IDENTIFIER,
        start: 0,
        end: 2,
        name: "fn"
      },
      arguments: [
        {
          type: D.BINARY_EXPRESSION,
          left: {
            type: D.IDENTIFIER,
            start: 3,
            end: 4,
            name: "a"
          },
          operator: {
            type: D.BINARY_OPERATOR,
            value: "@@@",
            start: 4,
            end: 7
          },
          right: {
            type: D.IDENTIFIER,
            start: 7,
            end: 8,
            name: "b"
          }
        },
        {
          type: D.BINARY_EXPRESSION,
          left: {
            type: D.IDENTIFIER,
            start: 9,
            end: 10,
            name: "c"
          },
          operator: {
            type: D.BINARY_OPERATOR,
            value: "@@",
            start: 10,
            end: 12
          },
          right: {
            type: D.IDENTIFIER,
            start: 12,
            end: 13,
            name: "d"
          }
        },
        {
          type: D.IDENTIFIER,
          start: 14,
          end: 15,
          name: "e"
        }
      ]
    },
    consequent: {
      type: D.LITERAL,
      start: 17,
      end: 21,
      value: "that",
      raw: "this"
    },
    alternate: {
      type: D.CONDITIONAL_EXPRESSION,
      test: {
        type: D.CALL_EXPRESSION,
        callee: {
          type: D.IDENTIFIER,
          start: 22,
          end: 29,
          name: "isEmpty"
        },
        arguments: [
          {
            type: D.LITERAL,
            value: "2",
            start: 30,
            end: 33,
            raw: "'2'"
          }
        ]
      },
      consequent: {
        type: D.LITERAL,
        start: 35,
        end: 39,
        value: "that",
        raw: "this"
      },
      alternate: {
        type: D.BINARY_EXPRESSION,
        left: {
          type: D.BINARY_EXPRESSION,
          left: {
            type: D.BINARY_EXPRESSION,
            left: {
              type: D.UNARY_EXPRESSION,
              operate: {
                type: D.UNARY_OPERATOR,
                value: "@#$",
                start: 41,
                end: 44
              },
              argument: {
                type: D.LITERAL,
                value: 1,
                start: 44,
                end: 45,
                raw: "1"
              }
            },
            operator: {
              type: D.BINARY_OPERATOR,
              value: "+",
              start: 45,
              end: 46
            },
            right: {
              type: D.BINARY_EXPRESSION,
              left: {
                type: D.LITERAL,
                value: 2,
                start: 46,
                end: 47,
                raw: "2"
              },
              operator: {
                type: D.BINARY_OPERATOR,
                value: "*",
                start: 47,
                end: 48
              },
              right: {
                type: D.LITERAL,
                value: 3,
                start: 48,
                end: 49,
                raw: "3"
              }
            }
          },
          operator: {
            type: D.BINARY_OPERATOR,
            value: "@@@",
            start: 49,
            end: 52
          },
          right: {
            type: D.UNARY_EXPRESSION,
            operate: {
              type: D.UNARY_OPERATOR,
              value: "##",
              start: 52,
              end: 54
            },
            argument: {
              type: D.LITERAL,
              value: 4,
              start: 54,
              end: 55,
              raw: "4"
            }
          }
        },
        operator: {
          type: D.BINARY_OPERATOR,
          value: "||",
          start: 56,
          end: 58
        },
        right: {
          type: D.BINARY_EXPRESSION,
          left: {
            type: D.UNARY_EXPRESSION,
            operate: {
              type: D.UNARY_OPERATOR,
              value: "-",
              start: 59,
              end: 60
            },
            argument: {
              type: D.LITERAL,
              value: 1,
              start: 60,
              end: 61,
              raw: "1"
            }
          },
          operator: {
            type: D.BINARY_OPERATOR,
            value: "&&",
            start: 61,
            end: 63
          },
          right: {
            type: D.BINARY_EXPRESSION,
            left: {
              type: D.IDENTIFIER,
              start: 63,
              end: 64,
              name: "g"
            },
            operator: {
              type: D.BINARY_OPERATOR,
              value: "===",
              start: 64,
              end: 67
            },
            right: {
              type: D.IDENTIFIER,
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
