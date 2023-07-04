import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserProfile,
  getUserStatus,
  savePhoto,
  updateProfileData,
  updateStatus,
} from "../../redux/reducers/profile-reducer";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../utils/types";
import { Profile } from "./Profile";

type StateProps = {
  profile: ProfileType | null
  status: string | null
  authUserId: number | null
}
type DispatchProps = {
  getUserProfile: (id: number) => void
  getUserStatus: (id: number) => void
  savePhoto: (image: any) => void
  updateStatus: (status: string|null) => void
  updateProfileData:(profile:ProfileType)=>void
}
type ProfileContainerPropsType = StateProps & DispatchProps;

const ProfileContainer: React.FC<ProfileContainerPropsType> = ({authUserId, ...props}) => {

  const params = useParams();
  const navigate = useNavigate();

  const paramsUserId = Number(params.userId)

  useEffect(() => {
    let userId = paramsUserId;
    if (!authUserId) return navigate("/login");
    if (!userId) userId = authUserId;
    props.getUserProfile(userId);
    props.getUserStatus(userId);
  },[paramsUserId, authUserId]);
  

  return <Profile {...props} userId={paramsUserId} />;
}

const mapStateToProps = (state:AppStateType):StateProps => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.id ,
});

export default connect<StateProps, DispatchProps, {}, AppStateType>(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateStatus,
    savePhoto,
    updateProfileData,
  })(ProfileContainer);
