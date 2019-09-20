// Expression-> BinaryExpression{?Expression:Expression}

// BinaryExpression->Token(BinaryOperator Token)*  //此处做二元操作符的优先级处理

// Token-> Unary| Variable|Numeric | String|Array
// Literal-> true|false|null|undefined |Identifier

// Unary-> UnaryOperator Token

// Numeric-> \d+{('.'|'e'|'E')\d+}

// String-> '.*'| ".*"

// Array->'['Arguments']'

// Variable-> Group| Object

// Group->'('Expression ')'

// Object->Object'.'Literal' | Variable'['Expression']'|Literal'('Arguments')'|Literal

// Identifier->/^[\$_A-Za-z]([\$_A-Za-z0-9]*)/

// Arguments-> Expression{,Expression}*

// BinaryOperator-> - | + | = | === | == | || | && |>=     //and many more...

// UnaryOperator-> - | + | !  //and many more...

import * as T from "./types";
import * as D from "./data";
import { AstType as AS } from "./types/ast";
import Operator from "./operator";
export class ExpressionParse extends Operator {
  static version: string = "1.0.1";
  private expression: string = "";
  private index: number = 0;
  constructor(args: T.ExpressionParseParams) {
    super(args);
    const { expression } = args;
    this.expression = expression;
  }

