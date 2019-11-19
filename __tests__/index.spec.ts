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

describe("test decimal point", () => {
  test("Correct decimal point  ", () => {
    const instance = new ExpressionParse({
      expression: ".6+2.7"
    });
    const expectAst = {
      type: "BinaryExpression",
      left: { type: "Literal", value: 0.6, start: 0, end: 2, raw: ".6" },
      operator: { type: "BinaryOperator", value: "+", start: 2, end: 3 },
      right: { type: "Literal", value: 2.7, start: 3, end: 6, raw: "2.7" }
    };
    expect(instance.getAst()).toEqual(expectAst);
  });
  test("Wrong decimal point  ", () => {
    const instance = new ExpressionParse({
      expression: ".6.5+3.1b"
    });
    expect(() => {
      instance.getAst();
    }).toThrow();
  });
});
test("empty expression", () => {
  const instance = new ExpressionParse({
    expression: ""
  });
  expect(instance.getAst()).toBeNull;
});
test("function", () => {
  const instance = new ExpressionParse({
    expression: "empty(getxx(),haha())"
  });
  const expectAst = {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      start: 0,
      end: 5,
      name: "empty"
    },
    arguments: [
      {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          start: 6,
          end: 11,
          name: "getxx"
        },
        arguments: []
      },
      {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          start: 14,
          end: 18,
          name: "haha"
        },
        arguments: []
      }
    ]
  };
  expect(instance.getAst()).toEqual(expectAst);
});
describe("object", () => {
  test("computed true", () => {
    const instance = new ExpressionParse({
      expression: "a.b[c.d]"
    });
    const expectAst = {
      type: "MemberExpression",
      computed: true,
      object: {
        type: "MemberExpression",
        computed: false,
        object: {
          type: "Identifier",
          start: 0,
          end: 1,
          name: "a"
        },
        property: {
          type: "Identifier",
          start: 2,
          end: 3,
          name: "b"
        }
      },
      property: {
        type: "MemberExpression",
        computed: false,
        object: {
          type: "Identifier",
          start: 4,
          end: 5,
          name: "c"
        },
        property: {
          type: "Identifier",
          start: 6,
          end: 7,
          name: "d"
        }
      }
    };
    expect(instance.getAst()).toEqual(expectAst);
  });
  test("computed false", () => {
    const instance = new ExpressionParse({
      expression: "a.b.c"
    });
    const expectAst = {
      type: "MemberExpression",
      computed: false,
      object: {
        type: "MemberExpression",
        computed: false,
        object: {
          type: "Identifier",
          start: 0,
          end: 1,
          name: "a"
        },
        property: {
          type: "Identifier",
          start: 2,
          end: 3,
          name: "b"
        }
      },
      property: {
        type: "Identifier",
        start: 4,
        end: 5,
        name: "c"
      }
    };
    expect(instance.getAst()).toEqual(expectAst);
  });
});

test("Binary expression parsing error", () => {
  const instance = new ExpressionParse({
    expression: "a+"
  });
  expect(() => {
    instance.getAst();
  }).toThrow();
});
describe("test ternary expression", () => {
  test("normal ternary expression", () => {
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
  test("missing consequent", () => {
    const instance = new ExpressionParse({
      expression: "a?b:"
    });
    expect(() => {
      instance.getAst();
    }).toThrow();
  });
  test("missing symbol", () => {
    const instance = new ExpressionParse({
      expression: "a?b"
    });
    expect(() => {
      instance.getAst();
    }).toThrow();
  });
  test("missing alternate", () => {
    const instance = new ExpressionParse({
      expression: "a?"
    });
    expect(() => {
      instance.getAst();
    }).toThrow();
  });
});
test("Test multiple expressions", () => {
  const instance = new ExpressionParse({
    expression: "a+b;c?a:b"
  });
  const expectAst = [
    {
      type: "BinaryExpression",
      left: {
        type: "Identifier",
        start: 0,
        end: 1,
        name: "a"
      },
      operator: {
        type: "BinaryOperator",
        value: "+",
        start: 1,
        end: 2
      },
      right: {
        type: "Identifier",
        start: 2,
        end: 3,
        name: "b"
      }
    },
    {
      type: "ConditionalExpression",
      test: {
        type: "Identifier",
        start: 4,
        end: 5,
        name: "c"
      },
      consequent: {
        type: "Identifier",
        start: 6,
        end: 7,
        name: "a"
      },
      alternate: {
        type: "Identifier",
        start: 8,
        end: 9,
        name: "b"
      }
    }
  ];
  expect(instance.getAst()).toEqual(expectAst);
});
test("test complex expression", () => {
  const instance = new ExpressionParse({
    expression: `fn(a@@@b,c@@d,e)?this:isEmpty('2')?this:(@#$1+2*3@@@##4)||(-1&&g===j)||'a\n\r\t\b\f'||[a.b,a[c],a.c.d]`
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
          },
          operator: {
            type: "BinaryOperator",
            value: "||",
            start: 69,
            end: 71
          },
          right: {
            type: "Literal",
            value: "a\n\r\t\b\f",
            start: 71,
            end: 79,
            raw: "'a\n\r\t\b\f'"
          }
        },
        operator: {
          type: "BinaryOperator",
          value: "||",
          start: 79,
          end: 81
        },
        right: {
          type: "ArrayExpression",
          arguments: [
            {
              type: "MemberExpression",
              computed: false,
              object: {
                type: "Identifier",
                start: 82,
                end: 83,
                name: "a"
              },
              property: {
                type: "Identifier",
                start: 84,
                end: 85,
                name: "b"
              }
            },
            {
              type: "MemberExpression",
              computed: true,
              object: {
                type: "Identifier",
                start: 86,
                end: 87,
                name: "a"
              },
              property: {
                type: "Identifier",
                start: 88,
                end: 89,
                name: "c"
              }
            },
            {
              type: "MemberExpression",
              computed: false,
              object: {
                type: "MemberExpression",
                computed: false,
                object: {
                  type: "Identifier",
                  start: 91,
                  end: 92,
                  name: "a"
                },
                property: {
                  type: "Identifier",
                  start: 93,
                  end: 94,
                  name: "c"
                }
              },
              property: {
                type: "Identifier",
                start: 95,
                end: 96,
                name: "d"
              }
            }
          ]
        }
      }
    }
  };
  expect(ast).toEqual(expectAst);
});
