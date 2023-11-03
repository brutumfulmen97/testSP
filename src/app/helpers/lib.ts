export function parseCsv(data: any) {
  const dataArr = data.split("\n");

  const jsonObj = [];
  const headers = dataArr[0].split(",");
  for (let i = 1; i < dataArr.length; i++) {
    const newData = dataArr[i].split(",");
    const obj: any = {};
    for (let j = 0; j < newData.length; j++) {
      obj[headers[j].trim()] = newData[j].trim();
    }
    jsonObj.push(obj);
  }
  return jsonObj;
}
