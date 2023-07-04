import { ThunkAction } from "redux-thunk";
import { ResponseCodes, profileAPI } from "../../api/api";
import { PhotosType, ProfileType, PostType, inferLiteralType } from "../../utils/types";
import { AppStateType } from "../redux-store";

const ADD_POST = "web-app/profilePage/add-post";
const UPDATE_NEW_POST = "web-app/profilePage/update-new-post";
const SET_USER_PROFILE = "web-app/profilePage/set-user-profile";
const SET_USER_STATUS = "web-app/profilePage/set-user-status";
const SAVE_PHOTO_SUCCESS = "web-app/profilePage/save-photo-success";




type ProfileInitialState = {
  posts: Array<PostType>,
  newPost: string,
  status: string | null,
  profile: ProfileType|null,
}

type ProfileActionType = ReturnType<inferLiteralType<typeof profileActions>>;


let profileState:ProfileInitialState = {
  posts: [
    { id: 1, text: "Go v tanki?", likesCount: 0 },
    { id: 2, text: "Hello", likesCount: 0 },
    { id: 3, text: "I am S.T.A.L.K.E.R.", likesCount: 0 },
    {
      id: 4,
      text: `I have some artefacts dfdgdgdg dgdgg
            dgdg, dnfd hnfk.dnhjd.dgb x.bxx.bxzbv
            xb .bx.cbxbjb xj.b.jxbx.bx bcsxjbcjx zbvz dbsgbsdbf 
            kjbjkdbkfbkj jbdkj.bflkjbdkjh  hdkjhglkdldghgkjdhshg;
            fhd jkhfkjhghfh dd`,
      likesCount: 0,
    },
    { id: 5, text: "Who wanna go to Chornobyl with me?", likesCount: 0 },
  ],
  newPost: "",
  profile: null,
  status: null,
};
const profileReducer = (state = profileState, action:ProfileActionType):ProfileInitialState => {
  switch (action.type) {
    case ADD_POST:
      if (state.newPost === "") return state;
      else {
        return {
          ...state,
          posts: [
            ...state.posts,
            {
              id: state.posts.length + 1,
              text: state.newPost,
              likesCount: 0,
            },
          ],
          newPost: "",
        };
      }
    case UPDATE_NEW_POST:
      return {
        ...state,
        newPost: action.text,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType,
      };
    default:
      return state;
  }
};

//profile action-creators
export const profileActions = {

  addNewPost: () => ({ type: ADD_POST } as const),
  updateNewPost: (text:string) => ({
    type: UPDATE_NEW_POST,
    text,
  } as const),

  setUserProfile: (profile:ProfileType) => ({
    type: SET_USER_PROFILE,
    profile,
  } as const),

  setUserStatus: (status:string|null) => ({
    type: SET_USER_STATUS,
    status,
  } as const),

  savePhotoSuccess: (photos:PhotosType) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos,
  } as const)
}

//profile thunk-creators
type ProfileThunk = ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionType>

export const getUserProfile = (userId:number):ProfileThunk => async (dispatch) => {
  let profile = await profileAPI.getUserProfile(userId);
  dispatch(profileActions.setUserProfile(profile));
};
export const getUserStatus = (userId:number):ProfileThunk => async (dispatch) => {
  let status = await profileAPI.getUserStatus(userId);
  dispatch(profileActions.setUserStatus(status));
};
export const updateStatus = (status: string | null): ProfileThunk => async (dispatch) => {
  if (!status) return;
  let data = await profileAPI.setStatus(status);
  if (data.resultCode === ResponseCodes.Success) {
    dispatch(profileActions.setUserStatus(status));
  }
};
export const savePhoto = (image:any):ProfileThunk => async (dispatch) => {
  let response = await profileAPI.savePhoto(image);
  if (response.resultCode === ResponseCodes.Success && response.photos) {
    let photos = response.photos;
    dispatch(profileActions.savePhotoSuccess(photos));
  }
};
export const updateProfileData = (profile:ProfileType):ProfileThunk => async (dispatch, getState) => {
  const authUserId = getState().auth.id;
  const response = await profileAPI.updateProfileData(profile);
  if (response.resultCode === ResponseCodes.Success && authUserId) {
    dispatch(getUserProfile(authUserId));
  } else {
    console.log(response);
  }
};
export default profileReducer;
