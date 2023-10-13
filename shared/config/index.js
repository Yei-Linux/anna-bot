const cache = require('./cache');
const db = require('./db');
const logger = require('./logger');

module.exports = {
  ...cache,
  ...db,
  ...logger,
};
