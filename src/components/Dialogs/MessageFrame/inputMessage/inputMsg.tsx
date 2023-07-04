import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../../../common/FormControl/FormControl";
import s from "./inputMsg.module.css";


type PropsType = {
}

const InputMsg:React.FC<InjectedFormProps<{message:string},PropsType>&PropsType> = (props) => {
  
  const { handleSubmit } = props;
  
  return (
    <form onSubmit={handleSubmit} className={s.wrapper}>
      <Field component={Textarea} name={"message"} />
      <button>Send Message</button>
    </form>
  );
};
export default reduxForm<{message:string},PropsType>({ form: "sendMessageForm" })(InputMsg);
