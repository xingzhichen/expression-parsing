export function transFormArrToObj(arr: Array<string | number>) {
  return arr.reduce((result: any, op) => {
    result[op] = true;
    return result;
  }, {});
}
export function deleteProperty(data: any, proArr: Array<string | number>) {
  proArr.forEach(key => {
    delete data[key];
  });
  return data;
}
