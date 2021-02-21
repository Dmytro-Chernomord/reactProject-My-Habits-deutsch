import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import authOperations from '../../redux/auth/authOperation';
import styles from './rightModal.module.css';
import { ReactComponent as Logo } from '../../images/homepage/svg/MakeitHabitblack.svg';
import { ReactComponent as Svg } from '../../images/homepage/svg/Subtract.svg';
import { ReactComponent as ClosedEye } from '../../images/homepage/svg/closedEye.svg';
import { ReactComponent as OpenedEye } from '../../images/homepage/svg/openedEye.svg';
import fadeStyle from '../../Views/PrivateViews/ProfilePage/FadeProfilePage.module.css';
import NotificationLogin from '../notifications/NotificationLogin';

export default function RegisterForm({
  changeModal,
  banNotification,
  setBanNotification,
}) {
  const dispatch = useDispatch();
  const errorsState = useSelector(state => state.error);

  const [eyepass, setEyePass] = useState('password');
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (banNotification === false) {
      if (errorsState === true) {
        setShowNotification(true);
      }
    }
  }, [banNotification, errorsState]);

  const onSubmit = data => {
    setEmail(data.email);
    dispatch(authOperations.registration({ ...data }));
    setShowNotification(false);
    setBanNotification(false);
  };

  const showPassToggle = () => {
    if (eyepass === 'text') {
      setEyePass('password');
    } else {
      setEyePass('text');
    }
  };

  const onClickClose = () => {
    setBanNotification(true);
    setShowNotification(false);
  };

  return (
    <>
      <div className={styles.RegistrationLogo}>
        <div className={styles.RegistrationLogoSvg}>
          <div className={styles.RegistrationLogoPng}>
            <Svg />
          </div>
        </div>
        <Logo />
      </div>
      <p className={styles.RegistrationHi}>Willkommen!</p>
      <p className={styles.RegistrationTxt}>Bitte ausfüllen</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.RegistrationForm}
      >
        <div className={styles.boxError}>
          {errors.email && errors.email.type === 'required' && (
            <p className={styles.error}>*erforderlich</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.RegistrationInputForm}>
          <p className={styles.RegistrationInputTxt}>E-mail</p>
          <input
            className={styles.RegistrationInput}
            placeholder="E-mail"
            name="email"
            type="email"
            style={{
              outlineColor: errors.email ? '#fe6083' : '#43d190',
              borderColor: errors.email ? '#fe6083' : '#e0e0e0',
            }}
            ref={register({
              required: true,
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/i,
                message: '*e-mail nicht korrekt, Beispiel: email@mail.com',
              },
            })}
          />
        </div>
        <div className={styles.boxErrorPass}>
          {errors.password && errors.password.type === 'minLength' && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          {errors.password && errors.password.type === 'pattern' && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          {errors.password && errors.password.type === 'required' && (
            <p className={styles.error}>*erforderlich</p>
          )}
          {errors.password && errors.password.type === 'maxLength' && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.RegistrationInputForm}>
          <p className={styles.RegistrationInputTxt}>Passwort</p>
          <label className={styles.RegistrationPassword}>
            <div
              onClick={showPassToggle}
              className={styles.RegistrationPasswordBtn}
            >
              {eyepass === 'text' ? <OpenedEye /> : <ClosedEye />}
            </div>

            <input
              className={styles.RegistrationInput}
              placeholder="dein Passwort"
              name="password"
              type={eyepass}
              style={{
                outlineColor: errors.password ? '#fe6083' : '#43d190',
                borderColor: errors.password ? '#fe6083' : '#e0e0e0',
              }}
              ref={register({
                pattern: {
                  value: /[A-Za-z0-9]$/i,
                  message:
                    '*Passwort muss aus Buchstaben oder Ziffern bestehen.',
                },
                minLength: {
                  value: 8,
                  message: '*Passwort muss mind. 8 Zeichen haben',
                },
                maxLength: {
                  value: 16,
                  message: '*Passwort kann maximal 16 Zeichen haben',
                },
                required: true,
              })}
            />
          </label>
        </div>
        <div className={styles.boxErrorMessage}>
          <CSSTransition
            in={showNotification}
            classNames={fadeStyle}
            timeout={250}
            unmountOnExit
          >
            <NotificationLogin
              onClickClose={onClickClose}
              text={`*user ${email} schon existiert.`}
            />
          </CSSTransition>
        </div>
        <div className={styles.RegistrationButtonBlock}>
          <button className={styles.RegistrationButton}>
            <p className={styles.RegistrationButtonTxt}>Registration</p>
          </button>
        </div>
      </form>
      <div className={styles.RegistrationButtonBlock}>
        <button className={styles.RegistrationButton}>
          <p onClick={changeModal} className={styles.RegistrationButtonTxt}>
            Login
          </p>
        </button>
      </div>
    </>
  );
}
