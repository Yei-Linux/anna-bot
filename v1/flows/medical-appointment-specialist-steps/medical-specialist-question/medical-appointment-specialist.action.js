const { findUserByPhone } = require('../../../shared/services');
const { logger } = require('../../../shared/config');

const { conversation } = require('../../constants');
const { scheduleMedicalAppointmentSpecialist } = conversation;
const { _, questions } = scheduleMedicalAppointmentSpecialist;
const [question1] = questions;

const medicalAppointmentSpecialistAction = async ({ phone, flowDynamic }) => {
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

module.exports = { medicalAppointmentSpecialistAction };
