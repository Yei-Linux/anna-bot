const { conversation } = require('../../../constants');
const { findUserByPhone } = require('../../../../shared/services');
const { logger } = require('../../../../shared/config');

const { acceptMedicalAppointmentSpecialist } = conversation;
const { _, questions } = acceptMedicalAppointmentSpecialist;
const [question1] = questions;

const acceptQuestionAction = async ({ phone, flowDynamic }) => {
  try {
    const user = await findUserByPhone(phone);

    const response = question1.replaceAll(
      '{{name}}',
      !user ? '' : ` ${user.fullName}`
    );
    return await flowDynamic(response);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { acceptQuestionAction };
