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

  log(moving, isRightMoving) {
    if (moving === MOVING.UPPER) {
      this.generateTopRow(isRightMoving);
      this.bottomRow.push(MARK.BLANK);
      return;
    }

    this.generateBottomRow(isRightMoving);
    this.topRow.push(MARK.BLANK);
  },

  generateTopRow(isRightMoving) {
    if (isRightMoving) {
      this.topRow.push(MARK.RIGHT);
      return;
    }

    this.topRow.push(MARK.WRONG);
  },

  generateBottomRow(isRightMoving) {
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
