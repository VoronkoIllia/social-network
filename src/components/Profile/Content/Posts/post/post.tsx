import React from "react";
import s from './post.module.css';
import ava from './stalker.jpg';

type PostPropsType = {
    text:string
}
export const Post: React.FC<PostPropsType> = (props) => {
    const { text } = props;
    return(
        <div className={s.post}>
            <img src ={ava} alt="avatar"/>
            <p>{text}</p>
        </div>
    )
}