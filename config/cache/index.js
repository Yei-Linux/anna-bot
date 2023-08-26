const NodeCache = require('node-cache');

class SingletonCache {
  static cache;

  static init() {
    if (SingletonCache.cache) {
      return null;
    }

    try {
      const cache = new NodeCache({ deleteOnExpire: false });
      SingletonCache.cache = cache;
      console.log('✔️ Correct Cache Initialization');
    } catch (error) {
      console.log('❌ Wrong Cache Initialization');
      throw new Error(error);
    }
  }

  constructor() {}
}

function cache() {
  SingletonCache.init();

  const store = SingletonCache.cache;
  return store;
}

module.exports = {
  cache,
};
