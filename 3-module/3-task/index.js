function camelize(str) {
  return str
  .split('-')
  .map((word, index) => {
      if (index > 0) {
          return word[0].toUpperCase() + word.slice(1)
      } else return word })
  .join('');
}
