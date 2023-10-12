const { isCorrectDocumentNumber } = require('../../../../shared/validators');
const { updateUser } = require('../../../../shared/services');
const { delay } = require('../../../../shared/helpers');
const { logger } = require('../../../../shared/config');

const { invalidDocumentNumber } = require('../../../constants');
const { genderStepFlow } = require('../gender-question');

const documentQuestionAnswer = async ({
  flowDynamic,
  fallBack,
  gotoFlow,
  documentNumber,
  phone,
}) => {
  await delay(2000);

  try {
    const isValid = isCorrectDocumentNumber(documentNumber);

    if (!isValid) {
      await flowDynamic(invalidDocumentNumber);
      return await fallBack();
    }

    await updateUser(phone, { phone, documentNumber });
    return await gotoFlow(genderStepFlow);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { documentQuestionAnswer };
