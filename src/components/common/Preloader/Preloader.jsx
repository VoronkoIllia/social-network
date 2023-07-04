import React from "react";
import s from "./Preloader.module.css";
import preloader from "./preloader.svg";

const Preloader = () => {
  return (
    <>
      <img src={preloader} className={s.preload} alt=""/>
    </>
  );
};
export default Preloader;
