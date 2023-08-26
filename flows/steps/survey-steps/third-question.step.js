const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const { handleQuestionProcess, delay } = require('../../../helpers');
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
    [fourthSurveyQuestionStep]
  );

module.exports = { thirdSurveyQuestionStep };
