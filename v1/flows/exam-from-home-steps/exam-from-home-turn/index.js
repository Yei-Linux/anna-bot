const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../config/constants/conversation');
const { examFromHomeTurnAnswer } = require('./exam-from-home-turn.answer');
const { getOptionTyped } = require('../../../../shared/validators');

const { scheduleExamFromHomeChooseTurn } = conversation;
const { keywords, questions } = scheduleExamFromHomeChooseTurn;
const [question1, question2] = questions;

const examFromHomeTurnStep = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic }) => {
      const optionTyped = getOptionTyped(ctx.body);
      return await examFromHomeTurnAnswer({
        fallBack,
        optionTyped,
        flowDynamic,
        phone: ctx.from,
      });
    },
    []
  );

module.exports = { examFromHomeTurnStep };
