const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../../shared/helpers');
const { conversation } = require('../../constants');
const { handleQuestionProcess } = require('../../helpers');
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
      await delay(2000);
      const isContinue = await handleQuestionProcess({
        question: question2,
        optionTyped: ctx.body,
        phone: ctx.from,
        fallBack,
        flowDynamic,
        isFirstQuestion: true,
        answerPoints,
      });

      if (!isContinue) return;
      return await gotoFlow(secondSurveyQuestionStep);
    },
    [secondSurveyQuestionStep]
  );

module.exports = { firstSurveyQuestionStep };
