const MetaProvider = require('@bot-whatsapp/provider/meta');
const MongoAdapter = require('@bot-whatsapp/database/mongo');
const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');

const { MONGO_DB_URI, MONGO_DB_NAME, PORT } = require('../shared/config');
const { welcomeStepFlow } = require('./flows/welcome-steps');
const {
  META_TOKEN,
  META_NUMBER_ID,
  META_VERIFY_TOKEN,
} = require('./constants');

const startup = () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([welcomeStepFlow]);
  const adapterProvider = createProvider(MetaProvider, {
    jwtToken: META_TOKEN,
    numberId: META_NUMBER_ID,
    verifyToken: META_VERIFY_TOKEN,
    version: 'v16.0',
    port: PORT,
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

module.exports = {
  startup,
};
