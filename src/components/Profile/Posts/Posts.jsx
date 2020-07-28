import React from "react";
import Post from "./Post/Post";

const Posts = (props) => {
    let postsElements = props.posts.map((p) =>
        <Post message={p.message} likeCount={p.likesCount}/>
        );

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return(
        <div className='posts'>
            My posts
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} placeholder='Write something' value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>
                        Add post
                    </button>
                </div>
            </div>
            {postsElements}
        </div>
    )
}

export default Posts;