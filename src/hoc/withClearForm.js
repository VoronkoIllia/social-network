import React from "react";
import { connect } from "react-redux";
import { clearForm } from "../redux/reducers/actions/actionsTypes";

export const withClearForm = (Component) => {
  const wrapperComponent = (props) => {
    return <Component {...props} />;
  };
  return connect(null, { clearForm })(wrapperComponent);
};
