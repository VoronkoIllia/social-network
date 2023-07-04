import React, { useEffect, useState } from "react";

interface PropsType{
  isOwner: boolean
  status: string | null
  updateStatus: (status: string|null)=>void
}
const ProfileStatus:React.FC<PropsType> = (props) => {

  let [editMode, toggleEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    toggleEditMode(true);
  };
  const deactivateEditMode = () => {
    toggleEditMode(false);
    props.updateStatus(status);
  };
  const changeStatus = (e:any) => {
    let status = e.target.value;
    setStatus(status);
  };
  return (
    <>
      {editMode && props.isOwner ? (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            onChange={changeStatus}
            value={status?status:undefined}
            type="text"
          />
        </div>
      ) : (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status ? props.status : "None status"}
          </span>
        </div>
      )}
    </>
  );
};
export default ProfileStatus;
