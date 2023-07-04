import React from "react";
import s from "./Menu.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { MenuListItem } from "../../../utils/types";

type StateProps = {
  menu:Array<MenuListItem>
}
type MenuProps = StateProps

const Menu:React.FC<MenuProps> = (props) => {
  let menuItemsList = props.menu;
  let menuItems = menuItemsList.map((el) => (
    <NavLink
      key={el.name}
      to={el.link}
      className={(Data) => (Data.isActive ? s.active : s.item)}
      aria-disabled={true}
    >
      {el.name}
    </NavLink>
  ));
  return <div className={s.wrapper}>{menuItems}</div>;
};
const mapStateToProps = (state: AppStateType) => {
  return { menu: state.sidebar.menu };
};
export default connect<StateProps, {},{}, AppStateType>(mapStateToProps, {})(Menu);