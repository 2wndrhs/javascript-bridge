const { BRIDGE_SIZE, MOVING } = require('./constants');

const ERROR_MESSAGE = Object.freeze({
  isBridgeSize: `다리 길이는 ${BRIDGE_SIZE.MIN}부터 ${BRIDGE_SIZE.MAX} 사이의 숫자여야 합니다.`,
  isMovingInput: `이동할 칸은 ${MOVING.UPPER}(위 칸)와 ${MOVING.LOWER}(아래 칸) 중 하나의 문자여야 합니다.`,
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

  isMovingInput(input) {
    const { UPPER, LOWER } = MOVING;

    return input === UPPER || input === LOWER;
  },
};

module.exports = Validator;
