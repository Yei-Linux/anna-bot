const { addKeyword } = require('@bot-whatsapp/bot');
const {
  conversation,
  greatMessage,
} = require('../../../config/constants/conversation');
const { updateUser } = require('../../../services/user.service');

const { documentStepFlow } = require('./document.step');
const { delay } = require('../../../helpers');

const { fullNameStep } = conversation;
const { keywords, questions } = fullNameStep;
const [question1] = questions;

const fullNameStepFlow = addKeyword(keywords)
  .addAnswer('')
  .addAnswer(
    question1,
    {
      capture: true,
    },
    async (ctx, { flowDynamic, gotoFlow }) => {
      const phone = ctx.from;
      const fullName = ctx.body;

      await delay(2000);

      await updateUser(phone, { fullName, phone });
      await flowDynamic([greatMessage]);
    },
    [documentStepFlow]
  );

module.exports = { fullNameStepFlow };
