import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalBackdrop from '../Modal/Modal';
import Button from '../UIcomponents/Button/Button';
import ButtonClose from '../UIcomponents/ButtonClose/ButtonClose';
import styles from '../ModalContent/ModalContent.module.css';
import cigarettesOperation from '../../redux/cigarettes/cigarettesOperation';
import cigSelector from '../../redux/cigarettes/cigarettesSelector';
import { checkSigaretteStatiscs } from '../../helpers/checkSigaretteStatiscs';
import userSelector from '../../redux/user/userSelector';
import NotificationModal from '../notifications/NotificationModal';

function DailyResultModal({ onClose }) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [colorText, setColorText] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const cigarettePerDay = userSelector.getCigarettePerDay(state);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const handleInputChange = ({ target: { value } }) => {
    const num = Number(cigarettePerDay);
    if (value < 0) {
      setColorText('#fe6083');
      setMessage('*nur positive Zahlen');
    } else if ((0 <= value && 1 > value) || value === 0) {
      setColorText('#43d190');
      setMessage('Super!');
    } else if (1 <= value && 2 > value) {
      setColorText('#cbcf00');
      setMessage('Gut, aber du kannst auch besser!');
    } else if (num <= value && num + 1 > value) {
      setColorText('#ff3b1f');
      setMessage('Schade, es ist keinen Progress zu sehen');
    } else if (num + 1 <= value && 1000000000 > value) {
      setColorText('#ff0000');
      setMessage('Sieht nicht gut aus, aber nicht aufgeben, du schaffts das!');
    } else {
      setColorText('#ff4f00');
      setMessage(`Na ja..., aber besser als ${cigarettePerDay}`);
    }
    if (value === '') {
      setColorText('#fe6083');
      setMessage('*erforderlich');
    }
    setAmount(value);
  };

  const cigarettesStartedAt = useSelector(
    cigSelector.getCigarettesDataStartedAt,
  );
  const cigarettesArray = useSelector(cigSelector.getCigarettesArray);

  const today = new Date();
  const parseStartedAt = new Date(cigarettesStartedAt);
  const dif = Math.floor(
    (Date.parse(today) - Date.parse(parseStartedAt)) / MS_PER_DAY,
  );

  const onSubmit = e => {
    e.preventDefault();

    if (amount < 0) {
      setColorText('#fe6083');
      setMessage('*nur positive Zahlen');
      return;
    } else if (amount === '') {
      setColorText('#fe6083');
      setMessage('*erforderlich');
      return;
    }
    dispatch(
      cigarettesOperation.postDayCigarettes({
        startedAt: cigarettesStartedAt,
        data: checkSigaretteStatiscs(cigarettesArray, dif, Number(amount)),
      }),
    );
    onClose();
  };

  return (
    <div className={styles.modalWrapper}>
      <h2 className={styles.modalTitleCustom}>
        Wie viel Zigaretten hast du heute geraucht{' '}
      </h2>
      <p className={styles.modalTextCustom}>
        Zusammen können wir die Zahl bis auf Null reduzieren.
      </p>
      <form onSubmit={onSubmit} className={styles.formProfile}>
        <p
          style={{ color: `${colorText}` }}
          className={styles.messageCogarette}
        >
          {message}
        </p>
        <label className={styles.labelDailyResult}>
          <span className={styles.textLabelDailyResult}>Zigarettenmenge</span>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleInputChange}
            className={styles.input}
            style={{
              outlineColor: colorText === '#fe6083' ? '#fe6083' : '#43d190',
              borderColor: colorText === '#fe6083' ? '#fe6083' : '#e0e0e0',
            }}
          />
        </label>
        <div className={styles.btnFolder}>
          <div className={styles.btnBox}>
            <Button
              type={'button'}
              green={false}
              handelClick={() => onClose()}
              label={'Stornieren'}
            />
          </div>
          <div>
            <Button type={'submit'} green={true} label={'Speichern'} />
          </div>
        </div>
        <div style={{ marginBottom: '5px' }}>
          <NotificationModal />
        </div>
        <ButtonClose type="button" onClick={onClose} />
      </form>
    </div>
  );
}
export default ModalBackdrop(DailyResultModal);
