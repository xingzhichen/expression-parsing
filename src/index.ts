// Expression-> BinaryExpression{?Expression:Expression}

// BinaryExpression->Token(BinaryOperator Token)*  //此处做二元操作符的优先级处理

// Token->Unary | Literal | Array | Variable
// Literal-> true|false|null|undefined |Numeric | String

// Unary-> UnaryOperator Expression

// Numeric-> \d+{'.'\d+}

// String-> '\w+'| "\w+"

// Array->'['Arguments']'

// Variable-> '('Expression ')' | Identifier{'.'Identifier}? | Identifier'['Expression']'|Identifier'('Arguments')'

// Identifier-> [a-zA-Z_$#]
// Arguments-> Expression{,Expression}*

// BinaryOperator-> - | + | = | === | == | || | && |>=     //。。等  可自定义

// UnaryOperator-> - | + | !  //可自定义

import * as T from "./types";
import * as D from "./data";
import * as U from "./utils";
import { AstType as AS } from "./types/ast";

export default class ExpressionParse {
  static version: string = "1.0.0";
  private expression: string = "";
  private index: number = 0;
  private maxBinaryLen: number = 1;
  private binaryOps: T.BinaryOps = D.BINARY_OPS;
  private unaryOps: T.UnaryObj = D.UNARY_OPS;
  private literals: T.LiteralsOps = D.LITERALS;

  constructor({
    expression,
    unaryOps,
    binaryOps,
    literals
  }: T.ExpressionParseParams) {
    this.expression = expression;
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
  }
  private getMaxBinaryLen(): number {
    return Object.keys(this.binaryOps).reduce((max, op) => {
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
  private error(msg: string = "Unexpected character"): Error {
    return new Error(`${msg} at ${this.index}`);
  }
  private getCurrentChar(): string | undefined {
    return this.expression[this.index];
  }
  private jumpOverSpace() {
    const spaceReg = /\s/;
    while (true) {
      const char: string | undefined = this.getCurrentChar();
      if (!char || !spaceReg.test(char)) {
        return;
      }
      this.index++;
    }
  }

  private parseExpression(): AS.Expression {
    if (!this.expression) {
      return null;
    }
    const binaryExpression: AS.BinaryExpression = this.parseBinaryExpression();
    this.jumpOverSpace();
    if (this.expression[this.index + 1] === D.QUESTION) {
      const consequent: AS.Expression = this.parseExpression();
      if (!consequent) {
        this.error(`Expected Expression`);
      }
      this.index++;
      if (this.getCurrentChar() !== D.COLON) {
        this.error(`Expected ${D.COLON}`);
      }
      const alternate: AS.Expression = this.parseExpression();
      if (!alternate) {
        this.error(`Expected Expression`);
      }
      const ast: AS.TernaryExpression = {
        type: D.CONDITIONAL_EXPRESSION,
        test: binaryExpression,
        consequent,
        alternate
      };
      return ast;
    }
    return binaryExpression;
  }
  private parseBinaryExpression(): AS.BinaryExpression | AS.Token {
    this.jumpOverSpace();
    const left: AS.Token = this.parseToken();
    const operator: AS.BinaryOperator = this.parseBinaryOperator();
    const right: AS.Token = this.parseToken();
    if (operator && !right) {
      this.error();
    }
    if (!operator && !right) {
      return left;
    }
    //operate priority

    const tokenQueue: AS.BinaryExpression[] = [left, right];
    const operatorQueue = [operator];
    const setToken = () => {
      let op = operatorQueue.pop()!;
      const right: AS.Token = tokenQueue.pop()!;
      const left: AS.Token = tokenQueue.pop()!;
      const node: AS.BinaryExpression = {
        type: D.BINARY_EXPRESSION,
        left,
        operator: op,
        right
      };
      tokenQueue.push(node);
    };
    let _opt: AS.BinaryOperator | null = null;
    while ((_opt = this.parseBinaryOperator())) {
      while (
        operatorQueue[operatorQueue.length - 1] &&
        this.binaryOps[operatorQueue[operatorQueue.length - 1]!.operator] >=
          this.binaryOps[_opt!.operator]
      ) {
        setToken();
      }
      operatorQueue.push(_opt);
      tokenQueue.push(this.parseToken());
    }
    while (operatorQueue.length) {
      setToken();
    }
    return tokenQueue[0];
  }
  private parseBinaryOperator(): AS.BinaryOperator | null {
    this.jumpOverSpace();
    let max = this.maxBinaryLen;
    const start = this.index;
    while (max > 0) {
      const str = this.expression.slice(this.index, this.index + max);
      if (!str) {
        return null;
      }
      if (this.binaryOps.hasOwnProperty(str)) {
        this.index += max;
        return {
          type: D.BINARY_OPERATOR,
          operator: str,
          start,
          end: this.index
        };
      }
      max--;
    }
    this.error("Unexpected binary operator");
    return null;
  }
  private parseToken(): AS.Token {
    this.jumpOverSpace();
    const char = this.getCurrentChar();
    if (!char) {
      return null;
    }
    const unaryAst: AS.Unary | null = this.parseUnary();
    const literalAst: AS.Literal | null = this.parseLiteral();
    const arrayAst: AS.Array | null = this.parseArray();
    const variableAst: AS.Variable | null = this.parseVariable();
    const ast: AS.Token = unaryAst || literalAst || arrayAst || variableAst;
    if (!ast) {
      this.error();
    }
    return ast;
  }
  private parseUnary(): AS.Unary {
    const char = this.getCurrentChar();
    return this.unaryOps[char!]
      ? {
          type: D.UNARY_EXPRESSION,
          value: "",
          raw: "",
          expression: this.parseExpression()
        }
      : null;
  }
  private parseNumber() {}
  private parseString() {
    return null;
  }
  private parseArray() {
    return null;
  }
  private parseVariable() {
    return null;
  }
  private parseIdentifier() {}
  private parseLiteral() {
    const numberAst = this.parseExpressionNumber();
    const stringAst = this.parseExpressionString();
    return null;
  }
  private parseArguments() {}
}
