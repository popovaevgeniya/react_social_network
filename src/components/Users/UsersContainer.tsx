import {useSelector} from 'react-redux';
import React from 'react';
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import {
    getIsFetching,
} from '../../redux/users/users-selectors';

type UsersPagePropsType = {
    pageTitle: string
}
const UsersPage: React.FC<UsersPagePropsType> = ({ pageTitle }) => {
    const isFetching = useSelector(getIsFetching)
    return (
        <>
            <h2>{pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users />
        </>
    )
}

export default UsersPage