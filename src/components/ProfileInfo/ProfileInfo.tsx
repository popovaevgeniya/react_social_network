import React from "react";
import Preloader from "../Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import {ProfileType} from "../../types/types";
import {UserAvatar} from '../Avatar/Avatar';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus}) => {
    if (!profile){
        return <Preloader />
    }

    return(
        <div>
            <UserAvatar />
            <span>{profile.aboutMe}</span>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    )
}

export default ProfileInfo;