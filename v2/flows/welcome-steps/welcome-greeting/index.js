const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');

const { welcomeIsRegisteredUserAction } = require('./welcome.actions');
const { whichFlowAfterWelcome } = require('./welcome.answer');

const { genderStepFlow } = require('../gender-question');
const { fullNameStepFlow } = require('../fullname-question');
const { servicesMenuStepFlow } = require('../../services-menu');

const { welcomeStep } = conversation;
const { keywords } = welcomeStep;

/**
 * Welcome Step Flow - First Step
 */
const welcomeStepFlow = addKeyword(keywords).addAnswer(
  '¡Hola!',
  null,
  async (ctx, { gotoFlow, flowDynamic }) => {
    await welcomeIsRegisteredUserAction({
      flowDynamic,
      phone: ctx.from,
    });
    return await whichFlowAfterWelcome({ gotoFlow, phone: ctx.from });
  },
  [servicesMenuStepFlow, fullNameStepFlow, genderStepFlow]
);

module.exports = {
  welcomeStepFlow,
};
