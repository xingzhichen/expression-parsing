import { UnaryObj, BinaryOps, Literals } from "../types";
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
export const LITERALS: Literals = {
  undefined: undefined,
  null: null,
  false: false,
  true: true
};

export const DOT = ".";
export const QUESTION = "?";
export const COLON = ":";

export const CONDITIONAL_EXPRESSION = "ConditionalExpression";
export const UNARY_EXPRESSION = "UnaryExpression";
export const BINARY_EXPRESSION = "BinaryExpression";
export const BINARY_OPERATOR = "BinaryOperator";
