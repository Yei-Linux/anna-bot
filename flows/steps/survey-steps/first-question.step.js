const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const { handleQuestionProcess, delay } = require('../../../helpers');
const { secondSurveyQuestionStep } = require('./second-question.step');

const { firstSurveyQuestion } = conversation;
const { keywords, questions, answerPoints } = firstSurveyQuestion;
const [question1, question2] = questions;

const firstSurveyQuestionStep = addKeyword(keywords, {
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
        question: question2,
        optionTyped,
        phone,
        fallBack,
        flowDynamic,
        isFirstQuestion: true,
        answerPoints,
      });

      if (!isContinue) return;
    },
    [secondSurveyQuestionStep]
  );

module.exports = { firstSurveyQuestionStep };
