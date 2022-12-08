const BridgeGame = require('../models/BridgeGame');

const InputView = require('../views/InputView');
const OutputView = require('../views/OutputView');

const { validate, isBridgeSize, isMovingInput } = require('../utils/Validator');

class GameController {
  #bridgeGame;

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
  }
}

module.exports = GameController;
