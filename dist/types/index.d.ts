export interface UnaryOps {
    [key: string]: number;
}
export declare type UnaryArr = string[];
export declare type BinaryOps = string[];
export interface BinaryObj {
    [key: string]: true;
}
export declare type Literals = {
    [key: string]: any;
};
export interface ExpressionParseParams {
    expression: string;
    unaryOps?: UnaryOps;
    binaryOps?: BinaryOps;
    literals?: Literals;
}
