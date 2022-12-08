const BRIDGE_SIZE = Object.freeze({
  MIN: 3,
  MAX: 20,
});

const MOVING = Object.freeze({
  UPPER: 'U',
  LOWER: 'D',
});

const COMMAND = Object.freeze({
  RETRY: 'R',
  QUIT: 'Q',
});

module.exports = {
  BRIDGE_SIZE,
  MOVING,
  COMMAND,
};
