import { UnaryObj, BinaryOps, LiteralsOps } from "../types";
export const UNARY_OPS: UnaryObj = {
  "!": true,
  "-": true
};

export const BINARY_OPS: BinaryOps = {
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
export const LITERALS: LiteralsOps = {
  undefined: undefined,
  null: null,
  false: false,
  true: true
};

export const DOT = ".";
export const QUESTION = "?";
export const COLON = ":";
export const SINGLE_QUOTE_MARK = `'`;
export const DOUBLE_QUOTE_MARK = `"`;
export const LEFT_BRACKET = "[";
export const RIGHT_BRACKET = "]";
export const COMMA = ",";
export const LEFT_PAREN = "(";
export const RIGHT_PAREN = ")";
export const SEMICOLON = ";";

//expression Type
export const CONDITIONAL_EXPRESSION = "ConditionalExpression";
export const UNARY_EXPRESSION = "UnaryExpression";
export const BINARY_EXPRESSION = "BinaryExpression";
export const BINARY_OPERATOR = "BinaryOperator";
export const LITERAL = "Literal";
export const IDENTIFIER = "Identifier";
export const ARRAY_EXPRESSION = "ArrayExpression";
export const MEMBER_EXPRESSION = "MemberExpression";
export const CALL_EXPRESSION = "CallExpression";
