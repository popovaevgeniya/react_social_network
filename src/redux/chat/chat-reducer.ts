import {chatAPI, ChatMessageType} from '../../api/chat-api';
import {FormAction} from 'redux-form';
import {BaseThunkType, InferActionsType} from '../redux-store';
import {Dispatch} from 'redux';

const initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/CHAT/MESSAGES_RECEIVED',
        payload: {messages}
    }) as const
}

let _newMessageHandler: ((message: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (!_newMessageHandler) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessages = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message)
}

export default chatReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>