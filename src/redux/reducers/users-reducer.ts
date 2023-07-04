import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResponseCodes, usersAPI } from "../../api/api";
import { updateObjectInArray } from "../../utils/object-helpers/object-helpers";
import { UserType, inferLiteralType } from "../../utils/types";
import { AppStateType } from "../redux-store";

const FOLLOW = "web-app/usersPage/f";
const UNFOLLOW= "web-app/usersPage/un";
const SET_USERS= "web-app/usersPage/set-users";
const SET_CURRENT_PAGE= "web-app/usersPage/set-current-page";
const SET_TOTAL_USERS_COUNT= "web-app/usersPage/set-total-count";
const SET_IS_FETCHING= "web-app/usersPage/set-is-fetching";
const FOLLOWING_START = "web-app/usersPage/following-start";
const FOLLOWING_FINISH = "web-app/usersPage/following-finish"



export type UsersInitialStateType = {
  users: Array<UserType>,
  totalCount: number,
  pageSize: number,
  currentPage: number,
  isFetching: boolean,
  followInProgress: Array<number>
  filter: FilterType
}
let usersState:UsersInitialStateType = {
  users: [],
  totalCount: 0,
  pageSize: 20,
  currentPage: 1,
  isFetching: false,
  followInProgress: [],
  filter: {
    term: "",
    friend: undefined
  }
};
export type FilterType = {
    term: string,
    friend: boolean | undefined
  }

type UsersActionType = ReturnType<inferLiteralType<typeof usersActions>>

const usersReducer = (state = usersState, action:UsersActionType):UsersInitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case FOLLOWING_START:
      return {
        ...state,
        followInProgress:[...state.followInProgress, action.userId]
      };
    case FOLLOWING_FINISH:
      const followInProgress = [...state.followInProgress]
      const index = followInProgress.indexOf(action.userId);
      followInProgress.splice(index, 1);
      return { ...state, followInProgress }
    case "web-app/usersPage/set-filter":
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state;
  }
};

//users action-creators
export const usersActions = {
  followSuccess: (id: number) => ({ type: FOLLOW, userId: id } as const),

  unfollowSuccess: (id: number) => ({ type: UNFOLLOW, userId: id } as const),

  setUsers: (users:Array<UserType>) => ({
    type: SET_USERS,
    users
  } as const),

  setCurrentPage: (page: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage: page,
  } as const),

  setTotalUsersCount: (count: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount: count,
  } as const),

  setIsFetching: (fetching:boolean) => ({
    type: SET_IS_FETCHING,
    isFetching: fetching,
  } as const),

  followingStart: (userId: number) => ({ type: FOLLOWING_START, userId } as const),

  followingFinish: (userId: number) => ({ type: FOLLOWING_FINISH, userId } as const),
  setFilter:(filter:FilterType)=>({type:"web-app/usersPage/set-filter", filter}as const)
}

//users thunk-creators
type UsersThunk = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionType>
export const requestUsers =
  (currentPage = 1, pageSize = 20, filter:FilterType):UsersThunk =>
  async (dispatch) => {
    dispatch(usersActions.setUsers([]));
    dispatch(usersActions.setCurrentPage(currentPage));
    dispatch(usersActions.setFilter(filter))
    dispatch(usersActions.setIsFetching(true));
    let response = await usersAPI.getUsers(currentPage, pageSize, filter.term,filter.friend);
    dispatch(usersActions.setUsers(response.items));
    dispatch(usersActions.setTotalUsersCount(response.totalCount));
    dispatch(usersActions.setIsFetching(false));
  };
export const follow = (userId:number):UsersThunk => async (dispatch) => {
  let APIMethod = usersAPI.follow.bind(usersAPI);
  let ActionCreator = usersActions.followSuccess;
  await followUnfollowFlow(dispatch, userId, APIMethod, ActionCreator);
};
export const unfollow = (userId:number):UsersThunk => async (dispatch) => {
  let APIMethod = usersAPI.unfollow.bind(usersAPI);
  const ActionCreator = usersActions.unfollowSuccess;
  await followUnfollowFlow(dispatch, userId, APIMethod, ActionCreator);
};

//helper functions
type followUnfollowACType = typeof usersActions.followSuccess | typeof usersActions.unfollowSuccess;

async function followUnfollowFlow(dispatch:Dispatch<UsersActionType>, userId:number, APIMethod:(id:number)=>Promise<ResponseCodes>, ActionCreator:followUnfollowACType) {
  dispatch(usersActions.followingStart(userId));
  let resultCode = await APIMethod(userId);
  if (resultCode === ResponseCodes.Success) {
    dispatch(ActionCreator(userId));
  }
  dispatch(usersActions.followingFinish(userId));

}
export default usersReducer;