  private error(
    msg: string = `Unexpected ${this.getCurrentChar()}`,
    index?: number
  ): Error {
    const err = new Error(`${msg} at character ${index || this.index}`);
    throw err;
  }
  private getCurrentChar(): string | undefined {
    return this.expression[this.index];
  }
  private jumpOverSpace() {
    const spaceReg = /\s/;
    while (this.index < this.expression.length) {
      const char: string | undefined = this.getCurrentChar();
      if (!char || !spaceReg.test(char)) {
        return;
      }
      this.index++;
    }
  }
  private isIdentifierStart(char: string | undefined): boolean {
    return char ? /[\$_A-Za-z]/.test(char) : false;
  }
  private isIdentifierPart(char: string | undefined): boolean {
    return char ? /[\$_A-Za-z0-9]/.test(char) : false;
  }
  public getAst(): AS.Expression | Array<AS.Expression> {
    this.index = 0;
    const result = [this.parseExpression()];
    while (this.index < this.expression.length) {
      this.jumpOverSpace();
      if (this.getCurrentChar() === D.SEMICOLON) {
        this.index++;
      }
      const expression = this.parseExpression();
      result.push(expression);
    }
    return result.length > 1 ? result : result[0];
  }
  private parseExpression(): AS.Expression {
    if (!this.expression) {
      return null;
    }
    const expression:
      | AS.BinaryExpression
      | AS.Token = this.parseBinaryExpression();
    this.jumpOverSpace();
    if (this.getCurrentChar() === D.QUESTION) {
      this.index++;
      const consequent: AS.Expression = this.parseExpression();
      if (!consequent) {
        this.error(`Expected Expression`);
      }
      if (this.getCurrentChar() !== D.COLON) {
        this.error(`Expected ${D.COLON}`);
      }
      this.index++;
      const alternate: AS.Expression = this.parseExpression();
      if (!alternate) {
        this.error(`Expected Expression`);
      }
      const ast = {
        type: D.CONDITIONAL_EXPRESSION,
        test: expression,
        consequent,
        alternate
      };
      return ast;
    }
    return expression;
  }
  private parseBinaryExpression(): AS.BinaryExpression | AS.Token {
    const left: AS.Token = this.parseToken();
    const operator: AS.BinaryOperator = this.parseBinaryOperator();
    if (!operator) {
      return left;
    }
    const right: AS.Token = this.parseToken();
    if (operator && !right) {
      this.error();
    }
    //operate priority

    const tokenQueue: (AS.Token | AS.BinaryExpression)[] = [left, right];
    const operatorQueue: AS.BinaryOperator[] = [operator];
    const setToken = () => {
      let op = operatorQueue.pop()!;
      const right = tokenQueue.pop()!;
      const left = tokenQueue.pop()!;
      const node = {
        type: D.BINARY_EXPRESSION,
        left,
        operator: op,
        right
      };
      tokenQueue.push(node);
    };
    let _opt: AS.BinaryOperator = null;
    while ((_opt = this.parseBinaryOperator())) {
      while (
        operatorQueue[operatorQueue.length - 1] &&
        this.binaryOps[operatorQueue[operatorQueue.length - 1]!.value] >=
          this.binaryOps[_opt!.value]
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
  private parseBinaryOperator(): AS.BinaryOperator {
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
          value: str,
          start,
          end: this.index
        };
      }
      max--;
    }
    return null;
  }
  private parseToken(): AS.Token {
    this.jumpOverSpace();
    const char: string | undefined = this.getCurrentChar();
    if (!char) {
      return null;
    }
    const ast =
      this.parseUnary() ||
      this.parseVariable() ||
      this.parseNumber() ||
      this.parseString() ||
      this.parseArray();
    if (!ast) {
      this.error();
    }
    return ast;
  }
  private parseUnary(): AS.UnaryExpression {
    let max = this.maxUnary;
    const start = this.index;
    while (max > 0) {
      const str = this.expression.slice(this.index, this.index + max);
      if (!str) {
        return null;
      }
      if (this.unaryOps.hasOwnProperty(str)) {
        this.index += max;
        const end = this.index;
        const argument: AS.Token = this.parseToken();
        return {
          type: D.UNARY_EXPRESSION,
          operate: {
            type: D.UNARY_OPERATOR,
            value: str,
            start,
            end: end
          },
          argument
        };
      }
      max--;
    }
    return null;
  }
  private parseNumber(): AS.Number {
    let number = "";
    let start = this.index;
    let firstDot = false;
    if (this.getCurrentChar() === D.DOT) {
      firstDot = true;
      number += this.getCurrentChar();
      this.index++;
    }

    while (this.getCurrentChar() && /^([\de\.])/.test(this.getCurrentChar()!)) {
      number += this.getCurrentChar();
      if (this.getCurrentChar() === D.DOT) {
        if (firstDot) {
          this.error();
        }
        firstDot = true;
      }
      this.index++;
    }
    if (!number) {
      return null;
    }
    if (this.isIdentifierStart(this.getCurrentChar())) {
      this.error(`Variable cannot start with number`, start);
    }
    return {
      type: D.LITERAL,
      value: parseFloat(number),
      start,
      end: this.index,
      raw: number
    };
  }
  private parseString(): AS.String {
    let str = "",
      closed = false;
    let quote = this.getCurrentChar();
    const start = this.index;
    if (quote !== D.SINGLE_QUOTE_MARK && quote !== D.DOUBLE_QUOTE_MARK) {
      return null;
    }

    while (this.index < this.expression.length) {
      this.index++;
      const char = this.getCurrentChar();
      if (char === quote) {
        closed = true;
        break;
      } else if (char === "\\") {
        this.index++;
        switch (this.getCurrentChar()) {
          case "n":
            str += "\n";
            break;
          case "r":
            str += "\r";
            break;
          case "t":
            str += "\t";
            break;
          case "b":
            str += "\b";
            break;
          case "f":
            str += "\f";
            break;
          case "v":
            str += "\x0B";
            break;
          default:
            str += this.getCurrentChar();
        }
      } else {
        str += char;
      }
    }
    this.index++;

    if (!closed) {
      this.error(`Unclosed quote after "'${str}'"`);
    }
    return {
      type: D.LITERAL,
      value: str,
      start,
      end: this.index,
      raw: `${quote}${str}${quote}`
    };
  }
  private parseArguments(): AS.Arguments {
    const args = [];
    while (this.index < this.expression.length) {
      this.jumpOverSpace();
      const arg = this.parseExpression();
      this.jumpOverSpace();
      const comma = this.getCurrentChar();
      if (comma === D.RIGHT_BRACKET || comma === D.RIGHT_PAREN) {
        args.push(arg);
        break;
      }
      if (comma === D.COMMA) {
        if (arg) {
          args.push(arg);
        }
      }
      this.index++;
    }
    return args;
  }
  private parseArray(): AS.Arr {
    if (this.getCurrentChar() === D.LEFT_BRACKET) {
      this.index++;
      const arg: AS.Arguments = this.parseArguments();
      this.jumpOverSpace();
      if (this.getCurrentChar() === D.RIGHT_BRACKET) {
        this.index++;
        return {
          type: D.ARRAY_EXPRESSION,
          arguments: arg
        };
      } else {
        this.error(`Expected ${D.RIGHT_BRACKET}`);
      }
    }
    return null;
  }

