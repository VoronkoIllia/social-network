import { createSelector } from "reselect";
import { AppStateType } from "../../redux/redux-store"
import { UserType } from "../types";

const getUsersSelector = (state:AppStateType) => {
  return state.usersPage.users;
};
export const getTotalCount = (state:AppStateType) => state.usersPage.totalCount;
export const getPageSize = (state:AppStateType) => state.usersPage.pageSize;
export const getCurrentPage = (state:AppStateType) => state.usersPage.currentPage;
export const getIsFetching = (state:AppStateType) => state.usersPage.isFetching;
export const getFollowInProgress = (state:AppStateType) => state.usersPage.followInProgress;
export const getFilter = (state:AppStateType)=>state.usersPage.filter

export const getUsers = createSelector(
  getUsersSelector,
  (users) => {
    return users.filter((u:UserType) => true);
  }
);
