const { addKeyword } = require('@bot-whatsapp/bot');
const {
  conversation,
  linkForExamFromHome,
} = require('../../../config/constants/conversation');

const { cache } = require('../../../config/cache');
const { delay } = require('../../../helpers');
const { isCorrectRange } = require('../../../validators');
const { invalidOption } = require('../../../config/constants/messages');

const { scheduleExamFromHomeChooseTurn } = conversation;
const { keywords, questions } = scheduleExamFromHomeChooseTurn;
const [question1, question2] = questions;

const examFromHomeTurnStep = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic }) => {
      try {
        const optionTyped = ctx.body;
        const phone = ctx.from;

        await delay(2000);

        const isValid = isCorrectRange([1, 2], Number(optionTyped));

        if (!isValid) {
          await flowDynamic(invalidOption);
          await fallBack();
          return false;
        }

        const messageOption = linkForExamFromHome[optionTyped];
        if (!messageOption) return;

        const phoneCache = cache().get(phone) ?? {};

        const { message } = messageOption;
        const subjectPaymentMessage =
          phoneCache && phoneCache.examFromHomeAnswer
            ? `Segun lo que seleccionaste seria: "Anna - Pago por el Plan ${phoneCache.examFromHomeAnswer}"`
            : '';

        await flowDynamic([
          message,
          'Recuerda colocar a la hora de hacer el pago indicar que plan estas pagando.',
          subjectPaymentMessage,
        ]);
        return;
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    []
  );

module.exports = { examFromHomeTurnStep };
