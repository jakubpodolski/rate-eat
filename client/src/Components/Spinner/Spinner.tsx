import React from 'react';
import Modal from 'react-modal';
import './Spinner.css'

export const Spinner = () => {
  Modal.setAppElement('#root')
  return (
    <Modal 
      isOpen={true}
      overlayClassName="spinner__overlay"
      className="spinner__container"
    >
      <div className="spinner">
        <div></div>
      </div>
    </Modal>
  );
}