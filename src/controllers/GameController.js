const { Console } = require('@woowacourse/mission-utils');

const BridgeGame = require('../models/BridgeGame');
const MovingHistory = require('../models/MovingHistory');

const InputView = require('../views/InputView');
const OutputView = require('../views/OutputView');

const {
  validate,
  isBridgeSize,
  isMovingInput,
  isGameCommand,
} = require('../utils/Validator');
const { COMMAND } = require('../utils/constants');

class GameController {
  #bridgeGame;

  #gameStatusHandlers = Object.freeze({
    PLAYING: this.#inputMoving.bind(this),
    FAIL: this.#inputGameCommand.bind(this),
    CLEAR: this.#finishGame.bind(this),
  });

  start() {
    OutputView.printStarting();

    this.#inputBridgeSize();
  }

  #inputBridgeSize() {
    InputView.readBridgeSize(this.#onInputBridgeSize.bind(this));
  }

  #onInputBridgeSize(size) {
    validate(size, isBridgeSize);

    this.#bridgeGame = new BridgeGame(size);

    this.#inputMoving();
  }

  #inputMoving() {
    InputView.readMoving(this.#onInputMoving.bind(this));
  }

  #onInputMoving(moving) {
    validate(moving, isMovingInput);

    const movingHistory = this.#bridgeGame.move(moving);
    OutputView.printMap(movingHistory);

    this.#checkGameStatus();
  }

  #checkGameStatus() {
    const { status } = this.#bridgeGame.getGameStates();

    this.#gameStatusHandlers[status]();
  }

  #inputGameCommand() {
    InputView.readGameCommand(this.#onInputGameCommand.bind(this));
  }

  #onInputGameCommand(command) {
    validate(command, isGameCommand);

    if (command === COMMAND.RETRY) {
      this.#bridgeGame.retry();
      this.#checkGameStatus();
      return;
    }
    this.#finishGame();
  }

  #finishGame() {
    const movingHistory = MovingHistory.toString();
    const { status, tryCount } = this.#bridgeGame.getGameStates();

    OutputView.printResult(movingHistory, status, tryCount);
    Console.close();
  }
}

module.exports = GameController;
