const { NotImplementedError } = require('../extensions/index.js');

const MARK_DISCARD = null;

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const availableCommands = [
    '--discard-prev',
    '--discard-next',
    '--double-prev',
    '--double-next',
  ];

  const commandsQueue = [];
  const transformedArray = [];

  for (const item of arr) {
    // Possible command detection
    if (availableCommands.includes(item)) {
      if (commandsQueue.length) {
        throw new Error(
          'Invalid input sequence: more than one command in a row.'
        );
      }

      commandsQueue.push(item);
      continue;
    }

    // Command processing (if exists)
    switch (commandsQueue.pop()) {
      case '--discard-prev': {
        transformedArray.pop();
        break;
      }
      case '--discard-next': {
        // "discard mark"
        transformedArray.push(MARK_DISCARD);
        continue;
        break;
      }
      case '--double-prev': {
        const prevValue = transformedArray.at(-1);
        if (transformedArray.length && prevValue !== MARK_DISCARD) {
          transformedArray.push(prevValue);
        }
        break;
      }
      case '--double-next': {
        transformedArray.push(item);
        break;
      }
    }

    // Ordinary values processing
    // Removing "discard mark" (if exists)
    if (transformedArray.at(-1) === MARK_DISCARD) {
      transformedArray.pop();
    }

    transformedArray.push(item);
  }

  return transformedArray;
}

module.exports = {
  transform,
};
