const MetaProvider = require('@bot-whatsapp/provider/meta');
const MongoAdapter = require('@bot-whatsapp/database/mongo');
const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');

const { MONGO_DB_URI, MONGO_DB_NAME } = require('../config/db/Env.db');
const {
  META_TOKEN,
  META_NUMBER_ID,
  META_VERIFY_TOKEN,
} = require('../config/meta/Env');
const { welcomeStepTest } = require('../flows/meta/welcome-steps/welcome.step');

const startup = () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([welcomeStepTest]);
  const adapterProvider = createProvider(MetaProvider, {
    jwtToken: META_TOKEN,
    numberId: META_NUMBER_ID,
    verifyToken: META_VERIFY_TOKEN,
    version: 'v16.0',
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
