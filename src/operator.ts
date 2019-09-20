import * as U from "./utils";
import * as T from "./types";
import * as D from "./data";

export default class Operator {
  constructor({
    unaryOps,
    binaryOps,
    literals
  }: Omit<T.ExpressionParseParams, "expression">) {
    if (binaryOps && Object.keys(binaryOps).length) {
      this.binaryOps = {
        ...binaryOps
      };
    }
    if (unaryOps && unaryOps.length) {
      this.unaryOps = {
        ...U.transFormArrToObj(unaryOps)
      };
    }
    if (literals && Object.keys(literals).length) {
      this.literals = {
        ...literals
      };
    }
    this.maxBinaryLen = this.getMaxBinaryLen();
    this.maxUnary = this.getMaxUnaryLen();
  }
  protected maxBinaryLen: number = 1;
  protected maxUnary: number = 1;
  protected binaryOps: T.BinaryOps = {
    ...D.BINARY_OPS
  };
  protected unaryOps: T.UnaryObj = {
    ...D.UNARY_OPS
  };
  protected literals: T.LiteralsOps = {
    ...D.LITERALS
  };
  protected getMaxBinaryLen(): number {
    return Object.keys(this.binaryOps).reduce((max, op) => {
      return op.length > max ? op.length : max;
    }, 1);
  }
  protected getMaxUnaryLen(): number {
    return Object.keys(this.unaryOps).reduce((max, op) => {
      return op.length > max ? op.length : max;
    }, 1);
  }
  public addBinaryOps(ops: T.BinaryOps = {}): this {
    this.binaryOps = {
      ...this.binaryOps,
      ...ops
    };
    this.maxBinaryLen = this.getMaxBinaryLen();
    return this;
  }
  public addUnaryOps(ops: T.UnaryOps = []): this {
    this.unaryOps = {
      ...this.unaryOps,
      ...U.transFormArrToObj(ops)
    };
    this.maxUnary = this.getMaxUnaryLen();
    return this;
  }
  public addLiterals(ops: T.LiteralsOps = {}): this {
    this.literals = {
      ...this.literals,
      ...ops
    };
    return this;
  }
  public removeUnaryOps(ops: Array<string> = []): this {
    U.deleteProperty(this.unaryOps, ops);
    this.maxUnary = this.getMaxUnaryLen();
    return this;
  }
  public removeBinaryOps(ops: Array<string> = []): this {
    U.deleteProperty(this.binaryOps, ops);
    this.maxBinaryLen = this.getMaxBinaryLen();
    return this;
  }
  public removeLiterals(ops: Array<string> = []): this {
    U.deleteProperty(this.literals, ops);
    return this;
  }
  public getUnaryOps(): T.UnaryOps {
    return Object.keys(this.unaryOps);
  }
  public getBinaryOps(): T.BinaryOps {
    return {
      ...this.binaryOps
    };
  }
  public getLiterals(): T.LiteralsOps {
    return {
      ...this.literals
    };
  }
}
