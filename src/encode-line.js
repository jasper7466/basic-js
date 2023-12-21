const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let encoded = '';
  let prevChar = null;
  let count = 0;

  for (const char of str) {
    if (!prevChar) {
      prevChar = char;
      count = 1;
      continue;
    }

    if (char === prevChar) {
      count++;
      continue;
    }

    encoded += count === 1 ? prevChar : `${count}${prevChar}`;
    prevChar = char;
    count = 1;
  }

  if (count > 0) {
    encoded += count === 1 ? prevChar : `${count}${prevChar}`;
  }

  return encoded;
}

module.exports = {
  encodeLine,
};
