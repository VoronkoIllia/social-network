import { ResponseCodes, authAPI } from "../../api/api";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux-store";
import { SetGlobalError, setGlobalError } from "./actions/commonActionCreators";
import { inferLiteralType } from "../../utils/types";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "web-app/auth/set-user-data";
const SET_CAPTCHA_URL = "web-app/auth/set-captcha-url";
const SET_IS_FETCHING = "web-app/auth/is-fetching";

type AuthInitialState = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  captchaUrl: string | undefined,
  isFetching:boolean,
}
let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: undefined,
  isFetching: false,
};

type AuthActionType = ReturnType<inferLiteralType<typeof authActions>> | SetGlobalError;

const authReducer = (state:AuthInitialState = initialState, action:AuthActionType): AuthInitialState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
      };
    case SET_CAPTCHA_URL:
      return { ...state, captchaUrl: action.url };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

//auth action-creators
const authActions = {
setAuthUserData: (id:number|null, email:string|null, login:string|null, isAuth:boolean) => ({
  type: SET_USER_DATA,
  data: { id, email, login, isAuth },
} as const),


setCaptchaUrl: (url:string) => ({
  type: SET_CAPTCHA_URL,
  url,
} as const),


setIsFetching: (isFetching:boolean) => ({
  type: SET_IS_FETCHING,
  isFetching,
  } as const)
}

//auth thunk-creators
type AuthThunk = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType>;

export const getAuthUserData = ():AuthThunk => async (dispatch) => {
  const Data = await authAPI.me();
  if (Data.resultCode === ResponseCodes.Success) {
    let { id, email, login } = Data.data;
    dispatch(authActions.setAuthUserData(id, email, login, true));
  }
};
export const login =
  (email:string, password:string, rememberMe = false, captcha: string):AuthThunk =>
  async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResponseCodes.Success) {
      dispatch(getAuthUserData());
    } else {
      const formError =
        data.messages.length > 0 ? data.messages[0] : "Something went wrong!";
      //@ts-ignore
        dispatch(stopSubmit({form:"loginForm", _error: formError}))
    }
  };

export const logout = ():AuthThunk => async (dispatch) => {
  try {
    let data = await authAPI.logout();
    if (data.resultCode === ResponseCodes.Success) {
      dispatch(authActions.setAuthUserData(null, null, null, false));
    }
  } catch (error:any) {
    dispatch(setGlobalError(error));
  }
};

export const getCaptchaUrl = ():AuthThunk  => async (dispatch) => {
  try {
    dispatch(authActions.setIsFetching(true));
    const captchaUrl = await authAPI.getCaptchaUrl();
    dispatch(authActions.setCaptchaUrl(captchaUrl));
  } catch (error:any) {
    dispatch(setGlobalError(error));
  } finally {
    dispatch(authActions.setIsFetching(false));
  }
};
export default authReducer;
