const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../constants');

const { medicalTestStep } = conversation;
const { keywords, questions } = medicalTestStep;
const [question1] = questions;

const bookATestStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: false,
    delay: 1000,
  },
  async (ctx, {}) => {},
  []
);

module.exports = { bookATestStepFlow };
