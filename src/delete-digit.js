const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 * 52754
 */
function deleteDigit(n) {
  const digits = n
    .toString()
    .split('')
    .map((item) => +item);

  if (digits.length === 1) {
    return null;
  }

  let indexToDelete = null;

  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] < digits[i + 1]) {
      indexToDelete = i;
      break;
    }
  }

  if (indexToDelete === null) {
    indexToDelete = digits.length - 1;
  }

  digits.splice(indexToDelete, 1);

  return parseInt(digits.join(''));
}

module.exports = {
  deleteDigit,
};
