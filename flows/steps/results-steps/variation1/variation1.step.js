const { addKeyword } = require('@bot-whatsapp/bot');

const { invalidOption } = require('../../../../config/constants/messages');
const {
  conversation,
  linkForThirdVariation1,
  firstFinalMessageToShow,
  secondFinalMessageToShow,
} = require('../../../../config/constants/conversation');

const { delay } = require('../../../../helpers');
const { completeExam, findLastExamByPhone } = require('../../../../services');
const { isCorrectRange } = require('../../../../validators');

const { resultsStepVariation1 } = conversation;
const { keywords, questions } = resultsStepVariation1;
const [question1, question2, question3] = questions;

const resultsStepVariation1Step = addKeyword(keywords, {
  regex: false,
})
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

      const link = linkForThirdVariation1[optionTyped];
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

module.exports = { resultsStepVariation1Step };
