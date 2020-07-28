import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState().messagesPage;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreator());
    }
    let onNewMessageChange = (body) => {
        //let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyActionCreator(body));
    }

    return <Dialogs
        updateNewMessageBody={onNewMessageChange}
        sendMessage={onSendMessageClick}
        messagesPage={state}
    />
}

export default DialogsContainer;