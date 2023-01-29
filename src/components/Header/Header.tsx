import React from "react";
import './Header.css';
import logo from "../../assets/images/logo.png";
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}


const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return(
        <header className='header'>
            <img src={logo} alt='logo'/>
            <div className='loginBlock'>
                {props.isAuth
                    ? <div>{props.login} <button onClick={props.logout}>Logout</button> </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;