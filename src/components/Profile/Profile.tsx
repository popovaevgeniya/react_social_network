import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import PostsContainer from "../Posts/PostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
    return(
        <div className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <PostsContainer />
        </div>
    )
}

export default Profile;