const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Slava'},
        {id: 3, name: 'Valera'},
        {id: 4, name: 'Kolia'},
        {id: 5, name: 'Sveta'}
    ],
    messages: [
        {id: 1, text: 'Hi'},
        {id: 2, text: 'Hello'},
        {id: 3, text: 'How are you?'},
        {id: 4, text: 'Yo'},
        {id: 5, text: 'Hey!'}
    ],
    newMessageBody: ''
}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.messages.push({id: 6, text: body});
            state.newMessageBody = '';
            return state;
        default:
            return state;
    }
}

export const sendMessageActionCreator = () => (
    {type: SEND_MESSAGE}
)

export const updateNewMessageBodyActionCreator = (body) => (
    {type: UPDATE_NEW_MESSAGE_BODY, body: body}
)

export default dialogsReducer;