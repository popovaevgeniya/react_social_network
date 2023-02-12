import React, {useEffect} from 'react';
import s from './Users.module.css';
import {NavLink, useHistory} from 'react-router-dom';
import UsersSearchForm from '../UsersSearchForm/UsersSearchForm';
import {FilterType, follow, requestUsers, unfollow} from '../../redux/users/users-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users/users-selectors';
import {Avatar, Pagination} from 'antd';
import {UserOutlined} from '@ant-design/icons';

type QueryParamsType = {
    term?: string
    friend?: string
    page?: string
}

const Users: React.FC = () => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
            const searchParams = new URLSearchParams(history.location.search)
            let actualPage = currentPage
            let actualFilter = filter

            if (searchParams.has('page')) {
                actualPage = Number(searchParams.get('page'))
            }
            if (searchParams.has('term')) {
                actualFilter = {...actualFilter, term: searchParams.get('term') as string}
            }
            switch (searchParams.get('friend')) {
                case 'null':
                    actualFilter = {...actualFilter, friend: null}
                    break
                case 'true':
                    actualFilter = {...actualFilter, friend: true}
                    break
                case 'false':
                    actualFilter = {...actualFilter, friend: false}
                    break
            }

            dispatch(requestUsers(actualPage, pageSize, actualFilter))
        },
        [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: new URLSearchParams(query).toString()
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChange = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    return (
        <div>
            <UsersSearchForm onFilterChange={onFilterChange}/>
            {/*<Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize} totalItemsCount={totalUsersCount}/>*/}
            <div className={s.users}>
                {users.map(u => <div key={u.id} className={s.item}>
                    <span className={s.area}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                {u.photos.small ? <img src={u.photos.small} alt="user_photo" className={s.photo}/>
                                    : <Avatar size={100} shape='square' icon={<UserOutlined/>}/>}
                            </NavLink>
                        </div>
                        <span className={s.area + '' + s.field}>
                            <span className={s.area}>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                        </span>
                        <div> {u.followed
                            ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                dispatch(unfollow(u.id))
                            }}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                dispatch(follow(u.id))
                            }}>Follow</button>
                        } </div>
                    </span>
                </div>)}
            </div>
            <Pagination defaultCurrent={1} current={currentPage} total={totalUsersCount} defaultPageSize={pageSize} onChange={onPageChanged} showSizeChanger={false}/>
        </div>
    )
}

export default Users;