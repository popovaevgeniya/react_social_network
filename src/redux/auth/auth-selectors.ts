import {AppSateType} from '../redux-store';

export const selectIsAuth = (state: AppSateType) => {
    return state.auth.isAuth;
}
export const selectCurrentUserLogin = (state: AppSateType) => {
    return state.auth.login;
}