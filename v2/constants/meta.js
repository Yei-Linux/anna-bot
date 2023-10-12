require('dotenv').config();

const META_TOKEN = process.env.META_TOKEN;
const META_NUMBER_ID = process.env.META_NUMBER_ID;
const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

module.exports = {
  META_TOKEN,
  META_NUMBER_ID,
  META_VERIFY_TOKEN,
};
