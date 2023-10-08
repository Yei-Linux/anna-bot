const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');
const {
  invalidOption,
  invalidOptionForLongTime,
} = require('../../../config/constants/messages');
const { examFromHomeTurnStep } = require('./exam-from-home-turn');

const { delay } = require('../../../helpers');
const { isCorrectRange, getOptionTyped } = require('../../../validators');
const {
  updateLastTimeUserInteraction,
  isLastInteractionHaveLongTime,
} = require('../../../services/user.service');
const { cache } = require('../../../config/cache');

const { scheduleExamFromHome } = conversation;
const { keywords, questions } = scheduleExamFromHome;
const [question1, question2] = questions;

const examFromHomeStep = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      try {
        const optionTyped = getOptionTyped(ctx.body);
        const phone = ctx.from;

        const isLongTimeFromLastInter = await isLastInteractionHaveLongTime(
          phone
        );
        await updateLastTimeUserInteraction(phone);
        if (isLongTimeFromLastInter) {
          await flowDynamic(['Que bueno verte por aquí otra vez!']);
        }

        const isValid = isCorrectRange([1, 2, 3, 4, 5], Number(optionTyped));

        await delay(2000);

        if (!isValid) {
          const newInvalidOptionMessage = isLongTimeFromLastInter
            ? [
                invalidOptionForLongTime,
                'Recuerda que puedes cerrar la conversacion seleccionando la opcion 5.',
              ]
            : invalidOption;
          await flowDynamic(newInvalidOptionMessage);
          await fallBack();
          return false;
        }

        if (!isValid) {
          await flowDynamic(invalidOption);
          await fallBack();
          return false;
        }

        if (optionTyped == '4') {
          await flowDynamic([
            'En unos momentos, te estaremos atendiendo. Estamos derivando a un asesor para poder resolver tu consulta 👮‍♀️',
          ]);
          return;
        }

        if (optionTyped == '5') {
          await flowDynamic(['Nos vemos pronto! 😄']);
          return;
        }

        const phoneCache = cache().get(phone) ?? {};
        cache().set(phone, { ...phoneCache, examFromHomeAnswer: optionTyped });

        await gotoFlow(examFromHomeTurnStep);
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    [examFromHomeTurnStep]
  );

module.exports = { examFromHomeStep };