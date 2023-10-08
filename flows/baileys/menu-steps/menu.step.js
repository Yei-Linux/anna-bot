const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');
const {
  invalidOption,
  invalidOptionForLongTime,
} = require('../../../config/constants/messages');
const { isCorrectRange, getOptionTyped } = require('../../../validators');
const {
  updateLastTimeUserInteraction,
  isLastInteractionHaveLongTime,
} = require('../../../services/user.service');

const {
  medicalAppointmentStep,
} = require('../medical-appointment-steps/medical-appointment-step');
const {
  medicalAppointmentSpecialistStep,
} = require('../medical-appointment-specialist-steps/medical-appointment-specialist-steps');
const {
  examFromHomeStep,
} = require('../exam-from-home-steps/exam-from-home-steps');
const {
  firstSurveyQuestionStep,
} = require('../survey-steps/first-question.step');
const { delay } = require('../../../helpers');

const { menuStep } = conversation;
const { keywords, questions } = menuStep;
const [question1] = questions;

const menuStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
  },
  async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
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
          ? [invalidOptionForLongTime]
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
        await gotoFlow(medicalAppointmentSpecialistStep);
        return;
      }
      if (optionTyped == '3') {
        await gotoFlow(examFromHomeStep);
        return;
      }
      if (optionTyped == '4') {
        await flowDynamic([
          'Listo 🙌.Por favor contesta estas preguntas para poder brindarte una atención médica mas personalizada. Te tomará 30 segundos.',
        ]);
        await gotoFlow(firstSurveyQuestionStep);
        return;
      }

      await flowDynamic([
        'A partir de este momento, cualquiera de nuestros asesores se comunicara contigo mediante Whatsapp o mediante llamada. Estate atent@, porfavor 👮‍♀️',
      ]);
      return;
    } catch (error) {
      console.log('Error: ', error);
    }
  },
  [
    medicalAppointmentStep,
    medicalAppointmentSpecialistStep,
    examFromHomeStep,
    firstSurveyQuestionStep,
  ]
);

module.exports = { menuStepFlow };
