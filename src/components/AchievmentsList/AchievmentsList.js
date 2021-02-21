import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../Views/PrivateViews/achievments.module.css';

const AchievmentsList = function () {
  const time = useSelector(state => state.notifications.saverTime);
  const cigarettesData = useSelector(state => state.cigarettes.data);
  const quizCigarettesData = useSelector(state => state.quiz.cigarettePerDay);
  const daysWhenSmoke = cigarettesData.filter(item => typeof item === 'number');
  const daysDontSmoke = cigarettesData.filter(item => item === 0);
  console.log(daysDontSmoke);
  const fiveCigarettesLess = daysWhenSmoke.some(
    el => quizCigarettesData - el > 4,
  );
  const oneCigaretteLess = daysWhenSmoke.some(
    el => quizCigarettesData - el >= 1,
  );
  const threeCigarettesLess = daysWhenSmoke.some(
    el => quizCigarettesData - el > 2,
  );
  console.log(cigarettesData);
  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.title}>dein Erfolg</h2>
      </header>
      <ul className={styles.list}>
        <li
          className={
            daysDontSmoke.length > 0 || oneCigaretteLess
              ? styles.item_success
              : styles.item
          }
        >
          <p className={styles.text}>Verzicht auf 1 Zigarette</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 0 || threeCigarettesLess
              ? styles.item_success
              : styles.item
          }
        >
          <p className={styles.text}>Verzicht auf 3 Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 0 || fiveCigarettesLess
              ? styles.item_success
              : styles.item
          }
        >
          <p className={styles.text}>Verzicht auf 5 Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 0 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>1 Tag ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 2 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>3 Tag ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 6 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>1 Woche ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 13 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>2 Woche ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 30 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>1 Monat ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 90 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>3 Monat ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 189 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>6 Monaten ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 364 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>ein Jahr ohne Zigarette</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 365 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>maehr als ein Jahr ohne Zigarette</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 365 * 3 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>3 Jahren ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 365 * 5 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>5 Jahren ohne Zigaretten</p>
        </li>
        <li
          className={
            daysDontSmoke.length > 365 * 7 ? styles.item_success : styles.item
          }
        >
          <p className={styles.text}>5 Jahren ohne Zigaretten</p>
        </li>
        <li className={time >= 1 ? styles.item_success : styles.item}>
          <p className={styles.text}>1 Stunde Zeit gespart</p>
        </li>
        <li className={time >= 3 ? styles.item_success : styles.item}>
          <p className={styles.text}>3 Stunden Zeit gespart</p>
        </li>
        <li className={time >= 5 ? styles.item_success : styles.item}>
          <p className={styles.text}>5 Stunden Zeit gespart</p>
        </li>
      </ul>
    </div>
  );
};

export default AchievmentsList;
