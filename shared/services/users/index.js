const find = require('./find.service');
const lastInteraction = require('./last-interaction.service');
const update = require('./update.service');
const inactiveBot = require('./inactive-bot');

module.exports = {
  ...find,
  ...lastInteraction,
  ...update,
  ...inactiveBot,
};
