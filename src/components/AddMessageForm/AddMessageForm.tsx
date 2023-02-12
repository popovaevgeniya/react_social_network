import {maxLengthCreator, required} from "../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../FormsControls/FormsControls";
import {NewMessageFormType} from '../Dialogs/Dialogs'
import {Button} from 'antd';

type PropsType = {}

const maxLength50 = maxLengthCreator(50);
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={TextArea} name='newMessageBody' placeholder='Enter your message' validate={[required, maxLength50]}/>
        </div>
        <div>
            <Button type="primary">Send</Button>
        </div>
    </form>
}

export default reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm);
