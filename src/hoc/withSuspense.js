import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

const withSuspense = (Component) => {
  const wrapperComponent = (props) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    );
  };
  return wrapperComponent;
};
export default withSuspense;
