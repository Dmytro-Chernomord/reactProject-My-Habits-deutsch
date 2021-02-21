const DAYS_FOR_MAKE_HABIT = 21;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const checkSigaretteStatiscs = (cigarettesArray, dif, inputValue) => {
  let result = [];

  for (let i = 0; i < DAYS_FOR_MAKE_HABIT; i++) {
    const element = cigarettesArray[i];
    if (i - dif < 0 && element === null) {
    }
    if (i - dif === 0) {
      if (element !== null) {
        const newSigValue = element + inputValue;
        result.push(newSigValue);
        continue;
      }
      if (element === null) {
        result.push(inputValue);
        continue;
      }
    }

    if (element !== undefined) {
      result.push(element);
    }
    if (element === undefined) {
      result.push(null);
    }
  }

  return result;
};

const checkSigaretteMissedDates = (cigarettesArray, dif, parseStartedAt) => {
  let result = [];
  for (let i = 0; i < DAYS_FOR_MAKE_HABIT; i++) {
    const element = cigarettesArray[i];
    if (i - dif < 0 && element === null) {
      const dayWthoutInfo = new Date(parseStartedAt).valueOf() + i * MS_PER_DAY;

      result.push({ date: new Date(dayWthoutInfo).toISOString(), index: i });
      continue;
    }
  }
  return result;
};
export { checkSigaretteStatiscs, checkSigaretteMissedDates };
