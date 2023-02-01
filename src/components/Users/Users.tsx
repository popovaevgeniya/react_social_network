import React, {useEffect} from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user_icon.png';
import {NavLink} from 'react-router-dom';
import Paginator from '../Paginator/Paginator';
import UsersSearchForm from '../UsersSearchForm/UsersSearchForm';
import {FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors';

let Users: React.FC = () => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChange = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const handleFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const handleUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

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
                                handleUnfollow(u.id)
                            }}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                handleFollow(u.id)
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