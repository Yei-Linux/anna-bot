const isCorrectButtonSelected = (optionTyped, buttons) =>
  !!buttons.find(({ body }) => body == optionTyped);

const getOptionTyped = (optionTyped) => optionTyped.replace(/\./g, '').trim();

const isCorrectRange = (options, optionTyped) => options.includes(optionTyped);

const isCorrectDocumentNumber = (documentNumber) =>
  !(documentNumber.length !== 8 || isNaN(documentNumber));

const isValidEmail = (email) =>
  new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm').test(
    email
  );

const isCorrectListItemSelected = (optionTyped, listRowsParams) => {
  const ids = listRowsParams.map(({ id }) => id);
  return ids.includes(optionTyped);
};

module.exports = {
  isValidEmail,
  isCorrectButtonSelected,
  isCorrectListItemSelected,
  isCorrectRange,
  isCorrectDocumentNumber,
  getOptionTyped,
};
