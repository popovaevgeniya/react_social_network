import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import {ProfileType} from "../../../types/types";
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus}) => {
    if (!profile){
        return <Preloader />
    }

    const avatar = profile.photos.large
    return(
        <div>
            {avatar ? <img src={avatar} alt='avatar'/> :
                <Avatar shape="square" size={170} icon={<UserOutlined />} />
            }
            <span>{profile.aboutMe}</span>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    )
}

export default ProfileInfo;