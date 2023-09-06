const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');
const {
  invalidOption,
  invalidOptionForLongTime,
} = require('../../../config/constants/messages');
const { isCorrectRange } = require('../../../validators');
const {
  updateLastTimeUserInteraction,
  isLastInteractionHaveLongTime,
} = require('../../../services/user.service');

const {
  medicalAppointmentStep,
} = require('../medical-appointment-steps/medical-appointment-step');
const {
  examFromHomeStep,
} = require('../exam-from-home-steps/exam-from-home-steps');
const {
  firstSurveyQuestionStep,
} = require('../survey-steps/first-question.step');
const { delay } = require('../../../helpers');

const { menuStep } = conversation;
const { keywords, questions } = menuStep;
const [question1, question2] = questions;

const menuStepFlow = addKeyword(keywords)
  .addAnswer(question1)
  .addAnswer(
    question2,
    {
      capture: true,
    },
    async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
      try {
        const optionTyped = ctx.body;
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
          return;
        }

        if (optionTyped == '1') {
          await gotoFlow(medicalAppointmentStep);
          return;
        }
        if (optionTyped == '2') {
          await gotoFlow(examFromHomeStep);
          return;
        }
        if (optionTyped == '3') {
          await flowDynamic([
            'Listo 🙌.Por favor contesta estas preguntas para poder brindarte una atención médica mas personalizada.',
            'Te tomará 30 segundos.',
          ]);
          await gotoFlow(firstSurveyQuestionStep);
          return;
        }
        if (optionTyped == '5') {
          await flowDynamic(['Nos vemos pronto!']);
          return;
        }

        await flowDynamic([
          'En unos momentos, te estaremos atendiendo. Estamos derivando a un asesor para poder resolver tu consulta',
        ]);
        return;
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    [medicalAppointmentStep, examFromHomeStep, firstSurveyQuestionStep]
  );

module.exports = { menuStepFlow };
