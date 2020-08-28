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
    ]
}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, text: body}]
            }
        default:
            return state;
    }
}

export const sendMessageActionCreator = (newMessageBody) => (
    { type: SEND_MESSAGE, newMessageBody }
)

export default dialogsReducer;