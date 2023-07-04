import React from "react";
import logo from './logo.svg';
import s from './Logo.module.css';

const Logo:React.FC<unknown> = () => {
    return(
        <div className={s.logo}>
            <img src={logo} alt="logo"></img>
        </div>
    )
}
export default Logo;