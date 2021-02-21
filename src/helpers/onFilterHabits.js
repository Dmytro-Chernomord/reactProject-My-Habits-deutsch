export const onFilterHabits = (date, habits) => {
  const habitsWithDates = [];
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const HABIT_TIMES = 21;
  const today = new Date();
  const currentTimeZoneOffset = -1000 * 60 * today.getTimezoneOffset();

  for (let i = 0; i < habits.length; i++) {
    const el = habits[i];
    const habitsDates = [];
    const MyDate = el.planningTime;

    switch (el.iteration) {
      case 'allday':
        for (let g = 0; habitsDates.length < HABIT_TIMES; g++) {
          const habitDate = new Date(Date.parse(MyDate) + g * MS_PER_DAY);
          habitsDates.push(habitDate.toISOString().slice(0, 10));
        }
        break;
      case 'workday':
        for (let g = 0; habitsDates.length < HABIT_TIMES; g++) {
          const habitDate = new Date(
            Date.parse(MyDate) + g * MS_PER_DAY - currentTimeZoneOffset,
          );
          if (habitDate.getDay() > 0 && habitDate.getDay() < 6) {
            const validDate = new Date(
              Date.parse(habitDate) + currentTimeZoneOffset,
            );
            habitsDates.push(validDate.toISOString().slice(0, 10));
          }
        }
        break;
      case 'weekend':
        for (let g = 0; habitsDates.length < HABIT_TIMES; g++) {
          const habitDate = new Date(
            Date.parse(MyDate) + g * MS_PER_DAY - currentTimeZoneOffset,
          );
          if (habitDate.getDay() === 0 || habitDate.getDay() === 6) {
            const validDate = new Date(
              Date.parse(habitDate) + currentTimeZoneOffset,
            );
            habitsDates.push(validDate.toISOString().slice(0, 10));
          }
        }
        break;
      case 'firstset':
        for (let g = 0; habitsDates.length < HABIT_TIMES; g++) {
          const habitDate = new Date(
            Date.parse(MyDate) + g * MS_PER_DAY - currentTimeZoneOffset,
          );
          if (
            habitDate.getDay() === 1 ||
            habitDate.getDay() === 3 ||
            habitDate.getDay() === 5
          ) {
            const validDate = new Date(
              Date.parse(habitDate) + currentTimeZoneOffset,
            );
            habitsDates.push(validDate.toISOString().slice(0, 10));
          }
        }
        break;
      case 'secondset':
        for (let g = 0; habitsDates.length < HABIT_TIMES; g++) {
          const habitDate = new Date(
            Date.parse(MyDate) + g * MS_PER_DAY - currentTimeZoneOffset,
          );
          if (
            habitDate.getDay() === 2 ||
            habitDate.getDay() === 4 ||
            habitDate.getDay() === 6
          ) {
            const validDate = new Date(
              Date.parse(habitDate) + currentTimeZoneOffset,
            );
            habitsDates.push(validDate.toISOString().slice(0, 10));
          }
        }
        break;
      case 'eachTwoDays':
        for (let g = 0; habitsDates.length < HABIT_TIMES; g++) {
          const habbitDay = Date.parse(MyDate) + g * MS_PER_DAY * 2;
          const habitDate = new Date(habbitDay);
          habitsDates.push(habitDate.toISOString().slice(0, 10));
        }
        break;
      case 'onceAWeek':
        for (let g = 0; habitsDates.length < HABIT_TIMES; g++) {
          const habbitDay = Date.parse(MyDate) + g * MS_PER_DAY * 7;
          const habitDate = new Date(habbitDay);
          habitsDates.push(habitDate.toISOString().slice(0, 10));
        }
        break;
      default:
        console.log('error type iteration', el.name);
    }

    const indexOfCompletedData = habitsDates.indexOf(date);
    const completed = el.data[indexOfCompletedData];

    habitsWithDates.push({ ...el, habitsDates, completed });
  }
  const filteredHabits = habitsWithDates.filter(habit =>
    habit.habitsDates.includes(date),
  );

  return filteredHabits;
};
