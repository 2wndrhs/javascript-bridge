const OutputView = require('../views/OutputView');

class GameController {
  start() {
    OutputView.printStarting();
  }
}

module.exports = GameController;
