import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

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
    let dialogsElements = state.dialogs.map((d) =>
        <Dialog name={d.name} id={d.id} key={d.id}/>
        );
    let messagesElements = state.messages.map((m) =>
        <Message text={m.text} key={m.id}/>
        );

    let addNewMessage = (value) => {
        props.sendMessage(value.newMessageBody);
    }
    return(
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50);
const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={TextArea} name='newMessageBody' placeholder='Enter your message' validate={[required, maxLength50]}/>
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;