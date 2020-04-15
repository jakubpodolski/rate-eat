import React, { FC, useState, useEffect, ReactNode } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import './Popup.css';

type Popup = {
  data: {
    success?: boolean,
    message?: string
  }  
};


export const Popup: FC<Popup> = ({data}) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setIsOpen(false)
  },[])

  Modal.setAppElement('#root')
  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={2000}
      className={classNames("portal", {
        "portal--sucess": data.success,
        "portal--fail": !data.success
      })}
      overlayClassName="portal__overlay"
    >
      <p className="portal__message">
        {data.message}
      </p>
    </Modal>
  );
}