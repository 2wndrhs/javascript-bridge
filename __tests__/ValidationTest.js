/* eslint-disable max-lines-per-function */
const {
  validate,
  isBridgeSize,
  isMovingInput,
  isGameCommand,
} = require('../src/utils/Validator');

describe('Validator 클래스 테스트', () => {
  test.each(['0', '2', '3.3', '21', ' ', 'abc'])(
    '다리 길이가 3이상 20이하의 숫자가 아니라면 에외 발생',
    (size) => {
      expect(() => {
        validate(size, isBridgeSize);
      }).toThrow('[ERROR]');
    },
  );

  test.each([' ', 'u', 'd', '123'])(
    '이동할 칸이 `U`와 `D` 중 하나의 문자가 아니라면 예외 발생',
    (moving) => {
      expect(() => {
        validate(moving, isMovingInput);
      }).toThrow('[ERROR]');
    },
  );

  test.each([' ', 'r', 'q', '123'])(
    '재시작/종료 여부가 `R`과 `Q` 중 하나의 문자가 아니라면 예외 발생',
    (command) => {
      expect(() => {
        validate(command, isGameCommand);
      }).toThrow('[ERROR]');
    },
  );
});
