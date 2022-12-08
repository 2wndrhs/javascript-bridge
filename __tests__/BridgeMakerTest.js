/* eslint-disable max-lines-per-function */
const MissionUtils = require('@woowacourse/mission-utils');

const BridgeMaker = require('../src/BridgeMaker');

const BridgeRandomNumberGenerator = require('../src/utils/BridgeRandomNumberGenerator');

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickNumberInRange,
  );
};

describe('BridgeMaker 테스트', () => {
  test.each([
    [
      [0, 1, 1],
      ['D', 'U', 'U'],
    ],
    [
      [0, 0, 0],
      ['D', 'D', 'D'],
    ],
    [
      [1, 1, 1],
      ['U', 'U', 'U'],
    ],
  ])(
    'makeBridge 메서드는 입력받은 길이 만큼의 다리를 생성',
    (numbers, expectedBridge) => {
      mockRandoms(numbers);

      const bridge = BridgeMaker.makeBridge(
        numbers.length,
        BridgeRandomNumberGenerator.generate,
      );

      expect(bridge).toEqual(expectedBridge);
    },
  );
});
