const getOptionTyped = (optionTyped) => {
  return optionTyped.replace(/\./g, '').trim();
};

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
  getOptionTyped,
};
