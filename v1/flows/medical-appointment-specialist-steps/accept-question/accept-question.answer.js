const {
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { delay } = require('../../../../shared/helpers');
const { logger } = require('../../../../shared/config');

const { conversation } = require('../../../constants');

const { acceptMedicalAppointmentSpecialist } = conversation;
const { keywords, questions } = acceptMedicalAppointmentSpecialist;
const [_, __, question3] = questions;

const acceptQuestionAnswer = async ({ phone, flowDynamic }) => {
  try {
    await delay(2000);
    await updateLastTimeUserInteraction(phone);
    return await flowDynamic(question3);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { acceptQuestionAnswer };
