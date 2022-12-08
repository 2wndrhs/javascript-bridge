const InputView = require('../views/InputView');
const OutputView = require('../views/OutputView');

class GameController {
  start() {
    OutputView.printStarting();

    this.#inputBridgeSize();
  }

  #inputBridgeSize() {
    InputView.readBridgeSize(this.onInputBridgeSize.bind(this));
  }

  onInputBridgeSize(size) {}
}

module.exports = GameController;
