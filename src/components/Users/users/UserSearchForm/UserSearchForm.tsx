import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType, requestUsers } from "../../../../redux/reducers/users-reducer";
import { AppDispatch } from "../../../../redux/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { getIsFetching, getPageSize } from "../../../../utils/selectors/users-selectors";


const UserSearchForm:React.FC<{}> = () => {

    const dispatch:AppDispatch = useDispatch()

    const pageSize = useSelector(getPageSize)
    const isFetching = useSelector(getIsFetching)

    return (
        <Formik initialValues={{
            term: "",
            isFriend: "any"
        }} onSubmit={(values) => {
            const filter: FilterType = { friend: undefined, term: values.term }
            const isFriend = Number(values.isFriend)
            if (!Number.isNaN(isFriend)) filter.friend = Boolean(isFriend)
            dispatch(requestUsers(1, pageSize, filter))
        }}>
            <Form>
                <Field name="term" />
                <Field name="isFriend" as="select" >
                    <option value="1">Is a friend</option>
                    <option value="0">Not a friend</option>
                    <option value="any">All</option>
                </Field>
                <button type="submit" disabled={isFetching}>FIND</button>
            </Form>
        </Formik>
    )
}
export default UserSearchForm;