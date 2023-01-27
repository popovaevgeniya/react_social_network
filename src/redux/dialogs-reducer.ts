const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogsType = {
    id: number,
    name: string
}

type MessagesType = {
    id: number,
    text: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Slava'},
        {id: 3, name: 'Valera'},
        {id: 4, name: 'Kolia'},
        {id: 5, name: 'Sveta'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, text: 'Hi'},
        {id: 2, text: 'Hello'},
        {id: 3, text: 'How are you?'},
        {id: 4, text: 'Yo'},
        {id: 5, text: 'Hey!'}
    ] as Array<MessagesType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessage = (newMessageBody: string): SendMessageActionCreatorType => (
    { type: SEND_MESSAGE, newMessageBody }
)

export default dialogsReducer;