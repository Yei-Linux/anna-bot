const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');
const { genderAnswer } = require('./gender.answer');
const { emailStepFlow } = require('../email-question');

const { genderStep } = conversation;
const { keywords, questions, buttons } = genderStep;
const [question1] = questions;

const genderStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    buttons,
  },
  async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
    await genderAnswer({
      gotoFlow,
      flowDynamic,
      fallBack,
      phone: ctx.from,
      optionTyped: ctx.body,
      buttons,
    });
    return;
  },
  [emailStepFlow]
);

module.exports = { genderStepFlow };
