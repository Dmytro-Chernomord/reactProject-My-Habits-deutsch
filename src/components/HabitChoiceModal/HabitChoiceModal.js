import React from 'react';
import ModalBackdrop from '../Modal/Modal';
import Button from '../UIcomponents/Button/Button';
import ButtonClose from '../UIcomponents/ButtonClose/ButtonClose';

import styles from '../ModalContent/ModalContent.module.css';

function HabitChoiceModal({ onClose, openCustom, openTemplate }) {
  return (
    <>
      <div className={styles.modalWrapper}>
        <h2 className={styles.modalTitle}>Gewohnheit hinzufügen</h2>
        <p className={styles.modalText}>Bitte auswählen</p>
        <Button
          type={'button'}
          green={true}
          handelClick={openTemplate}
          label={'Du kannst auswählen +'}
        />
        <p className={styles.modalText}>
          Oder du kannst deine eigene Gewohnheit hinzufügen
        </p>
        <Button
          type={'button'}
          green={true}
          handelClick={openCustom}
          label={'Hinzufügen +'}
        />
        <div className={styles.emptyDiv}></div>
        <Button
          type={'button'}
          green={false}
          handelClick={onClose}
          label={'Stornieren'}
        />
        <ButtonClose type="button" onClick={onClose} />
      </div>
    </>
  );
}

export default ModalBackdrop(HabitChoiceModal);
