const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../../config/constants/conversation');
const { getOptionTyped } = require('../../../../validators');

const { variation1Answer } = require('./variation1.answer');

const { resultsStepVariation1 } = conversation;
const { keywords, questions } = resultsStepVariation1;
const [question1, question2, question3] = questions;

const resultsStepVariation1Step = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(question2)
  .addAnswer(
    question3,
    { capture: true },
    async (ctx, { flowDynamic, fallBack, endFlow }) => {
      const optionTyped = getOptionTyped(ctx.body);
      return await variation1Answer({
        optionTyped,
        flowDynamic,
        fallBack,
        endFlow,
        phone: ctx.from,
      });
    }
  );

module.exports = { resultsStepVariation1Step };
