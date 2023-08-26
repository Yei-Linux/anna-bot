const { addKeyword } = require('@bot-whatsapp/bot');

const { invalidOption } = require('../../../../config/constants/messages');
const {
  conversation,
  linkForThirdVariation2,
  firstFinalMessageToShow,
  secondFinalMessageToShow,
} = require('../../../../config/constants/conversation');

const { delay } = require('../../../../helpers');
const { completeExam, findLastExamByPhone } = require('../../../../services');
const { isCorrectRange } = require('../../../../validators');

const { resultsStepVariation2 } = conversation;
const { keywords, questions } = resultsStepVariation2;
const [question1, question2, question3] = questions;

const resultsStepVariation2Step = addKeyword(keywords)
  .addAnswer(question1)
  .addAnswer(question2)
  .addAnswer(
    question3,
    { capture: true },
    async (ctx, { flowDynamic, fallBack, endFlow }) => {
      const optionTyped = ctx.body;
      const phone = ctx.from;

      await delay(2000);

      const isValid = isCorrectRange([1, 2, 3], Number(optionTyped));

      const currentExam = await findLastExamByPhone(phone);
      if (currentExam && currentExam.isCompleted) {
        return;
      }

      if (!isValid) {
        await flowDynamic(invalidOption);
        await fallBack();
        return;
      }

      const link = linkForThirdVariation2[optionTyped];
      const { message } = link;
      if (currentExam) {
        await completeExam(phone, currentExam.examId);
      }

      await flowDynamic([
        firstFinalMessageToShow,
        message,
        secondFinalMessageToShow,
      ]);
      return endFlow('Gracias! 😃');
    }
  );

module.exports = { resultsStepVariation2Step };
