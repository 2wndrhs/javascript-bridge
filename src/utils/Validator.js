const { BRIDGE_SIZE } = require('./constants');

const ERROR_MESSAGE = Object.freeze({
  isBridgeSize: `다리 길이는 ${BRIDGE_SIZE.MIN}부터 ${BRIDGE_SIZE.MAX} 사이의 숫자여야 합니다.`,
});

const Validator = {
  validate(input, validator) {
    if (!validator(input)) {
      throw new Error(`[ERROR] ${ERROR_MESSAGE[validator.name]}`);
    }
  },

  isBridgeSize(input) {
    const size = Number(input);
    const { MIN, MAX } = BRIDGE_SIZE;

    return Number.isInteger(size) && MIN <= size && size <= MAX;
  },
};

module.exports = Validator;
