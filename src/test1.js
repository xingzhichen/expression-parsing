// E	-->	P	(B	P)*
// P	-->	v+	|	"("	E	")"	|	U	P
// B	-->	"+"	|	"-"	|	"*"	|	"/"	|	"^"
// U	-->	"-"
// v-->0 | 1 |2 |3 |4 |5 |6 |7 |8 |9

const NUMBER_TYPE = "number";
const UNARY_TYPE = "unary";
const BINARY_TYPE = "binary";
const BINARY_LEVEL_MAP = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 3
};
const UNARY = "-";

class ParsingAst {
  constructor(str) {
    this.str = str;
    this.index = 0;
  }
  // v-->0 | 1 |2 |3 |4 |5 |6 |7 |8 |9
  gobbleNumber() {
    let result = "";
    let beginIndex = this.index;
    while (this.index < this.str.length && /\w/.test(this.str[this.index])) {
      result += this.str[this.index];
      this.index++;
    }
    return result == undefined
      ? null
      : {
          type: NUMBER_TYPE,
          value: result,
          index: [
            beginIndex,
            this.index <= this.str.length ? this.index : this.str.length
          ]
        };
  }
  // B	-->	"+"	|	"-"	|	"*"	|	"/"	|	"^"
  gobbleBinary() {
    const opt = this.str[this.index];
    if (BINARY_LEVEL_MAP[opt]) {
      return {
        type: BINARY_TYPE,
        value: opt,
        level: BINARY_LEVEL_MAP[opt],
        index: [this.index, ++this.index]
      };
    }
  }
  // U	-->	"-"
  gobbleUnary() {
    const opt = this.str[this.index];
    if (opt === UNARY) {
      return {
        type: UNARY_TYPE,
        value: opt,
        index: [this.index, ++this.index]
      };
    }
  }
  // P	-->	v+	|	"("	E	")"	|	U	P
  gobbleElement() {
    if (this.str[this.index] === "(") {
      this.index++;
      const node = this.exec();
      if (this.str[this.index] === ")") {
        this.index++;
        return node;
      } else {
        throw new Error("缺少)");
      }
    }
    const opt = this.gobbleUnary();
    if (opt) {
      return {
        operator: opt,
        argument: this.gobbleElement()
      };
    }
    return this.gobbleNumber();
  }
  // E	-->	P	{B	P}
  exec() {
    const left = this.gobbleElement();
    const opt = this.gobbleBinary();
    const right = this.gobbleElement();
    if (!opt && !right) {
      return left;
    }
    const numQueue = [left, right];
    const operateQueue = [opt];
    let _opt = null;
    const setNode = () => {
      let op = operateQueue.pop();
      const right = numQueue.pop();
      const left = numQueue.pop();
      const node = {
        left,
        operator: op,
        right
      };
      numQueue.push(node);
    };
    while ((_opt = this.gobbleBinary())) {
      while (
        operateQueue[operateQueue.length - 1] &&
        operateQueue[operateQueue.length - 1].level >= _opt.level
      ) {
        setNode();
      }
      operateQueue.push(_opt);
      numQueue.push(this.gobbleElement());
    }
    while (operateQueue.length) {
      setNode();
    }
    return numQueue.length === 1 ? numQueue[0] : numQueue;
  }
  getAst() {
    return this.exec();
  }
}

console.log(JSON.stringify(new ParsingAst("a^b*c^3").getAst()));
