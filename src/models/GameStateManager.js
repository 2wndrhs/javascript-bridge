class GameStateManager {
  #status;

  #stage;

  constructor(status, stage) {
    this.#status = status;
    this.#stage = stage;
  }

  updateGameStatus(status) {
    this.#status = status;
  }

  increaseStage() {
    this.#stage += 1;
  }

  getGameStates() {
    return { status: this.#status, stage: this.#stage };
  }
}

module.exports = GameStateManager;
