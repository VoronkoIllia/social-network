import React from "react";
import s from "./message.module.css";
import ava from "./stalker.jpg";
import { MessageType } from "../../../../utils/types";

export const Message: React.FC<MessageType> = (props) => {

  const { name, text }=props

  return (
    <div className={s.wrapper}>
      <img src={ava} alt="" />
      <div className={s.msg}>
        <div className={s.name}>{name}</div>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  );
};
