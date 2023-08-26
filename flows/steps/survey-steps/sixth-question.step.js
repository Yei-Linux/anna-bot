const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const { handleQuestionProcess, delay } = require('../../../helpers');
const { lastSurveyQuestionStep } = require('./last-question.step');

const { sixthSurveyQuestion } = conversation;
const { keywords, questions, answerPoints } = sixthSurveyQuestion;
const [question1, question2] = questions;

const sixthSurveyQuestionStep = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      const optionTyped = ctx.body;
      const phone = ctx.from;

      await delay(2000);

      const isContinue = await handleQuestionProcess({
        question: question1,
        optionTyped,
        phone,
        fallBack,
        flowDynamic,
        answerPoints,
      });

      if (!isContinue) return;
    },
    [lastSurveyQuestionStep]
  );

module.exports = { sixthSurveyQuestionStep };
