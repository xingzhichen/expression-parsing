export function transFormArrToObj(arr: Array<string | number>) {
  return arr.reduce((result: any, op) => {
    if (typeof op === "string" || typeof op === "number") {
      result[op] = true;
    }
    return result;
  }, {});
}
export function deleteProperty(data: any, proArr: Array<string | number>) {
  proArr.forEach(key => {
    delete data[key];
  });
  if (Array.isArray(data)) {
    return data.filter(_ => _); //filter empty
  }

  return data;
}
