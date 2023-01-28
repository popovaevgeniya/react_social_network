import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import defaultPhoto from "../../../assets/images/avatar.png";
import ProfileStatus from "./ProfileStatus"
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    console.log('props:', props );
    if (!props.profile){
        return <Preloader />
    }
    return(
        <div>
            <img src={!props.profile.photos.large ? defaultPhoto : props.profile.photos.large} alt='avatar'/>
            <span>{props.profile.aboutMe}</span>
            {/*<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>*/}
            <ProfileStatus />
        </div>
    )
}

export default ProfileInfo;