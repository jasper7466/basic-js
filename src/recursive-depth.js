const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    let depth = 1;
    for (const item of arr) {
      let subDepth = 1;
      if (Array.isArray(item)) {
        subDepth += this.calculateDepth(item);
      }
      depth = Math.max(subDepth, depth);
    }

    return depth;
  }
}

module.exports = {
  DepthCalculator,
};
