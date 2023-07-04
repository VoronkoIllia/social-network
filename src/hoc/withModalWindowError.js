import React from "react";
import Modal from "../components/common/Modal/Modal";
import { setGlobalError } from "../redux/reducers/app-reducer.ts";
import { connect } from "react-redux";

const withModalWindowError = (Component) => {
  const wrapperComponent = ({ error, title, text, setGlobalError }) => {
    if (!error) {
      return <Component />;
    }
    return (
      <div>
        <Modal
          title={"Hello!"}
          text={"Hahahahahahahaha"}
          closeWindow={setGlobalError}
        />
        <Component />
      </div>
    );
  };
  return connect((state) => ({ error: state.app.globalError }), {
    setGlobalError,
  })(wrapperComponent);
};
export default withModalWindowError;
