import React, { useState } from "react";
import { ProfileType } from "../../../utils/types";
import Bio from "./Bio/Bio";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";


interface ProfileInfoPropsType {
  profile: ProfileType
  isOwner: boolean
  status: string | null
  savePhoto: (file: any) => void
  updateProfileData: (profile: any) => void
  updateStatus:(status:string|null)=>void
}

const ProfileInfo:React.FC<ProfileInfoPropsType> = (props) => {
  const {
    isOwner,
    profile,
    savePhoto,
    status,
    updateStatus,
    updateProfileData,
  } = props;
  let [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e:any) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const saveProfileData = (formData:ProfileType|null) => {
    const profile = { ...formData, fullName: "Jotaro Kujo" };
    updateProfileData(profile);
    setEditMode(false);
  };
  return (
    <div className={s.wrapper}>
      <div className={s.header}>Head Photo</div>
      <div className={s.photo}>
        {profile.photos.large ? <img src={profile.photos.large} alt="" /> : "Photo"}
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
      </div>

      <div className={s.bio}>
        <div>{profile.fullName}</div>
        <ProfileStatus
          isOwner={isOwner}
          status={status}
          updateStatus={updateStatus}
        />
        {editMode || !isOwner ? null : (
          <button onClick={() => setEditMode(true)}>Edit profile</button>
        )}
        <Bio
          editMode={editMode}
          onSubmit={saveProfileData}
          profile={profile}
          initialValues={profile}
        />
      </div>
    </div>
  );
};
export default ProfileInfo;
