import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { SUCCESSFUL_SUBMITING } from "../../redux/reducers/actions/actionsTypes";
import { getCaptchaUrl, login } from "../../redux/reducers/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import {
  email,
  maxLength,
  minLength,
  required,
} from "../../utils/validators/form-validators";
import { CheckBox, Input, createField } from "../common/FormControl/FormControl";
import Preloader from "../common/Preloader/Preloader";
import s from "./Login.module.css";

const maxLength16 = maxLength(16);
const minLength4 = minLength(4);


type StateProps = {
  isAuth: boolean, isFetching:boolean, captchaUrl: string | undefined
}
type DispatchProps = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
  getCaptchaUrl:()=>void
}
type LoginProps = StateProps&DispatchProps

const Login:React.FC<LoginProps> = ({ isAuth, isFetching, captchaUrl, login, getCaptchaUrl}) => {
  
  useEffect(() => {
    getCaptchaUrl()
  },[])

  let dispatch = useDispatch()

  const loginUser = (formData:LoginFormValues) => {
    let { email, password, rememberMe, captcha} = formData;
    login(email, password, rememberMe, captcha);
    dispatch({type:SUCCESSFUL_SUBMITING});
  };

  if (isAuth) return <Navigate to="/profile" />;
  return (
    <div className={s.loginFormWrapper}>
      <h1>Login</h1>
      <LoginReduxForm
        onSubmit={loginUser}
        captchaUrl={captchaUrl}
        isFetching={isFetching}
      />
    </div>
  );
};

type LoginFormValues = {
  email:string, password:string, rememberMe:boolean, captcha:string
}
type LoginFormOwnProps = {
  isFetching:boolean, captchaUrl: string| undefined
}

const LoginForm:React.FC<InjectedFormProps<LoginFormValues, LoginFormOwnProps>&LoginFormOwnProps> = ({ handleSubmit, error, isFetching, captchaUrl }) => {
  return (
    <form className={s.loginForm} onSubmit={handleSubmit}>
      <Field
        className={s.input}
        component={Input}
        type={"email"}
        name={"email"}
        placeholder={"Login"}
        validate={[required, email]}
      />
      <Field
        className={s.input}
        component={Input}
        type={"password"}
        name={"password"}
        placeholder={"Password"}
        validate={[required, maxLength16, minLength4]}
      />
      {error && <div className={s.error}>{error}</div>}
      <div>
        <Field component={CheckBox} name={"rememberMe"} />
        <label>Remember me</label>
      </div>
      {isFetching ? (
        <Preloader />
      ) : (
          <div>
            <div>
              <img src={captchaUrl} alt="captcha" />
            </div>
            <label>Input symbols from image:</label>
            {createField("captcha", Input, [required], { className: s.input })}
          </div>
      )}
      <button>Login</button>
    </form>
  );
};
const LoginReduxForm = reduxForm<LoginFormValues, LoginFormOwnProps>({ form: "loginForm" })(LoginForm);

const mapStateToProps = (state:AppStateType):StateProps => ({
  isAuth: state.auth.isAuth,
  isFetching: state.auth.isFetching,
  captchaUrl: state.auth.captchaUrl,
});
export default connect < StateProps, DispatchProps, any, AppStateType>(mapStateToProps, { login, getCaptchaUrl })(Login);
