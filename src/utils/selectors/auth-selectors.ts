import { AppStateType } from "../../redux/redux-store";

export const getIsAuth = (state: AppStateType) => state.auth.isAuth
export const getLogin = (state:AppStateType)=>state.auth.login