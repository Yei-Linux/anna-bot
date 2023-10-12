const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../config/constants/conversation');
const { delay } = require('../../../helpers');

const { welcomeGreetingAction } = require('./welcome-greeting.action');
const { whichFlowContinue } = require('./welcome-greeting.answer');
const { fullNameStepFlow } = require('../fullname-question');
const { genderStepFlow } = require('../gender-question');
const { menuStepFlow } = require('../../menu-steps');

const { welcomeStep } = conversation;
const { keywords } = welcomeStep;

const welcomeStepFlow = addKeyword(keywords)
  .addAction(async (ctx, { flowDynamic }) => {
    await delay(1000);
    return await welcomeGreetingAction({ phone: ctx.from, flowDynamic });
  })
  .addAnswer(
    '😃',
    null,
    async (ctx, { gotoFlow }) => {
      await delay(1000);
      return await whichFlowContinue({ phone: ctx.from, gotoFlow });
    },
    [fullNameStepFlow, genderStepFlow, menuStepFlow]
  );

module.exports = {
  welcomeStepFlow,
};
