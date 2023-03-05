import {AppSateType} from '../redux-store';

export const selectChatMessages = (state: AppSateType) => {
    return state.chat.messages;
}
export const selectChatStatus = (state: AppSateType) => {
    return state.chat.status;
}