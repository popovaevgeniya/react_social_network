import React from "react";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";

const Posts = (props) => {
    let postsElements = props.posts.map((p) =>
        <Post message={p.message} likeCount={p.likesCount} key={p.id}/>
        );

    let onAddPost = (value) => {
        props.addPost(value.newPostText);
    }

    return(
        <div className='posts'>
            My posts
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            {postsElements}
        </div>
    )
}
const maxLength10 = maxLengthCreator(10);
const AddNewPostForm = (props) => {
    return  <form onSubmit={props.handleSubmit}>
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

const AddNewPostReduxForm = reduxForm({
    form: 'profileAddNewPostForm'
})(AddNewPostForm);

export default Posts;