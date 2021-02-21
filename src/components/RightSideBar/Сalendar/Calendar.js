import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import de from 'date-fns/locale/de';
import { getSelectedDate } from '../../../redux/date/dateActions';
import './calendar.css';

registerLocale('de', de);
setDefaultLocale('de');

const MONTH_NAMES = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'December',
];

const WEEK_DAY_NAMES = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
];

export const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const registerData = useSelector(state => state.user.registerData);
  const dispatch = useDispatch();
  const today = new Date();
  const currentTimeZoneOffset = -1000 * 60 * today.getTimezoneOffset();

  useEffect(() => {
    const selectedDate = new Date(
      Date.parse(startDate) + currentTimeZoneOffset,
    );
    dispatch(getSelectedDate(selectedDate.toISOString()));
  }, [dispatch, startDate, currentTimeZoneOffset]);

  const handelDateChange = date => setStartDate(date);

  const clickToCurrentDay = () => setStartDate(today);

  const dayOfTheWeek = WEEK_DAY_NAMES[today.getDay()];
  const dayOfTheMonth = `${today.getDate()} ${
    MONTH_NAMES[today.getMonth()]
  } ${today.getFullYear()}`;

  return (
    <div className="calendar">
      <p className="calendar-header" onClick={clickToCurrentDay}>
        <span className="week-day">{`${dayOfTheWeek} • `}</span>
        <span className="calendar-date">{dayOfTheMonth}</span>
      </p>
      {/* <DatePicker
        selected={startDate}
        onChange={handelDateChange}
        locale="ru"
        inline
      /> */}

      <DatePicker
        selected={startDate}
        onChange={handelDateChange}
        locale="de"
        inline
        minDate={new Date(registerData)}
        showDisabledMonthNavigation
      />
    </div>
  );
};
