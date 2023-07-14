function getMinMax(str) {
	let obj = {};

  let strArray = str
    .split(' ')
    .filter(strItem => isFinite(strItem))
    .sort((a, b) => a - b)
    
  return obj = {
    min: +strArray.shift(),
    max: +strArray.pop(),
  }
}
