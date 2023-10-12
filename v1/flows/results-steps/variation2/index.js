const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');
const { getOptionTyped } = require('../../../../shared/validators');

const { variation2Answer } = require('./variation2.answer');

const { resultsStepVariation2 } = conversation;
const { keywords, questions } = resultsStepVariation2;
const [question1, question2, question3] = questions;

const resultsStepVariation2Step = addKeyword(keywords)
  .addAnswer(question1)
  .addAnswer(question2)
  .addAnswer(
    question3,
    { capture: true },
    async (ctx, { flowDynamic, fallBack, endFlow }) => {
      const optionTyped = getOptionTyped(ctx.body);
      return await variation2Answer({
        optionTyped,
        phone: ctx.from,
        flowDynamic,
        fallBack,
        endFlow,
      });
    }
  );

module.exports = { resultsStepVariation2Step };
