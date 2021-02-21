import React from 'react';
import ModalBackdrop from '../Modal/Modal';
import Button from '../UIcomponents/Button/Button';
import ButtonClose from '../UIcomponents/ButtonClose/ButtonClose';
import medal from '../../images/homepage/medal.png';

import styles from '../ModalContent/ModalContent.module.css';

function CongratulationModal({
  onClick,

  info,
  onRepeat,
  onNewHabit,
}) {
  return (
    <div className={styles.modalWrapperGreen}>
      <div className={styles.modalCenterLayout}>
        {info.efficiency < 70 && (
          <p className={styles.percent}>Erfolgsniveau: {info.efficiency}%</p>
        )}
        {info.efficiency >= 70 && (
          <h2 className={styles.modalTitleCongrats}>Glückwünsche!</h2>
        )}
        {info.efficiency <= 20 && (
          <>
            <p className={styles.modalTextCongrats}>
              Du kannst auch besser! Nochmal wiederholen?
            </p>
          </>
        )}
        {info.efficiency > 20 && info.efficiency < 70 && (
          <>
            <p className={styles.modalTextCongrats}>
              Ziemlich gut, aber du kannst besser!
            </p>
          </>
        )}
        {info.efficiency >= 70 && (
          <p className={styles.modalTextCongrats}>Perfekt</p>
        )}
        <div className={styles.imgWrapper}>
          <img src={medal} alt="avatar" width="450" />
        </div>
        <div className={styles.btnFolder}>
          <div className={styles.btnBox}>
            <Button
              type={'button'}
              transparent={true}
              handelClick={() => onRepeat()}
              label={'Wiederholen'}
            />
          </div>
          <div>
            <Button
              type={'button'}
              hoverWhite={true}
              handelClick={() => onNewHabit()}
              label={'Neue hinzufügen'}
            />
          </div>
        </div>
        <ButtonClose type="button" onClick={onClick} white={true} />
      </div>
    </div>
  );
}

export default ModalBackdrop(CongratulationModal);
