const find = require('./find.service');
const lastInteraction = require('./last-interaction.service');
const update = require('./update.service');

module.exports = {
  ...find,
  ...lastInteraction,
  ...update,
};
