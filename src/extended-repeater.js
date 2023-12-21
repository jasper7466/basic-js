const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const mainStr = String(str);
  const {
    repeatTimes = 1,
    separator = '+',
    additionRepeatTimes = 1,
    additionSeparator = '|',
  } = options;

  let { addition = '' } = options;

  addition = String(addition);

  let additionCompiled = '';
  let resultCompiled = '';

  if (additionRepeatTimes === 1) {
    additionCompiled = addition;
  } else {
    additionCompiled = new Array(additionRepeatTimes)
      .fill(addition)
      .join(additionSeparator);
  }

  if (repeatTimes === 1) {
    resultCompiled = mainStr + additionCompiled;
  } else {
    resultCompiled = new Array(repeatTimes)
      .fill(mainStr + additionCompiled)
      .join(separator);
  }

  return resultCompiled;
}

module.exports = {
  repeater,
};
