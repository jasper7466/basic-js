const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const dict1 = {};
  const dict2 = {};

  // Make dicts for each string: key - character, value - count
  countCharacters(s1, dict1);
  countCharacters(s2, dict2);

  // Choose the shortest dict to iterate over it (for reducing iterations count)
  const [shortDict, longDict] =
    Object.keys(dict1) < Object.keys(dict2) ? [dict1, dict2] : [dict2, dict1];

  let commonCharactersCount = 0;

  for (const [key, value] of Object.entries(shortDict)) {
    const count = Math.min(value, longDict[key]);
    if (count) {
      commonCharactersCount += count;
    }
  }

  return commonCharactersCount;
}

function countCharacters(str, dict) {
  for (const character of str) {
    dict[character] = dict[character] ? dict[character] + 1 : 1;
  }
}

module.exports = {
  getCommonCharacterCount,
};
