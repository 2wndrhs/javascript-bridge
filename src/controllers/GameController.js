const InputView = require('../views/InputView');
const OutputView = require('../views/OutputView');

const { validate, isBridgeSize } = require('../utils/Validator');

class GameController {
  start() {
    OutputView.printStarting();

    this.#inputBridgeSize();
  }

  #inputBridgeSize() {
    InputView.readBridgeSize(this.#onInputBridgeSize.bind(this));
  }

  #onInputBridgeSize(size) {
    validate(size, isBridgeSize);
  }
}

module.exports = GameController;
