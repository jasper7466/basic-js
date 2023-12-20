const { NotImplementedError } = require('../extensions/index.js');
const MARK_CAT = '^^';
/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
function countCats(matrix) {
  let counter = 0;
  for (const row of matrix) {
    for (const cell of row) {
      if (cell === MARK_CAT) {
        counter++;
      }
    }
  }

  return counter;
}

module.exports = {
  countCats,
};
