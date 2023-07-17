function filterRange(arr, a, b) {
  let newArray = arr.filter(number => number >= a && number <= b);
  return newArray;
}
