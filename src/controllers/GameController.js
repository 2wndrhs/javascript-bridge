const BridgeGame = require('../models/BridgeGame');

const InputView = require('../views/InputView');
const OutputView = require('../views/OutputView');

const { validate, isBridgeSize } = require('../utils/Validator');

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

  #onInputMoving(moving) {}
}

module.exports = GameController;
