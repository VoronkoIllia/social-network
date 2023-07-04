import React from "react";
import { connect } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { AppStateType } from "../../../../redux/redux-store";
import { ProfileType } from "../../../../utils/types";
import { CheckBox, createField, Input } from "../../../common/FormControl/FormControl";
import ContactLinks from "../ContactLinks/ContactLinks";
import s from "./Bio.module.css";

type OwnPropsType = {
  editMode: boolean
  profile: ProfileType
};
type StateProps = {
}
type PropsType = StateProps & OwnPropsType

const Bio:React.FC<InjectedFormProps<ProfileType, PropsType>&PropsType> = (props) => {
  let { editMode,
    profile,
 handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <b>About Me: </b>
          {editMode ? (
            createField("aboutMe", Input, [], { className: s.inputBox })
          ) : profile.aboutMe ? (
            <span>{profile.aboutMe}</span>
          ) : (
            "no info"
          )}
        </div>
        <div>
          <b>Looking for a job: </b>
          {editMode ? (
            createField("lookingForAJob", CheckBox, [])
          ) : profile.lookingForAJob ? (
            <span>yes</span>
          ) : (
            <span>no</span>
          )}
        </div>
        <div>
          <b>Looking for a job description: </b>
          {editMode ? (
            createField("lookingForAJobDescription", Input, [], {
              className: s.inputBox,
            })
          ) : profile.lookingForAJobDescription ? (
            <span>{profile.lookingForAJobDescription}</span>
          ) : (
            "no info"
          )}
        </div>
        <ContactLinks
          contacts={profile.contacts}
          editMode={editMode}
          className={s.inputBox}
        />

        {editMode && <button>Save</button>}
      </form>
    </div>
  );
};
export default reduxForm<ProfileType, PropsType>({ form: "profileData" })(Bio)



