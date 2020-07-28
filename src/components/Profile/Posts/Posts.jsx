import React from "react";
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";


const Posts = (props) => {
    let postsElements = props.posts.map((p) =>
        <Post message={p.message} likeCount={p.likesCount}/>
        );

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action);
    }

    return(
        <div className='posts'>
            My posts
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} placeholder='Write something' value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>
                        Add post
                    </button>
                </div>
            </div>
            {postsElements}
        </div>
    )
}

export default Posts;