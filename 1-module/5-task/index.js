function truncate(str, maxlength) {
  let strArray = str.split('');
  let newStr = "";
  if (strArray.length > maxlength) {
    newStr = str.slice(0, maxlength-1) + "…";
    return newStr;
  } else {
    return str;
  }
}
