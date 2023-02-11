import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControls/FormsControls";
import React from "react";

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10);
const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={TextArea} name='newPostText' placeholder='Write something'
                   validate={[required, maxLength10]}/>
        </div>
        <div>
            <button>
                Add post
            </button>
        </div>
    </form>
}
export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profileAddNewPostForm'})(AddPostForm);