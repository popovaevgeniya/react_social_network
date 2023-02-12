import React from 'react';
import {useSelector} from 'react-redux';
import {Avatar, AvatarProps} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {getProfile} from '../../redux/profile/profile-selectors';

type PropsType = {
    small?: boolean
    size?: number
}

export const UserAvatar: React.FC<PropsType> = ({small, size}) => {
    const profile = useSelector(getProfile)
    if (!profile) return null

    const avatar = small ? profile.photos.small : profile.photos.large
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