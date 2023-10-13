const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../../shared/helpers');
const { conversation } = require('../../constants');
const { handleQuestionProcess } = require('../../helpers');
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
      await delay(2000);
      const isContinue = await handleQuestionProcess({
        question: question1,
        optionTyped: ctx.body,
        phone: ctx.from,
        fallBack,
        flowDynamic,
        answerPoints,
      });

      if (!isContinue) return;
      return await gotoFlow(sixthSurveyQuestionStep);
    },
    [sixthSurveyQuestionStep]
  );

module.exports = { fifthSurveyQuestionStep };
