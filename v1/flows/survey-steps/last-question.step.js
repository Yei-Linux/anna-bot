const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../../shared/helpers');
const { conversation } = require('../../constants');
const {
  handleQuestionProcess,
  isUserSickBasedInAnswers,
} = require('../../helpers');
const {
  findLastQuestionWithAnswersByPhone,
} = require('../../../shared/services');

const {
  resultsStepVariation1Step,
  resultsStepVariation2Step,
} = require('../results-steps');

const { lastSurveyQuestion } = conversation;
const { keywords, questions, answerPoints } = lastSurveyQuestion;
const [question1, question2] = questions;

const lastSurveyQuestionStep = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      const phone = ctx.from;
      await delay(1000);
      const examId = await handleQuestionProcess({
        question: question1,
        optionType: ctx.body,
        phone,
        fallBack,
        flowDynamic,
        answerPoints,
      });

      if (!examId) return;
      const answers = await findLastQuestionWithAnswersByPhone(phone, examId);
      const isSick = isUserSickBasedInAnswers(answers);

      if (!isSick) return await gotoFlow(resultsStepVariation2Step);
      return await gotoFlow(resultsStepVariation1Step);
    },
    [resultsStepVariation1Step, resultsStepVariation2Step]
  );

module.exports = { lastSurveyQuestionStep };
