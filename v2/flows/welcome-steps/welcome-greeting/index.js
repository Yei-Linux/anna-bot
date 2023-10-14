const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../../../shared/helpers');
const {
  findUserByPhone,
  isInactiveForGettingResponse,
} = require('../../../../shared/services');
const { conversation } = require('../../../constants');

const { welcomeIsRegisteredUserAction } = require('./welcome.actions');
const { whichFlowAfterWelcome } = require('./welcome.answer');

const { genderStepFlow } = require('../gender-question');
const { emailStepFlow } = require('../email-question');
const { fullNameStepFlow } = require('../fullname-question');
const { servicesMenuStepFlow } = require('../../services-menu');

const { welcomeStep } = conversation;
const { keywords } = welcomeStep;

/**
 * Welcome Step Flow - First Step
 */
const welcomeStepFlow = addKeyword(keywords)
  .addAction(async (ctx, { endFlow }) => {
    const phone = ctx.from;
    const isInactive = await isInactiveForGettingResponse({ phone, endFlow });
    if (isInactive) return;
    return;
  })
  .addAnswer(
    '¡Hola!',
    {
      capture: false,
    },
    async (ctx, { gotoFlow, flowDynamic }) => {
      const phone = ctx.from;
      const user = await findUserByPhone(phone);

      await delay(2000);
      await welcomeIsRegisteredUserAction({
        flowDynamic,
        user,
      });

      await delay(2000);
      await whichFlowAfterWelcome({ gotoFlow, phone, user });
      return;
    },
    [servicesMenuStepFlow, fullNameStepFlow, genderStepFlow, emailStepFlow]
  );

module.exports = {
  welcomeStepFlow,
};
