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
const { COMMAND, STATUS } = require('../utils/constants');

class GameController {
  #bridgeGame;

  #gameStatusHandlers = Object.freeze({
    [STATUS.PLAYING]: this.#inputMoving.bind(this),
    [STATUS.FAIL]: this.#inputGameCommand.bind(this),
    [STATUS.CLEAR]: this.#finishGame.bind(this),
  });

  start() {
    OutputView.printStarting();

    this.#inputBridgeSize();
  }

  #inputBridgeSize() {
    InputView.readBridgeSize((size) => {
      try {
        this.#onInputBridgeSize(size);
      } catch (error) {
        OutputView.printError(error);
        this.#inputBridgeSize();
      }
    });
  }

  #onInputBridgeSize(size) {
    validate(size, isBridgeSize);

    this.#bridgeGame = new BridgeGame(size);

    this.#inputMoving();
  }

  #inputMoving() {
    InputView.readMoving((moving) => {
      try {
        this.#onInputMoving(moving);
      } catch (error) {
        OutputView.printError(error);
        this.#inputMoving();
      }
    });
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
    InputView.readGameCommand((command) => {
      try {
        this.#onInputGameCommand(command);
      } catch (error) {
        OutputView.printError(error);
        this.#inputGameCommand();
      }
    });
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