  private parseVariable(): AS.Variable {
    return this.parseGroup() || this.parseObject();
  }
  private parseGroup(): AS.Expression {
    if (this.getCurrentChar() === D.LEFT_PAREN) {
      this.index++;
      this.jumpOverSpace();
      const expression: AS.Expression = this.parseExpression();
      this.jumpOverSpace();
      if (this.getCurrentChar() === D.RIGHT_PAREN) {
        this.index++;
        return expression;
      } else {
        this.error(`Expected ${D.RIGHT_PAREN}`);
      }
    }
    return null;
  }
  private parseObject(): AS.Object {
    let obj: AS.Object = this.parseLiteral();
    if (!obj) {
      return null;
    }
    if (this.getCurrentChar() === D.LEFT_PAREN) {
      this.index++;
      this.jumpOverSpace();
      const args: AS.Arguments = this.parseArguments();
      this.jumpOverSpace();
      if (this.getCurrentChar() === D.RIGHT_PAREN) {
        this.index++;
        obj = {
          type: D.CALL_EXPRESSION,
          callee: obj,
          arguments: args
        };
      } else {
        this.error(`Expected ${D.RIGHT_PAREN}`);
      }
    }
    if (
      this.getCurrentChar() !== D.DOT &&
      this.getCurrentChar() !== D.LEFT_BRACKET
    ) {
      return obj;
    }
    while (
      this.getCurrentChar() === D.DOT ||
      this.getCurrentChar() === D.LEFT_BRACKET
    ) {
      if (this.getCurrentChar() === D.DOT) {
        this.index++;
        const property: AS.Literal = this.parseLiteral();
        obj = {
          type: D.MEMBER_EXPRESSION,
          computed: false,
          object: obj,
          property
        };
      } else if (this.getCurrentChar() === D.LEFT_BRACKET) {
        this.index++;
        const property: AS.Expression = this.parseExpression();
        this.jumpOverSpace();
        if (this.getCurrentChar() === D.RIGHT_BRACKET) {
          this.index++;
          obj = {
            type: D.MEMBER_EXPRESSION,
            computed: true,
            object: obj,
            property
          };
        } else {
          this.error(`Expected ${D.RIGHT_BRACKET}`);
        }
      }
    }
    return obj;
  }

  private parseLiteral(): AS.Literal {
    this.jumpOverSpace();
    let start = this.index;
    let str = this.getCurrentChar();
    if (this.isIdentifierStart(this.getCurrentChar())) {
      this.index++;
      while (
        this.getCurrentChar() &&
        this.isIdentifierPart(this.getCurrentChar())
      ) {
        str += this.getCurrentChar()!;
        this.index++;
      }
      if (this.literals.hasOwnProperty(str!)) {
        return {
          type: D.LITERAL,
          start,
          end: this.index,
          value: this.literals[str!],
          raw: str
        };
      } else {
        return {
          type: D.IDENTIFIER,
          start,
          end: this.index,
          name: str
        };
      }
    }
    return null;
  }
}
