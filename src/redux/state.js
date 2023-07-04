import { dialogsReducer } from "./reducers/dialogs-reducer";
import { mainReducer } from "./reducers/main-reducer";

const GET_STATE = "asas";
const LETS_GO = "ddd";

let store = {
  _state: {
    dialogs: {
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
    },
    main: {
      posts: [
        { id: 1, text: "Go v tanki?", likesCount: 0 },
        { id: 2, text: "Hello", likesCount: 0 },
        { id: 3, text: "I am S.T.A.L.K.E.R.", likesCount: 0 },
        {
          id: 4,
          text: `I have some artefacts dfdgdgdg dgdgg
            dgdg, dnfd hnfk.dnhjd.dgb x.bxx.bxzbv
            xb .bx.cbxbjb xj.b.jxbx.bx bcsxjbcjx zbvz dbsgbsdbf 
            kjbjkdbkfbkj jbdkj.bflkjbdkjh  hdkjhglkdldghgkjdhshg;
            fhd jkhfkjhghfh dd`,
          likesCount: 0,
        },
        {
          id: 4,
          text: `I have some artefacts dfdgdgdg dgdgg
            dgdg, dnfd hnfk.dnhjd.dgb x.bxx.bxzbv
            xb .bx.cbxbjb xj.b.jxbx.bx bcsxjbcjx zbvz dbsgbsdbf 
            kjbjkdbkfbkj jbdkj.bflkjbdkjh  hdkjhglkdldghgkjdhshg;
            fhd jkhfkjhghfh dd`,
          likesCount: 0,
        },
        {
          id: 4,
          text: `I have some artefacts dfdgdgdg dgdgg
            dgdg, dnfd hnfk.dnhjd.dgb x.bxx.bxzbv
            xb .bx.cbxbjb xj.b.jxbx.bx bcsxjbcjx zbvz dbsgbsdbf 
            kjbjkdbkfbkj jbdkj.bflkjbdkjh  hdkjhglkdldghgkjdhshg;
            fhd jkhfkjhghfh dd`,
          likesCount: 0,
        },
        {
          id: 4,
          text: `I have some artefacts dfdgdgdg dgdgg
            dgdg, dnfd hnfk.dnhjd.dgb x.bxx.bxzbv
            xb .bx.cbxbjb xj.b.jxbx.bx bcsxjbcjx zbvz dbsgbsdbf 
            kjbjkdbkfbkj jbdkj.bflkjbdkjh  hdkjhglkdldghgkjdhshg;
            fhd jkhfkjhghfh dd`,
          likesCount: 0,
        },
        { id: 5, text: "Who wanna go to Chornobyl with me?", likesCount: 0 },
      ],
      newPost: "",
    },
    sidebar: {},
  },
  _callSubscriber() {},
  dispatch(action) {
    if (action.type === GET_STATE) {
      return this._state;
    } else if (action.type === LETS_GO) {
      this._callSubscriber = action.func;
    }
    this._state.main = mainReducer(this._state.main, action);
    this._state.dialogs = dialogsReducer(this._state.dialogs, action);
    this._callSubscriber(this._state);
  },
};

export const getStateActionCreator = () => ({ type: GET_STATE });
export const StarterActionCreator = (data) => ({ type: LETS_GO, func: data });
export default store;
