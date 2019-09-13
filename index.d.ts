import * as T from "./src/types";
import { AstType as AS } from "./src/types/ast";
export class ExpressionParse {
  static version: string;
  constructor({
    expression,
    unaryOps,
    binaryOps,
    literals
  }: T.ExpressionParseParams);
  addBinaryOps(ops?: T.BinaryOps): this;
  addUnaryOps(ops?: T.UnaryOps): this;
  addLiterals(ops?: T.LiteralsOps): this;
  removeUnaryOps(ops?: Array<string>): this;
  removeBinaryOps(ops?: Array<string>): this;
  removeLiterals(ops?: Array<string>): this;
  getUnaryOps(): T.UnaryOps;
  getBinaryOps(): T.BinaryOps;
  getLiterals(): T.LiteralsOps;
  getAst(): AS.Expression | Array<AS.Expression>;
}
export * from "./src/types";
export * from "./src/types/ast";
