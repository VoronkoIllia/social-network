import React from "react";
import { Content } from "./Content/Content";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader/Preloader";
import { ProfileType } from "../../utils/types";

type PropsType = {
  userId: number 
  profile: ProfileType | null
  status: string | null
  updateStatus: (status: string|null) => void
  savePhoto: (image: any) => void
  updateProfileData: (profile:ProfileType)=>void
}

export const Profile:React.FC<PropsType> = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.wrapper}>
      <ProfileInfo
        isOwner={!props.userId}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        updateProfileData={props.updateProfileData}
      />
      <Content />
    </div>
  );
};
