class GameStateManager {
  #status;

  #stage;

  #tryCount;

  constructor(status, stage, tryCount) {
    this.#status = status;
    this.#stage = stage;
    this.#tryCount = tryCount;
  }

  updateGameStatus(status) {
    this.#status = status;
  }

  increaseStage() {
    this.#stage += 1;
  }

  increaseTryCount() {
    this.#tryCount += 1;
  }

  retry() {
    this.#stage = 0;
    this.#tryCount += 1;
  }

  getGameStates() {
    return {
      status: this.#status,
      stage: this.#stage,
      tryCount: this.#tryCount,
    };
  }
}

module.exports = GameStateManager;
