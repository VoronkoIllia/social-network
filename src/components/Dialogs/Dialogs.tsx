import React from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { SUCCESSFUL_SUBMITING } from "../../redux/reducers/actions/actionsTypes";
import { dialogsActions } from "../../redux/reducers/dialogs-reducer";
import { AppStateType } from "../../redux/redux-store";
import { ContactType } from "../../utils/types";
import Contact from "./Contact/Contact";
import s from "./Dialogs.module.css";
import Messages from "./MessageFrame/Messages/Messages";
import AddMessageForm from "./MessageFrame/inputMessage/inputMsg";


type StateProps = {
  contacts: Array<ContactType>
}
type DispatchProps = {
  changeMsg: (text: string) => void
  addMsg:()=>void
}
type DialogsProps = StateProps & DispatchProps;

const { addMsg, changeMsg } = dialogsActions;

export const Dialogs:React.FC<DialogsProps> = ({ contacts, changeMsg, addMsg }) => {
  const dispatch = useDispatch();

  const contactsList = contacts.map((el) => (
    <Contact name={el.name} id={el.id} />
  ));

  const sendMessage = (formData:{message:string}) => {
    changeMsg(formData.message);
    addMsg();
    dispatch({ type: SUCCESSFUL_SUBMITING });
  };
  return (
    <div className={s.wrapper}>
      <div className={s.contacts}>{contactsList}</div>
      <div className={s.messages}>
        <Messages />
        <AddMessageForm onSubmit={sendMessage} />
      </div>
    </div>
  );
};
const mapStatetoProps = (state:AppStateType) => {
  return {
    contacts: state.dialogs.contacts,
  };
};

const DialogsWithHOCs = compose(
  withAuthRedirect,
)(Dialogs)

export default connect<StateProps, DispatchProps, unknown, AppStateType>(mapStatetoProps, { addMsg, changeMsg })(DialogsWithHOCs);