const { NotImplementedError } = require('../extensions/index.js');

const RANGE_START = 65;
const RANGE_END = 90;

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isForwardMode = true) {
    this._isForwardMode = isForwardMode;
    this._appendChar = isForwardMode
      ? (result, char) => result + char
      : (result, char) => char + result;
  }

  encrypt(message, key) {
    this._raiseErrorIfTooFewArguments(arguments, 2);
    this._raiseErrorIfNonOfTypeArguments(arguments, 'string');

    let encryptedString = '';
    const keyCharCodeSequence = this._keyCharCodeCyclicSequenceGenerator(key);

    for (let char of message) {
      char = this._preprocessChar(char);

      if (!this._isСryptableCharacter(char)) {
        encryptedString = this._appendChar(encryptedString, char);
        continue;
      }

      const encryptedCharCode = this._sumByRangeModule(
        char.charCodeAt(0),
        keyCharCodeSequence.next().value
      );

      encryptedString = this._appendChar(
        encryptedString,
        String.fromCharCode(encryptedCharCode)
      );
    }

    return encryptedString;
  }

  decrypt(encryptedMessage, key) {
    this._raiseErrorIfTooFewArguments(arguments, 2);
    this._raiseErrorIfNonOfTypeArguments(arguments, 'string');

    let decryptedString = '';
    const keyCharCodeSequence = this._keyCharCodeCyclicSequenceGenerator(key);

    for (let char of encryptedMessage) {
      char = this._preprocessChar(char);

      if (!this._isСryptableCharacter(char)) {
        decryptedString = this._appendChar(decryptedString, char);
        continue;
      }

      const decryptedCharCode = this._subByRangeModule(
        char.charCodeAt(0),
        keyCharCodeSequence.next().value
      );

      decryptedString = this._appendChar(
        decryptedString,
        String.fromCharCode(decryptedCharCode)
      );
    }

    return decryptedString;
  }

  _isСryptableCharacter(char) {
    const code = char.charCodeAt(0);

    if (code >= RANGE_START && code <= RANGE_END) {
      return true;
    }

    return false;
  }

  _preprocessChar(char) {
    return char.toUpperCase();
  }

  _sumByRangeModule(a, b) {
    let sum = a + b - RANGE_START;

    if (sum > RANGE_END) {
      sum -= RANGE_END - RANGE_START + 1;
    }

    return sum;
  }

  _subByRangeModule(a, b) {
    let sub = a - b + RANGE_START;

    if (sub < RANGE_START) {
      sub += RANGE_END - RANGE_START + 1;
    }

    return sub;
  }

  *_keyCharCodeCyclicSequenceGenerator(key) {
    const charCodes = [...key].map((char) =>
      this._preprocessChar(char).charCodeAt(0)
    );

    while (true) {
      for (const charCode of charCodes) {
        yield charCode;
      }
    }
  }

  _raiseErrorIfTooFewArguments(args, minArgsCount) {
    if (args.length < minArgsCount) {
      throw new Error('Incorrect arguments!');
    }
  }

  _raiseErrorIfNonOfTypeArguments(args, type) {
    for (const argument of args) {
      if (typeof argument !== type) {
        throw new Error('Incorrect arguments!');
      }
    }
  }
}

module.exports = {
  VigenereCipheringMachine,
};
