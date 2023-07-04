import React, { Suspense } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import SideBar from "./components/SideBar/SideBar";
import UsersContainer from "./components/Users/UsersContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/reducers/app-reducer";
import store, { AppStateType } from "./redux/redux-store";

type StateProps = {
  initialized:boolean
}
type DispatchProps = {
  initializeApp: ()=>void
}
type AppProps = StateProps & DispatchProps;

const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"));

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) return <Preloader />;
    return (
      <div className="App">
        <Header />
        <SideBar />
        <div className="wrapper">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="" element={<ProfileContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer a="ss" />} />
              <Route path="/dialogs/*" element={<Dialogs />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state:AppStateType) => ({
  initialized: state.app.initialized,
});
const AppContainer = connect<StateProps, DispatchProps, unknown, AppStateType>(mapStateToProps, { initializeApp })(App);
const WebApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
);
export default WebApp;
