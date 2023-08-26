const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');

const { cache } = require('./config/cache');
const { MONGO_DB_URI, MONGO_DB_NAME } = require('./config/db/Env.db');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MongoAdapter = require('@bot-whatsapp/database/mongo');

const { client } = require('./config/db/Singleton.db');
const { welcomeStepFlow } = require('./flows/steps/welcome-steps/welcome.step');

const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([welcomeStepFlow]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();

  await client();
  cache();
};

main();
