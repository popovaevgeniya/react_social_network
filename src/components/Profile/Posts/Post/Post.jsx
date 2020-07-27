import React from "react";
import s from './Post.module.css';

const Post = (props) => {
    return(
        <div className={s.item}>
            <img className={s.item} src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png' alt='avatar'/>
            {props.message}
            <div>
                <span>Like {props.likeCount}</span>
            </div>
        </div>
    )
}

export default Post;