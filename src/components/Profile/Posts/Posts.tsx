import React from "react";
import Post from "./Post/Post";
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const Posts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
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