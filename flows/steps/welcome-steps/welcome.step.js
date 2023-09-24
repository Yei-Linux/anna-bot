const { addKeyword } = require('@bot-whatsapp/bot');

const {
  conversation,
  alreadyUserRegistered,
} = require('../../../config/constants/conversation');
const {
  findUserByPhone,
  updateLastTimeUserInteraction,
} = require('../../../services');
const { delay } = require('../../../helpers');

const { genderStepFlow } = require('./gender.step');
const { fullNameStepFlow } = require('./fullname.step');

const { menuStepFlow } = require('../menu-steps/menu.step');

const { welcomeStep } = conversation;
const { keywords, questions } = welcomeStep;
const [question1, question2] = questions;

const surveyEntry = addKeyword([]).addAnswer(
  alreadyUserRegistered,
  null,
  async (ctx, { gotoFlow }) => {
    const phone = ctx.from;

    try {
      const user = await findUserByPhone(phone);

      if (!user.genderId) {
        gotoFlow(genderStepFlow);
        return;
      }

      await updateLastTimeUserInteraction(phone);
      gotoFlow(menuStepFlow);
      return;
    } catch (error) {}
  },
  [menuStepFlow, genderStepFlow]
);

const welcomeStepFlow = addKeyword(keywords).addAction(
  async (ctx, { flowDynamic }) => {
    const phone = ctx.from;
    await delay(1000);

    try {
      const user = await findUserByPhone(phone);
      const question1Template = !user
        ? question1
        : question2.replaceAll('{{name}}', !user ? '' : ` ${user.fullName}`);
      await flowDynamic([question1Template]);

      if (user) {
        gotoFlow(surveyEntry);
        return;
      }

      gotoFlow(fullNameStepFlow);
      return;
    } catch (error) {}
  }
);

module.exports = {
  welcomeStepFlow,
};
