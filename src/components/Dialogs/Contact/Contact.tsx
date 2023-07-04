import React from "react";
import s from "./Contact.module.css";
import { NavLink } from "react-router-dom";


type ContactType = {
  id: number,
  name:string
}
const Contact: React.FC<ContactType> = (props) => {

  const { id, name } = props;

  let path = `/dialogs/${id}`;
  
  return (
    <div className={s.wrapper}>
      <NavLink
        to={path}
        className={(data) => (data.isActive ? s.active : s.item)}
      >
        {name}
      </NavLink>
    </div>
  );
};
export default Contact;
