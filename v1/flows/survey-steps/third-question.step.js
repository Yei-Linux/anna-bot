const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../../shared/helpers');
const { conversation } = require('../../constants');
const { handleQuestionProcess } = require('../../helpers');
const { fourthSurveyQuestionStep } = require('./fourth-question.step');

const { thirdSurveyQuestion } = conversation;
const { keywords, questions, answerPoints } = thirdSurveyQuestion;
const [question1, question2] = questions;

const thirdSurveyQuestionStep = addKeyword(keywords, {
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
      return await gotoFlow(fourthSurveyQuestionStep);
    },
    [fourthSurveyQuestionStep]
  );

module.exports = { thirdSurveyQuestionStep };
