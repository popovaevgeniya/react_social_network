import {connect} from 'react-redux';
import {
    unfollow, follow, requestUsers, FilterType
} from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from '../../redux/users-selectors';
import {UserType} from '../../types/types';
import {AppSateType} from '../../redux/redux-store';

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
    filter: FilterType
}

type MapDispatchToPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {requestUsers, currentPage, pageSize, filter} = this.props;
        requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {requestUsers, pageSize, filter} = this.props;
        requestUsers(pageNumber, pageSize, filter);
    }

    onFilterChange = (filter: FilterType) => {
        const {pageSize, requestUsers} = this.props;
        requestUsers(1, pageSize, filter);
    }

    render() {
        const {
            totalUsersCount, pageSize, currentPage, users, follow, unfollow, followingInProgress, isFetching, pageTitle
        } = this.props;

        return <>
            <h2>{pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={this.onPageChanged}
                   users={users}
                   follow={follow}
                   unfollow={unfollow}
                   followingInProgress={followingInProgress}
                   onFilterChange={this.onFilterChange}
            />
        </>
    }
}

//selectors
const mapStateToProps = (state: AppSateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppSateType>(
        mapStateToProps,
        {follow, unfollow, requestUsers})
)(UsersContainer);
