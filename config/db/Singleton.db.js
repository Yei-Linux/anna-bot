const { AdapterDB } = require('./Adapter.db');
const { MongoDb } = require('./Mongo.db');
const { MONGO_DB_URI, MONGO_DB_NAME } = require('./Env.db');

class SingletonDB {
  static instance;
  static client;

  static async init(adapterConnection) {
    if (SingletonDB.client) {
      return null;
    }

    try {
      const adapterClient = await new AdapterDB(adapterConnection).init();
      SingletonDB.client = adapterClient;
    } catch (error) {
      throw new Error(error);
    }
  }

  constructor() {}
}

async function db() {
  const adapterConnection = new MongoDb({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });

  await SingletonDB.init(adapterConnection);

  const client = SingletonDB.client;
  return client;
}

module.exports = {
  client: db,
};
