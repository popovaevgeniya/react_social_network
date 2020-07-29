import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {


    return <StoreContext.Consumer>
        {
            (store) => {
                let onSendMessageClick = () => {
                    store.dispatch(sendMessageActionCreator());
                }
                let onNewMessageChange = (body) => {
                    //let body = e.target.value;
                    store.dispatch(updateNewMessageBodyActionCreator(body));
                }
                return (
                    <Dialogs
                        updateNewMessageBody={onNewMessageChange}
                        sendMessage={onSendMessageClick}
                        messagesPage={store.getState().messagesPage}
                    />
                )
            }
        }
    </StoreContext.Consumer>
}

export default DialogsContainer;