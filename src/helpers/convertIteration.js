export default function convertIteration(value) {
  switch (value) {
    case 'allday':
      return 'täglich';
    case 'workday':
      return 'Arbeitstage';
    case 'weekend':
      return 'Wochenende';
    case 'firstset':
      return 'Mo-Mi-Fr';
    case 'secondset':
      return 'Di-Do-Sa';
    case 'eachTwoDays':
      return 'einmal in zwei Tagen';
    case 'onceAWeek':
      return 'ein Mal pro Woche';
    default:
      return null;
  }
}
