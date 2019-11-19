export module AstType {
  type Expression = any;
  type ConditionalExpression = {
    type: string;
    test: BinaryExpression | Token;
    consequent: Expression;
    alternate: Expression;
  };
  type BinaryExpression = {
    type: string;
    left: Token | BinaryExpression;
    right: Token | BinaryExpression;
    operator: BinaryOperator;
  } | null;
  type Token = UnaryExpression | Object | Number | String | Arr | null;
  type BinaryOperator = {
    type: string;
    value: string;
    start: number;
    end: number;
  } | null;
  type UnaryExpression = {
    type: string;
    operate: {
      type: string;
      value: string;
      start: number;
      end: number;
    };
    argument: Token;
  } | null;
  type Variable = Object | Literal | null;
  type Number = {
    type: string;
    value: number;
    start: number;
    end: number;
    raw: string;
  } | null;
  type String = {
    type: string;
    value: string;
    start: number;
    end: number;
    raw: string;
  } | null;
  type Arguments = Array<Expression>;
  type Arr = {
    type: string;
    arguments: Arguments;
  } | null;
  type Object =
    | {
        type: string;
        computed: boolean;
        object: Variable | Object;
        property: Literal | Expression;
      }
    | Function
    | Literal
    | null;
  type Function = {
    type: string;
    callee: Variable;
    arguments: Arguments;
  } | null;
  type Literal =
    | ({
        type: string;
        start: number;
        end: number;
      } & (
        | {
            value: string;
            raw: string;
          }
        | {
            name?: string;
          }
      ))
    | null;
}
