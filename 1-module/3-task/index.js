function ucFirst(str) {
  let newStr = '';
  if (str) {
    newStr = str[0].toUpperCase() + str.slice(1);
  }
  return newStr;
}
