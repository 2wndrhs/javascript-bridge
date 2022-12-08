const BridgeMaker = require('../BridgeMaker');
const GameStateManager = require('./GameStateManager');
const MovingHistory = require('./MovingHistory');

const BridgeRandomNumberGenerator = require('../utils/BridgeRandomNumberGenerator');
const { STATUS } = require('../utils/constants');
/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;

  #gameStateManager;

  constructor(size) {
    this.#bridge = BridgeMaker.makeBridge(
      Number(size),
      BridgeRandomNumberGenerator.generate,
    );
    this.#gameStateManager = new GameStateManager(STATUS.PLAYING, 0, 1);
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(moving) {
    const { stage } = this.getGameStates();
    const isRightMoving = this.#bridge[stage] === moving;

    MovingHistory.log(moving, isRightMoving);
    this.#checkFailOrClear(stage, isRightMoving);
    this.#checkGamePlaying();

    return MovingHistory.toString();
  }

  #checkFailOrClear(stage, isRightMoving) {
    if (!isRightMoving) {
      this.#gameStateManager.updateGameStatus(STATUS.FAIL);
      return;
    }

    this.#checkGameClear(stage);
  }

  #checkGameClear(stage) {
    const isFinalStage = stage === this.#bridge.length - 1;

    if (isFinalStage) {
      this.#gameStateManager.updateGameStatus(STATUS.CLEAR);
    }
  }

  #checkGamePlaying() {
    const { status } = this.getGameStates();

    if (status === STATUS.PLAYING) {
      this.#gameStateManager.increaseStage();
    }
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    MovingHistory.reset();
    this.#gameStateManager.retry();
    this.#gameStateManager.updateGameStatus(STATUS.PLAYING);
  }

  getGameStates() {
    return this.#gameStateManager.getGameStates();
  }
}

module.exports = BridgeGame;
