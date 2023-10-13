const isUserSickBasedInAnswers = (answers) => {
  if (!answers) return false;

  try {
    const answersPointsTotal = answers.reduce((acc, { point }) => {
      return acc + point;
    }, 0);

    const isHighSignalOfSickness = answersPointsTotal >= 15;
    return isHighSignalOfSickness;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { isUserSickBasedInAnswers };
