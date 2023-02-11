import React from "react";
import s from './Post.module.css';
import {UserAvatar} from '../Avatar/Avatar';

type PropsType = {
    message: string
    likeCount: number
}

const Post: React.FC<PropsType> = ({ message, likeCount}) => {
    return(
        <div className={s.item}>
            <UserAvatar small/>
            <span>{message}</span>
            <div>
                <span>Like {likeCount}</span>
            </div>
        </div>
    )
}

export default Post;