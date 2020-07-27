import React from "react";
import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return(
        <nav className={s.nav}>
            <ul>
                <div className={s.item}>
                    <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                </div>
                <div className={`${s.item}`}>
                    <NavLink to='/dialogs' activeClassName={s.active}>Massages</NavLink>
                </div>
                <div className={s.item}>
                    News
                </div>
            </ul>
        </nav>
    )
}

export default NavBar;