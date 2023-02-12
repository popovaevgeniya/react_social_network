import React from "react";
import {MessagesType} from "../../redux/dialogs/dialogs-reducer";
import s from "../Dialogs/Dialogs.module.css";

const Message: React.FC<MessagesType> = (props) => (
    <div className={s.message}>{props.text}</div>
)

export default Message;