const { cache } = require('./config/cache');
const { client } = require('./config/db/Singleton.db');

const { startup } = require('./startups/startup-meta');

const main = async () => {
  try {
    startup();
    await client();
    cache();
  } catch (error) {
    console.log('test????', error);
    setTimeout(() => {
      main();
    }, 10 * 1000);
  }
};

main();
