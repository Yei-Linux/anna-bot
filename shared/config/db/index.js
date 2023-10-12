const adapter = require('./Adapter.db');
const envDB = require('./Env.db');
const mongoDB = require('./Mongo.db');
const singleton = require('./Singleton.db');

module.exports = { ...adapter, ...envDB, ...mongoDB, ...singleton };
