const find = require('./find');
const complete = require('./complete');
const insert = require('./insert');

module.exports = { ...find, ...complete, ...insert };
