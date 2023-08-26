require('dotenv').config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_CLUSTER_NAME = process.env.MONGO_CLUSTER_NAME;

const MONGO_DB_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER_NAME}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
  MONGO_USER,
  MONGO_PASS,
  MONGO_DB_NAME,
  MONGO_CLUSTER_NAME,
  MONGO_DB_URI,
};
