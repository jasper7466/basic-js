const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const field = {
    sizeX: matrix[0].length,
    sizeY: matrix.length,
    field: new Array(matrix.length)
      .fill()
      .map(() => new Array(matrix[0].length).fill(0)),
  };

  for (let y = 0; y < field.sizeY; y++) {
    for (let x = 0; x < field.sizeX; x++) {
      if (matrix[y][x] === true) {
        const neighbors = getNeighbors(field, x, y);
        for (const neighbor of neighbors) {
          field.field[neighbor.y][neighbor.x]++;
        }
      }
    }
  }

  return field.field;
}

function getNeighbors(field, x, y) {
  const offsets = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
  ];

  const neighbors = [];

  for (const offset of offsets) {
    const guessX = x + offset.x;
    const guessY = y + offset.y;
    const isValidX = guessX < field.sizeX && guessX >= 0;
    const isValidY = guessY < field.sizeY && guessY >= 0;

    if (isValidX && isValidY) {
      neighbors.push({ x: guessX, y: guessY });
    }
  }

  return neighbors;
}

module.exports = {
  minesweeper,
};
