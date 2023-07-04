import React from "react";
import s from "./Header.module.css";
import Logo from "./Logo/Logo";
import NavBar from "./NavBar/NavBar";
import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";

const AppHeader:React.FC<{}> = () =>{
    return (
        // <Header style={{ display: 'flex', alignItems: 'center' }}>
        //     <div className="demo-logo" />
        //     <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}/>
        // </Header>
        <div className={s.header}>
            <Logo/>
            <NavBar/>
        </div>
    );
}
export default AppHeader