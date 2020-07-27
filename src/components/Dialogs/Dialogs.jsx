import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    let path = '/dialogs/' + props.id
    return(
        <div className={s.dialog + '' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => (
    <div className={s.message}>{props.text}</div>
)

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map((d) =>
        <Dialog name={d.name} id={d.id}/>
        );
    let messagesElements = props.state.messages.map((m) =>
        <Message text={m.text}/>
        );

    return(
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;