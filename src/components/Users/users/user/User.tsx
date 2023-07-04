import React from "react";
import s from "./User.module.css";
import noAva from "../../../../assets/avas/noava.jpg";
import { NavLink } from "react-router-dom";
import { PhotosType } from "../../../../utils/types";


// key={u.id}
//           userId={u.id}
//           img={u.photos}
//           name={u.name}
//           status={u.status}
//           followed={u.followed}
//           follow={follow}
//           unfollow={unfollow}
//           followInProgress={followInProgress}

interface Props{
  key:number
  userId: number
  img: PhotosType
  name: string
  status: string|null
  followed: boolean
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followInProgress: Array<number>
}

export const User = (props: Props) => {
  let {
    userId,
    img,
    name,
    status,
    followed,
    follow,
    unfollow,
    followInProgress, } = props;
  return (
    <div className={s.profile}>
      <div className={s.wrapper}>
        {img.small ? (
          <NavLink to={"/profile/" + userId}>
            <img src={img.small} alt="" />
          </NavLink>
        ) : (
          <NavLink to={"/profile/" + userId}>
            <img src={noAva} alt="" />
          </NavLink>
        )}
        {followed ? (
          <button
            disabled={followInProgress.includes(userId)}
            onClick={() => {
              unfollow(userId);
            }}
            className={s.followed}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={followInProgress.includes(userId)}
            className={s.nofollowed}
            onClick={() => {
              follow(userId);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <div className={s.bio}>
        <div className={s.nameAndDescription}>
          <div className={s.name}>{name}</div>
          {status ? (
            <div className={s.description}>{status}</div>
          ) : (
            <div className={s.description}>None status</div>
          )}
        </div>
      </div>
    </div>
  );
};
