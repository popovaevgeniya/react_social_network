import {AppSateType} from '../redux-store';

export const getProfile = (state: AppSateType) => {
    return state.profilePage.profile;
}
