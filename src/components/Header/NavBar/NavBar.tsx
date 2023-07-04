import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/reducers/auth-reducer";
import { AppDispatch } from "../../../redux/redux-store";
import { getIsAuth, getLogin } from "../../../utils/selectors/auth-selectors";
import s from "./NavBar.module.css";


const NavBar: React.FC<{}> = () => {

  const dispatch:AppDispatch = useDispatch()

  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)

  const logoutUser =()=> dispatch(logout())
  return (
    <header className={s.wrapper}>
      Navbar
      <div className={s.loginBlock}>
        {isAuth ? (
          <button
            onClick={() => {
              logoutUser();
            }}
          >
            {login}
          </button>
        ) : (
          <NavLink to="/login" className={s.loginButton}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};
export default NavBar;
