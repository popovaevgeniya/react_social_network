import {AppSateType} from '../redux-store';

export const getProfilePhotos = (state: AppSateType) => {
    return state.profilePage.profile?.photos;
}
