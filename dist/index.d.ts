import { ExpressionParseParams, UnaryOps, BinaryOps, Literals } from "./types";
export default class ExpressionParse {
    static version: string;
    private expression;
    private index;
    private binaryOps;
    private unaryOps;
    private literals;
    constructor({ expression, unaryOps, binaryOps, literals }: ExpressionParseParams);
    addUnaryOps(ops?: UnaryOps): this;
    addBinaryOps(ops?: BinaryOps): this;
    addLiterals(ops?: Literals): this;
    removeUnaryOps(ops?: Array<string>): this;
    removeBinaryOps(ops?: Array<string>): this;
    removeLiterals(ops?: Array<string>): this;
    getUnaryOps(): {
        [x: string]: number;
    };
    getBinaryOps(): string[];
    getLiterals(): {
        [x: string]: any;
    };
}
