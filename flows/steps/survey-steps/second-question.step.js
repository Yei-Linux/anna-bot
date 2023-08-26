const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const { handleQuestionProcess, delay } = require('../../../helpers');
const { thirdSurveyQuestionStep } = require('./third-question.step');

const { secondSurveyQuestion } = conversation;
const { keywords, questions, answerPoints } = secondSurveyQuestion;
const [question1, question2] = questions;

const secondSurveyQuestionStep = addKeyword(keywords, {
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
      return;
    },
    [thirdSurveyQuestionStep]
  );

module.exports = { secondSurveyQuestionStep };
