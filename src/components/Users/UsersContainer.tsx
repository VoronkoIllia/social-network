import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getIsAuth } from "../../utils/selectors/auth-selectors";
import {
  getCurrentPage,
  getFilter,
  getPageSize
} from "../../utils/selectors/users-selectors";
import Users from "./users/Users";
import { AppDispatch } from "../../redux/redux-store";
import { FilterType, requestUsers } from "../../redux/reducers/users-reducer";


const UsersContainer: React.FC<{}> = () => {
  
  const dispatch:AppDispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  const isAuth = useSelector(getIsAuth)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getFilter)

  useEffect(() => {
    const searchParams = new URLSearchParams()
    if(filter.term!=='') searchParams.set("term", filter.term)
    if(filter.friend !== undefined)searchParams.set("friend", String(filter.friend))
    if(currentPage !== 1)searchParams.set("page", String(currentPage))

    navigate({pathname: location.pathname, search: `?${searchParams}`})
  }, [filter, currentPage])

  useEffect(() => {

    let page = 1;
    const actualFilter:FilterType = {term:"", friend:undefined}

    const searchParams = new URLSearchParams(location.search)
    const term = searchParams.get("term")
    const friend = searchParams.get("friend")
    const pageData = searchParams.get("page")

    if (term) actualFilter.term = term
    if (friend) friend === "true"
      ? actualFilter.friend = true
      : actualFilter.friend = false
    if(pageData) page = Number(pageData)
    
    dispatch(requestUsers(page, pageSize, actualFilter));
  }, [])

  if(!isAuth) return <Navigate to="/login"/>
  return <Users />;
}

export default withAuthRedirect(UsersContainer);
