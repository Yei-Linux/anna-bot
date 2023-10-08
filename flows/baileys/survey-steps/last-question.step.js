const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const {
  findLastQuestionWithAnswersByPhone,
} = require('../../../services/questions.service');
const {
  handleQuestionProcess,
  isUserSickBasedInAnswers,
  delay,
} = require('../../../helpers');

const {
  resultsStepVariation1Step,
} = require('../results-steps/variation1/variation1.step');
const {
  resultsStepVariation2Step,
} = require('../results-steps/variation2/variation2.step');

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
      const optionTyped = ctx.body;
      const phone = ctx.from;

      await delay(1000);

      const examId = await handleQuestionProcess({
        question: question1,
        optionTyped,
        phone,
        fallBack,
        flowDynamic,
        answerPoints,
      });

      if (!examId) return;

      const answers = await findLastQuestionWithAnswersByPhone(phone, examId);
      const isSick = isUserSickBasedInAnswers(answers);

      if (isSick) {
        await gotoFlow(resultsStepVariation1Step);
        return;
      }
      await gotoFlow(resultsStepVariation2Step);
    },
    [resultsStepVariation1Step, resultsStepVariation2Step]
  );

module.exports = { lastSurveyQuestionStep };
