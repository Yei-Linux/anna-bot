const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../../../shared/helpers');
const { updateUser } = require('../../../../shared/services');
const { conversation } = require('../../../constants');

const { genderStepFlow } = require('../gender-question');

const { fullNameStep } = conversation;
const { keywords, questions } = fullNameStep;
const [question1] = questions;

const fullNameStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 2000,
  },
  async (ctx, { flowDynamic }) => {
    const phone = ctx.from;
    await updateUser(phone, { fullName: ctx.body, phone });
    await flowDynamic('Genial 😄', { delay: 1000 });
    return;
  },
  [genderStepFlow]
);

module.exports = { fullNameStepFlow };
