import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

export const withAuthRedirect = (Component) => {
  const wrapperComponent = (props) => {
    if (!props.isAuth) return <Navigate to="/login" />;
    else return <Component {...props} />;
  };
  let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
  });
  return connect(mapStateToPropsForRedirect, {})(wrapperComponent);
};
