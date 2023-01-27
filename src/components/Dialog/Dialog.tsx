import React from "react";
import {DialogsType} from "../../redux/dialogs-reducer";
import s from "../Dialogs/Dialogs.module.css";
import {NavLink} from "react-router-dom";

const Dialog: React.FC<DialogsType> = (props) => {
    let path = '/dialogs/' + props.id
    return(
        <div className={s.dialog + '' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default Dialog;