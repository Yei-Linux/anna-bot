const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../constants');
const { getOptionTyped } = require('../../../shared/validators');

const { menuStepAnswer } = require('./menu-steps.answer');
const { medicalAppointmentStep } = require('../medical-appointment-steps');
const {
  medicalAppointmentSpecialistStep,
} = require('../medical-appointment-specialist-steps');
const { examFromHomeStep } = require('../exam-from-home-steps');

const { menuStep } = conversation;
const { keywords, questions } = menuStep;
const [question1] = questions;

const menuStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
  },
  async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
    const optionTyped = getOptionTyped(ctx.body);
    return await menuStepAnswer({
      flowDynamic,
      fallBack,
      gotoFlow,
      optionTyped,
      phone: ctx.from,
    });
  },
  [
    medicalAppointmentStep,
    medicalAppointmentSpecialistStep,
    examFromHomeStep,
    firstSurveyQuestionStep,
  ]
);

module.exports = { menuStepFlow };
