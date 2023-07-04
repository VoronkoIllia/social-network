import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import dialogsReducer from "./reducers/dialogs-reducer";
import profileReducer from "./reducers/profile-reducer";
import sideBarReducer from "./reducers/sidebar-reducer";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import AppReducer from "./reducers/app-reducer";
import { SUCCESSFUL_SUBMITING } from "./reducers/actions/actionsTypes";

let reducer = combineReducers({
  app: AppReducer,
  dialogs: dialogsReducer,
  profilePage: profileReducer,
  sidebar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer.plugin({
    addPostForm: (state:any, action:any) => {
      switch (action.type) {
        case SUCCESSFUL_SUBMITING:
          return null;
        default:
          return state;
      }
    },
    sendMessageForm: (state:any, action:any) => {
      switch (action.type) {
        case SUCCESSFUL_SUBMITING:
          return null;
        default:
          return state;
      }
    },
    loginForm: (state:any, action:any) => {
      switch (action.type) {
        case SUCCESSFUL_SUBMITING:
          return null;
        default:
          return state;
      }
    },
  }),
});
// const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const composeEnhancers = compose;
const store = legacy_createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export type AppStateType = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch

export default store;
