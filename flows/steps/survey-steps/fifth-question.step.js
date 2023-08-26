const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const { handleQuestionProcess, delay } = require('../../../helpers');
const { sixthSurveyQuestionStep } = require('./sixth-question.step');

const { fifthSurveyQuestion } = conversation;
const { keywords, questions, answerPoints } = fifthSurveyQuestion;
const [question1, question2] = questions;

const fifthSurveyQuestionStep = addKeyword(keywords, {
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
    [sixthSurveyQuestionStep]
  );

module.exports = { fifthSurveyQuestionStep };
