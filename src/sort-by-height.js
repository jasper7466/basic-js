const { NotImplementedError } = require('../extensions/index.js');

const MARK_IGNORE = -1;

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  const sorted = arr
    .filter((item) => item !== MARK_IGNORE)
    .sort((a, b) => a - b);
  const result = [];

  for (const sourceItem of arr) {
    if (sourceItem === MARK_IGNORE) {
      result.push(MARK_IGNORE);
      continue;
    }

    result.push(sorted.shift());
  }

  return result;
}

module.exports = {
  sortByHeight,
};
