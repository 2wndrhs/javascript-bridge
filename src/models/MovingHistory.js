const { MOVING } = require('../utils/constants');

const MARK = Object.freeze({
  RIGHT: 'O',
  WRONG: 'X',
  BLANK: ' ',
  DIVIDER: ' | ',
});

const MovingHistory = {
  topRow: [],

  bottomRow: [],

  log(bridge, moving, stage) {
    if (moving === MOVING.UPPER) {
      this.generateTopRow(bridge, moving, stage);
      this.bottomRow.push(MARK.BLANK);
      return;
    }

    this.generateBottomRow(bridge, moving, stage);
    this.topRow.push(MARK.BLANK);
  },

  generateTopRow(bridge, moving, stage) {
    const isRightMoving = bridge[stage] === moving;

    if (isRightMoving) {
      this.topRow.push(MARK.RIGHT);
      return;
    }

    this.topRow.push(MARK.WRONG);
  },

  generateBottomRow(bridge, moving, stage) {
    const isRightMoving = bridge[stage] === moving;

    if (isRightMoving) {
      this.bottomRow.push(MARK.RIGHT);
      return;
    }

    this.bottomRow.push(MARK.WRONG);
  },

  toString() {
    return [this.topRow, this.bottomRow].map(
      (row) => `[ ${row.join(MARK.DIVIDER)} ]`,
    );
  },
};

module.exports = MovingHistory;
