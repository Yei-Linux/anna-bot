class AdapterDB {
  adapterConnection;

  constructor(adapterConnection) {
    this.adapterConnection = adapterConnection;
  }

  async init() {
    if (!this.adapterConnection) return;
    try {
      const response = await this.adapterConnection.init();
      console.log('✔️ Correct DB Connection');
      return response;
    } catch (error) {
      console.log('❌ Wrong DB Connection');
      throw new Error(error);
    }
  }
}

module.exports = {
  AdapterDB,
};
