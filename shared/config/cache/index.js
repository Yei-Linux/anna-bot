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
  return {
    ...store,
    upsertStore: (key, objToAdd = {}, cb = (storeValue) => storeValue) => {
      const elementCache = store.get(key) ?? {};
      const storeGot = cb(elementCache);
      store.set(key, { ...storeGot, ...objToAdd });
    },
  };
}

module.exports = {
  cache,
};
