const { cache, client, logger } = require('./shared/config');
const { startup: startupV1 } = require('./v1/startup');
const { startup: startupV2 } = require('./v2/startup');

const main = async () => {
  try {
    startupV2();
    await client();
    cache();
  } catch (error) {
    logger.error(error.message);
    setTimeout(() => {
      main();
    }, 10 * 1000);
  }
};

main();
