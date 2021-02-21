import React, { useState, useCallback } from 'react';
import Modal from '../../components/Modal/Modal';

export default function CheckListView() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  return (
    <>
      <div>CheckListView</div>
      <button onClick={toggleModal} aria-label="Добавить todo">
        test modal
      </button>
      {showModal && (
        <Modal onClose={toggleModal}>
          {/* <TodoEditor onSave={toggleModal} /> */}
        </Modal>
      )}
    </>
  );
}
