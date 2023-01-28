import React from "react";
import Post from "./Post/Post";
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

const Posts: React.FC<PropsType> = (props) => {
    let postsElements = props.posts.map((p) =>
        <Post message={p.message} likeCount={p.likesCount} key={p.id}/>
        );

    let onAddPost = (value: AddPostFormValuesType) => {
        props.addPost(value.newPostText);
    }

    return(
        <div className='posts'>
            My posts
            <AddPostForm onSubmit={onAddPost}/>
            {postsElements}
        </div>
    )
}

export default Posts;