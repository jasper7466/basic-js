const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const dict = {};
  const parsed = [];

  for (const fileName of names) {
    if (!(fileName in dict)) {
      parsed.push(fileName);
      dict[fileName] = 1;
      continue;
    }

    const newName = `${fileName}(${dict[fileName]})`;

    parsed.push(newName);

    dict[fileName] += 1;
    dict[newName] = dict[newName] ? dict[newName] + 1 : 1;
  }

  return parsed;
}

module.exports = {
  renameFiles,
};
