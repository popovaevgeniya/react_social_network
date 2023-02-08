import React from "react";
import s from './Post.module.css';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';

type PropsType = {
    message: string
    likeCount: number
}

const Post: React.FC<PropsType> = ({ message, likeCount}) => {
    return(
        <div className={s.item}>
            <Avatar icon={<UserOutlined />} />
            <span>{message}</span>
            <div>
                <span>Like {likeCount}</span>
            </div>
        </div>
    )
}

export default Post;