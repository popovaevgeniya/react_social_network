import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import defaultPhoto from "../../../assets/images/avatar.png";
import ProfileStatus from "./ProfileStatus"

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader />
    }
    return(
        <div>
            <img src={!props.profile.photos.large ? defaultPhoto : props.profile.photos.large} alt='avatar'/>
            <span>{props.profile.aboutMe}</span>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
        </div>
    )
}

export default ProfileInfo;