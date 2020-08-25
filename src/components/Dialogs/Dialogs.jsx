import React from "react";
import s from './Dialogs.module.css';
import {NavLink, Redirect} from "react-router-dom";

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
    let state = props.messagesPage;
    let newMessageBody = state.newMessageBody;

    let dialogsElements = state.dialogs.map((d) =>
        <Dialog name={d.name} id={d.id} key={d.id}/>
        );
    let messagesElements = state.messages.map((m) =>
        <Message text={m.text} key={m.id}/>
        );

    let onSendMessageClick = () => {
        props.sendMessage();
    }
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>;

    return(
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            onChange={onNewMessageChange}
                            value={newMessageBody}
                            placeholder='Enter your message'
                        ></textarea>
                    </div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;