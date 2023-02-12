import {createSelector} from "reselect";
import {AppSateType} from "../redux-store";

export const getUsersSelector = (state: AppSateType) => {
    return state.usersPage.users;
}
export const getUsers = createSelector(getUsersSelector, (users) => {
    //если не будет меняться в стэйте getUsers, то эта функция не будет перезапускаться
    return users.filter(u => true);
})

export const getPageSize = (state: AppSateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppSateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppSateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppSateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppSateType) => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state: AppSateType) => (
    state.usersPage.filter
)
