const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;
const K = Math.LN2 / HALF_LIFE_PERIOD;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  const { isValid, value: sampleValue } = sampleActivityParser(sampleActivity);

  if (!isValid) {
    return false;
  }

  const age = Math.ceil(Math.log(MODERN_ACTIVITY / sampleValue) / K);

  return age;
}

function sampleActivityParser(value) {
  const result = {
    isValid: false,
    value: null,
  };

  // Must be string type
  if (typeof value !== 'string') {
    return result;
  }

  result.value = parseFloat(value);

  // Must be ready to be parsed as number
  if (isNaN(result.value)) {
    return result;
  }

  // Must be greater than 0
  if (result.value <= 0) {
    return result;
  }

  // Must be less or equal modern activity
  if (result.value > MODERN_ACTIVITY) {
    return result;
  }

  result.isValid = true;

  return result;
}

module.exports = {
  dateSample,
};
