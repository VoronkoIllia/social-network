import { MenuListItem } from "../../utils/types";

type SideBarInitialStateType = {
  menu: Array<MenuListItem>
}

const sideBarInitialState = {
  menu: [
    { name: "Profile", link: "/profile" },
    { name: "Dialogs", link: "/dialogs" },
    { name: "Users", link: "/users" },
    { name: "News", link: "/news" },
    { name: "Settings", link: "/settings" },
    { name: "About", link: "/about" },
  ],
};

const sideBarReducer = (state:SideBarInitialStateType = sideBarInitialState, action:any) => {
  return state;
};
export default sideBarReducer;
