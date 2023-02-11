import React from 'react';
import {useSelector} from 'react-redux';
import {AppSateType} from '../../redux/redux-store';
import {Avatar, AvatarProps} from 'antd';
import {UserOutlined} from '@ant-design/icons';

type PropsType = {
    small?: boolean
    size?: number
}

export const UserAvatar: React.FC<PropsType> = ({small, size}) => {
    const avatar = useSelector((state: AppSateType) => small ? state.profilePage.profile?.photos.small : state.profilePage.profile?.photos.large)

    if (!avatar) {
        const commonAvatarProperties = {
            shape: 'square',
            icon: <UserOutlined/>
        } as AvatarProps

        return small
            ? <Avatar {...commonAvatarProperties}/>
            : <Avatar {...commonAvatarProperties} size={size || 170}/>
    }

    return <img src={avatar} alt="avatar" width={size} style={{borderRadius: '6px'}}/>
}