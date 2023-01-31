import React, {FC} from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user_icon.png';
import {NavLink} from 'react-router-dom';
import Paginator from '../Paginator/Paginator';
import {UserType} from '../../types/types';
import UsersSearchForm from '../UsersSearchForm/UsersSearchForm';
import {FilterType} from '../../redux/users-reducer';

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
    onFilterChange: (filter: FilterType) => void
}

let Users: FC<UsersType> = (props) => {
    const {currentPage, onPageChanged, pageSize, totalUsersCount, users, followingInProgress, follow, unfollow, onFilterChange} = props;

    return (
        <div>
            <UsersSearchForm onFilterChange={onFilterChange}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={pageSize} totalItemsCount={totalUsersCount}/>
            {
                users.map(u => <div key={u.id} className={s.item}>
                    <span className={s.area}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="user_photo"
                                     className={s.photo}/>
                            </NavLink>
                        </div>
                        <div> {u.followed
                            ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                unfollow(u.id)
                            }}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                follow(u.id)
                            }}>Follow</button>
                        } </div>
                    </span>
                    <span className={s.area + '' + s.field}>
                        <span className={s.area}>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;