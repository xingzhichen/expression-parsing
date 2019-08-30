export module AstType {
  interface Base {
    type: string;
    start: number;
    end: number;
  }
  type Expression = BinaryExpression | TernaryExpression | Token | null;
  type TernaryExpression = {
    type: string;
    test: BinaryExpression | Token;
    consequent: Expression;
    alternate: Expression;
  };

  type BinaryExpression =
    | Token
    | {
        type: string;
        left: Token;
        operator: BinaryOperator;
        right: Token;
      };
  type Token = Unary | Literal | Array | Variable | null;
  type Unary = {
    type: string;
    value: number | string;
    raw: number | string;
    operator: UnaryOperator;
  } | null;
  type Literal = String | Number;
  interface String extends Base {
    value: number;
    raw: string;
  }
  interface Number extends Base {
    value: number;
    raw: string;
  }
  interface Identifier extends Base {
    name: string;
  }
  type Arguments = {
    type: string;
    elements: Expression[];
  };
  type Array = Arguments;
  type Variable =
    | Identifier
    | {
        type: string;
        computed: boolean;
        object: Identifier;
        property: Expression;
      }
    | { type: string; callee: Identifier; arguments: Arguments };
  interface BinaryOperator extends Base {
    operator: string;
  }
  interface UnaryOperator extends Base {
    operator: string;
  }
}
