import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, requestUsers, unfollow } from "../../../redux/reducers/users-reducer";
import { AppDispatch } from "../../../redux/redux-store";
import { getCurrentPage, getFilter, getFollowInProgress, getIsFetching, getPageSize, getTotalCount, getUsers } from "../../../utils/selectors/users-selectors";
import Paginator from "../../common/Paginator/Paginator";
import Preloader from "../../common/Preloader/Preloader";
import UserSearchForm from "./UserSearchForm/UserSearchForm";
import s from "./Users.module.css";
import { User } from "./user/User";


const Users:React.FC<{}> = () => {

  const dispatch:AppDispatch = useDispatch()

  const users = useSelector(getUsers)
  const totalCount = useSelector(getTotalCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const followInProgress = useSelector(getFollowInProgress)
  const isFetching = useSelector(getIsFetching)
  const filter = useSelector(getFilter)

  const onPageChanged = (pageNumber:number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div className={s.wrapper}>
      <Paginator
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        buttonsCount={5}
      />
      <UserSearchForm />
      {isFetching ? <Preloader /> : null}
      {users.map((u) => (
        <User
          key={u.id}
          userId={u.id}
          img={u.photos}
          name={u.name}
          status={u.status}
          followed={u.followed}
          follow={followUser}
          unfollow={unfollowUser}
          followInProgress={followInProgress}
        />
      ))}
    </div>
  );
};
export default Users;
