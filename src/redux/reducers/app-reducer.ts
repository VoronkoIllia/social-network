import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { AppStateType } from "../redux-store";
import { SetGlobalError, SET_GLOBAL_ERROR } from "./actions/commonActionCreators";

const INITIALIZED_SUCCESS = "web-app/app/INITIALIZED_SUCCESS";

export type AppInitialState = {
  initialized: boolean,
  globalError: Object|null
}
const initialState:AppInitialState = {
  initialized: false,
  globalError: true,
};

type AppActionType = SetGlobalError | SetInitialize; 

const AppReducer = (state = initialState, action:AppActionType):AppInitialState => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case SET_GLOBAL_ERROR:
      return { ...state, globalError: action.error };
    default:
      return state;
  }
};

type SetInitialize = {
  type: typeof INITIALIZED_SUCCESS
}
export const setInitialize = (): SetInitialize => ({ type: INITIALIZED_SUCCESS });



type AppThunk = ThunkAction<void, AppStateType, unknown, AppActionType>
export const initializeApp = ():AppThunk => (dispatch) => {
  let authorization = dispatch(getAuthUserData());
  Promise.all([authorization]).then(() => {
    dispatch(setInitialize());
  });
};
export default AppReducer;
