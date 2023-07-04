import React from "react";
import s from "./ContactLinks.module.css";
import { FormSection } from "redux-form";
import { Input, createField } from "../../../common/FormControl/FormControl";
import { ContactsType } from "../../../../utils/types";


interface PropsType  {
  editMode: boolean
  className: string
}
interface ContactLinksPropsType extends PropsType {
  contacts: ContactsType
}
interface ContactItemPropsType extends PropsType{
  text: string
  value: string | null
}

const ContactLinks:React.FC<ContactLinksPropsType> = (props) => {
  let { editMode, className, contacts } = props
  const keys = Object.keys(contacts);
  return (
    <FormSection name="contacts">
      <div>
        <b>Contacts:</b>
      </div>
      <ul className={s.contactLinks}>
        {keys.map((key) => (
          <li>
            <ContactItem
              key={key}
              text={key}
              value={contacts[key]}
              editMode={editMode}
              className={className}
            />
          </li>
        ))}
      </ul>
    </FormSection>
  );
};
const ContactItem:React.FC<ContactItemPropsType> = (props) => {
  let {editMode, className, text, value} = props
  return (
    <span>
      <b>{text}: </b>
      {editMode ? (
        createField(props.text, Input, [], { className })
      ) : value ? (
        <a href={value}>{value}</a>
      ) : (
        "none"
      )}
    </span>
  );
};
export default ContactLinks;
