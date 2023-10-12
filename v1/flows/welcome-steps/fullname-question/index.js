const { addKeyword } = require('@bot-whatsapp/bot');

const { updateUser } = require('../.././../../shared/services');
const { delay } = require('../../../../shared/helpers');

const { conversation } = require('../.././../constants');
const { genderStepFlow } = require('../gender-question');

const { fullNameStep } = conversation;
const { keywords, questions } = fullNameStep;
const [question1] = questions;

const fullNameStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
  },
  async (ctx, {}) => {
    const phone = ctx.from;
    await delay(2000);

    await updateUser(phone, { fullName, phone: ctx.body });
  },
  [genderStepFlow]
);

module.exports = { fullNameStepFlow };
