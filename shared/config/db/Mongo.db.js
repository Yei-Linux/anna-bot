const { MongoClient } = require('mongodb');
const { logger } = require('../logger');

class MongoDb {
  client;
  credentials = {
    dbUri: '',
    dbName: '',
  };

  constructor(credentials) {
    if (!credentials) throw new Error('Credentials must have dbName and dbUri');
    if (!credentials.dbUri || !credentials.dbName) {
      throw new Error('Credentials must have dbName and dbUri');
    }

    this.credentials = credentials;
    this.init();
  }

  async init() {
    try {
      const client = new MongoClient(this.credentials.dbUri);
      await client.connect();
      this.client = client;
      return this;
    } catch (error) {
      logger.error(error.message);
      throw new Error('Error in connection', error);
    }
  }

  get db() {
    return this.client.db(this.credentials.dbName);
  }
}

module.exports = {
  MongoDb,
};
