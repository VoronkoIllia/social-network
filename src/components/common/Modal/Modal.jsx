import React from "react";
import s from "./Modal.module.css";

const Modal = ({ title, text, closeWindow }) => {
  return (
    <div className={s.modalWrapper}>
      <div className={s.modal}>
        <div className={s.closeBtn} onClick={() => closeWindow()}>
          &#9587;
        </div>
        <div className={s.modalTitle}>{title}</div>
        <div className={s.modalText}>{text}</div>
      </div>
    </div>
  );
};
export default Modal;
