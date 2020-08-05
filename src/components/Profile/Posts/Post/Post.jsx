import React from "react";
import s from './Post.module.css';
import avatar from "../../../../assets/images/avatar.png";

const Post = (props) => {
    return(
        <div className={s.item}>
            <img className={s.item} src={avatar} alt='avatar'/>
            {props.message}
            <div>
                <span>Like {props.likeCount}</span>
            </div>
        </div>
    )
}

export default Post;