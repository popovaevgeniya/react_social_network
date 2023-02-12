import React from "react";
import s from './Dialogs.module.css';
import {InitialStateType} from "../../redux/dialogs/dialogs-reducer";
import AddMessageForm from '../AddMessageForm/AddMessageForm'
import Dialog from "../Dialog/Dialog";
import Message from "../Message/Message";

type PropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.messagesPage;
    let dialogsElements = state.dialogs.map((d) => <Dialog name={d.name} id={d.id} key={d.id}/>);
    let messagesElements = state.messages.map((m) => <Message text={m.text} id={m.id} key={m.id}/>);

    let addNewMessage = (value: NewMessageFormType) => {
        props.sendMessage(value.newMessageBody);
    }
    return(
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;