/* eslint-disable max-lines-per-function */
const MovingHistory = require('../src/models/MovingHistory');

describe('MovingHistory 테스트', () => {
  test.each([
    ['U', 0, ['[ O ]', '[   ]']],
    ['D', 1, ['[ O |   ]', '[   | O ]']],
    ['D', 2, ['[ O |   |   ]', '[   | O | X ]']],
  ])(
    'toString 메서드는 현재까지의 다리 건너기 결과를 문자열로 반환',
    (moving, stage, expected) => {
      const bridge = ['U', 'D', 'U'];

      MovingHistory.log(bridge, moving, stage);
      const movingHistory = MovingHistory.toString();

      expect(movingHistory).toEqual(expected);
    },
  );
});
