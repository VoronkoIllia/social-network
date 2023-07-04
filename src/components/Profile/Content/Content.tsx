import React from "react";
import s from "./Content.module.css";
import Posts from "./Posts/Posts";

export const Content:React.FC<{}> = () => {
  return (
    <div className={s.content}>
      <Posts />
    </div>
  );
};
