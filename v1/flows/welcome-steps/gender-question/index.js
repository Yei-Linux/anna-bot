const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../constants');
const { getOptionTyped } = require('../../../../shared/validators');
const { genderAnswer } = require('./gender.answer');

const { genderStep } = conversation;
const { keywords, questions } = genderStep;
const [question1, question2] = questions;

const genderStepFlow = addKeyword(keywords)
  .addAnswer(question1)
  .addAnswer(
    question2,
    {
      capture: true,
    },
    async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
      const optionTyped = getOptionTyped(ctx.body);
      return await genderAnswer({
        phone,
        optionTyped,
        flowDynamic,
        fallBack,
        gotoFlow,
      });
    }
  );

module.exports = { genderStepFlow };
