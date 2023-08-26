const isCorrectRange = (options, optionTyped) => {
  return options.includes(optionTyped);
};

const isCorrectDocumentNumber = (documentNumber) => {
  if (documentNumber.length !== 8) {
    return false;
  }

  if (isNaN(documentNumber)) {
    return false;
  }

  return true;
};

module.exports = {
  isCorrectRange,
  isCorrectDocumentNumber,
};
