import React from "react";

import s from "./SideBar.module.css";
import logo from "./logo.svg";
import Menu from "./Menu/Menu";

const SideBar:React.FC<{}> = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <img src={logo} alt="logo"></img>
        <Menu />
      </div>
    </div>
  );
};
export default SideBar;
