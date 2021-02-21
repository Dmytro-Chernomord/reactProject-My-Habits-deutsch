import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import LoginForm from './LoginForm';
import s from './rightModal.module.css';
import styles from './Main.module.css';
import RegisterForm from './RegisterForm';
import { ReactComponent as Logo } from '../../images/homepage/svg/MakeitHabit.svg';
import { ReactComponent as Svg } from '../../images/homepage/svg/Subtract.svg';

export default function Authorization() {
  const [modalView, setmodalView] = useState(false);
  const [rightmodalView, setRightmodalView] = useState(false);
  const [banNotification, setBanNotification] = useState(false);

  const changeModal = () => {
    if (!rightmodalView) {
      setmodalView(!modalView);
      setBanNotification(true);
    } else {
      setRightmodalView(!rightmodalView);
      setmodalView(!modalView);
      setBanNotification(true);
    }
  };
  const rightchangeModal = () => {
    if (!modalView) {
      setRightmodalView(!rightmodalView);
      setBanNotification(true);
    } else {
      setRightmodalView(!rightmodalView);
      setmodalView(!modalView);
      setBanNotification(true);
    }
  };
  const closeOnBackdop = event => {
    if (event.target === event.currentTarget && modalView) {
      changeModal();
      setBanNotification(true);
    } else if (event.target === event.currentTarget && rightmodalView) {
      rightchangeModal();
      setBanNotification(true);
    }
  };

  return (
    <>
      <div className={styles.HomeContainer}>
        <div className={styles.Home}>
          <div className={styles.HomeLeft}>
            <div className={styles.HomeBackground1}></div>
            <div className={styles.HomeBackground2}></div>
          </div>

          <div className={styles.HomeCentre}>
            <div className={styles.HomeBlock}>
              <p className={styles.HomeTitle}>
                «Es gibt nichts Leichteres, als mit dem Rauchen aufzuhören. Ich
                selbst habe es schon 137mal geschafft.».
              </p>
              <p className={styles.HomeTitleName}>Mark Twain</p>
              <div className={styles.HomeLogo}>
                <div className={styles.HomeLogoSvg}>
                  <div className={styles.HomeLogoPng}>
                    <Svg />
                  </div>
                </div>
                <Logo />
              </div>
              <p className={styles.HomeTitleHi}>Willkommen!</p>
              <p className={styles.HomeTitleTxt}>Anmelden oder registrieren</p>
              <div className={styles.HomeButtonBlock}>
                <button onClick={changeModal} className={styles.HomeButton}>
                  <p className={styles.HomeEnterTxt}>Login</p>
                </button>

                <button
                  className={styles.HomeButton}
                  onClick={rightchangeModal}
                >
                  <p className={styles.HomeEnterTxt}>Registration</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.HomeRight}>
            <div className={styles.HomeBackground3}></div>
            <div className={styles.HomeBackground4}></div>
          </div>
        </div>
        <CSSTransition
          in={rightmodalView}
          timeout={250}
          classNames={s}
          unmountOnExit
        >
          <div className={s.backdrop}>
            {' '}
            <RegisterForm />
          </div>
        </CSSTransition>{' '}
        <CSSTransition
          in={modalView}
          timeout={250}
          classNames={styles}
          unmountOnExit
        >
          <div className={styles.backdrop}>
            <LoginForm />
          </div>
        </CSSTransition>
      </div>
      <div onClick={closeOnBackdop} className={s.overlay}>
        <CSSTransition
          in={rightmodalView}
          timeout={250}
          classNames={s}
          unmountOnExit
        >
          <div className={s.backdrop}>
            <RegisterForm
              changeModal={changeModal}
              setBanNotification={setBanNotification}
              banNotification={banNotification}
            />
          </div>
        </CSSTransition>{' '}
        <CSSTransition
          in={modalView}
          timeout={250}
          classNames={styles}
          unmountOnExit
        >
          <div className={styles.backdrop}>
            <LoginForm
              rightchangeModal={rightchangeModal}
              setBanNotification={setBanNotification}
              banNotification={banNotification}
            />
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
