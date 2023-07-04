import { ContactType, MessageType, inferLiteralType } from "../../utils/types";

const ADD_MESSAGE = "web-app/dialogs/add-message";
const CHANGE_MESSAGE = "web-app/dialogs/change-message";



type DialogsInitialState = {
  contacts: Array<ContactType>,
  messages: Array<MessageType>,
  newMessage:string
}
type DialogsActionTypes = ReturnType<inferLiteralType<typeof dialogsActions>>;

const dialogsState:DialogsInitialState = {
  contacts: [
    { id: 1, name: "Grysha" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Petya" },
    { id: 4, name: "Vasya" },
  ],
  messages: [
    { name: "Stalker", text: "Hi" },
    { name: "Stalker", text: "How are you?" },
    { name: "Stalker", text: "Look out!" },
    { name: "Stalker", text: "Bye" },
  ],
  newMessage: "",
};

const dialogsReducer = (state = dialogsState, action:DialogsActionTypes):DialogsInitialState => {
  switch (action.type) {
    case ADD_MESSAGE:
      if (state.newMessage === "") return state;
      return {
        ...state,
        messages: [
          ...state.messages,
          {name: "Stalker", text: state.newMessage },
        ],
        newMessage: "",
      };
    case CHANGE_MESSAGE:
      return {
        ...state,
        newMessage: action.message,
      };
    default:
      return state;
  }
};

export const dialogsActions = {
addMsg: () => ({ type: ADD_MESSAGE } as const),

changeMsg: (text:string) => ({
  type: CHANGE_MESSAGE,
  message: text,
} as const)};
export default dialogsReducer;
