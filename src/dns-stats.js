const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const dict = {};

  for (const domain of domains) {
    let parts = domain.split('.');
    let composition = '';

    while (parts.length) {
      composition += `.${parts.pop()}`;
      dict[composition] = dict[composition] ? dict[composition] + 1 : 1;
    }
  }

  return dict;
}

module.exports = {
  getDNSStats,
};
