const { validate, isBridgeSize } = require('../src/utils/Validator');

describe('Validator 클래스 테스트', () => {
  test.each(['0', '2', '3.3', '21', ' ', 'abc'])(
    '다리 길이가 3이상 20이하의 숫자가 아니라면 에외 발생',
    (size) => {
      expect(() => {
        validate(size, isBridgeSize);
      }).toThrow('[ERROR]');
    },
  );
});
