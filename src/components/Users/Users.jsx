import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user_icon.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i<=pagesCount; i++){
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map(p => (
                    <span className={`${s.pageButton} ${props.currentPage === p && s.selectedPage}`} onClick={(e) => {
                        props.onPageChanged(p)
                    }}> {p} </span>
                ))}
            </div>
            {
                props.users.map(u => <div key={u.id} className={s.item}>
                    <span className={s.area}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt='user_photo'
                                     className={s.photo}/>
                            </NavLink>
                        </div>
                        <div> {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id);
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                    {
                                        withCredentials: true,
                                        headers: {'API-KEY': '3f26be3e-65ab-4630-9892-39fd2574b842'}
                                    })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id);
                                        }
                                        props.toggleFollowingProgress(false, u.id);
                                    });
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id);
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                    {
                                        withCredentials: true,
                                        headers: {'API-KEY': '3f26be3e-65ab-4630-9892-39fd2574b842'}
                                    })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id);
                                        }
                                        props.toggleFollowingProgress(false, u.id);
                                    });
                            }}>Follow</button>
                        } </div>
                    </span>
                    <span className={s.area + '' + s.field}>
                        <span className={s.area}>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span className={s.area}>
                             {/*<div>{u.location.country}</div>
                             <div>{u.location.city}</div>*/}
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;