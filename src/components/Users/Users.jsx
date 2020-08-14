import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user_icon.png";
import {NavLink} from "react-router-dom";

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
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {props.follow(u.id)}}>Follow</button>
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