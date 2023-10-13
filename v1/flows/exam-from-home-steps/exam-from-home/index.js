const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');
const { examFromHomeAnswer } = require('./exam-from-home.answer');
const {
  examFromHomeTurnStep,
} = require('../exam-from-home-turn');

const { scheduleExamFromHome } = conversation;
const { keywords, questions } = scheduleExamFromHome;
const [question1, question2] = questions;

const examFromHomeStep = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      const optionTyped = getOptionTyped(ctx.body);
      return await examFromHomeAnswer({
        flowDynamic,
        optionTyped,
        phone: ctx.from,
        fallBack,
        gotoFlow,
      });
    },
    [examFromHomeTurnStep]
  );

module.exports = { examFromHomeStep };
