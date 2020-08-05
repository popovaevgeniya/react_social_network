import React from "react";
import './Header.css';
import logo from "../../assets/images/logo.png";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return(
        <header className='header'>
            <img src={logo} alt='logo'/>
            <div className='loginBlock'>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;