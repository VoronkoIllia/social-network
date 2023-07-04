import React from "react";
import { Message } from "../message/message";
import s from "./Messages.module.css";
import { connect } from "react-redux";
import { MessageType } from "../../../../utils/types";
import { AppStateType } from "../../../../redux/redux-store";

type StateProps = {
  messages:Array<MessageType>
}
type MessagesProps = StateProps

const Messages:React.FC<MessagesProps> = ({ messages }) => {
  let messagesList = messages.map((el) => (
    <li>
      <Message name={el.name} text={el.text} />
    </li>
  ));
  return (
    <div className={s.msg_list}>
      <ul>{messagesList}</ul>
    </div>
  );
};
const mapStateToProps = (state:AppStateType) => ({
  messages: state.dialogs.messages,
});
export default connect<StateProps,unknown,unknown,AppStateType>(mapStateToProps)(Messages);
