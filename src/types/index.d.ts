export interface BinaryOps {
  [key: string]: number;
}
export type UnaryOps = string[];
export interface UnaryObj {
  [key: string]: true;
}
export interface LiteralsOps {
  [key: string]: any;
}
export interface ExpressionParseParams {
  expression: string;
  unaryOps?: UnaryOps;
  binaryOps?: BinaryOps;
  literals?: LiteralsOps;
}
