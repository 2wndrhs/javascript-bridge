const { BRIDGE_SIZE, MOVING, COMMAND } = require('./constants');

const ERROR_MESSAGE = Object.freeze({
  isBridgeSize: `다리 길이는 ${BRIDGE_SIZE.MIN}부터 ${BRIDGE_SIZE.MAX} 사이의 숫자여야 합니다.`,
  isMovingInput: `이동할 칸은 ${MOVING.UPPER}(위 칸)와 ${MOVING.LOWER}(아래 칸) 중 하나의 문자여야 합니다.`,
  isGameCommand: `재시작/종료 여부는 ${COMMAND.RETRY}(재시도)와 ${COMMAND.QUIT}(종료) 중 하나의 문자여야 합니다.`,
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

  isGameCommand(input) {
    const { RETRY, QUIT } = COMMAND;

    return input === RETRY || input === QUIT;
  },
};

module.exports = Validator;
