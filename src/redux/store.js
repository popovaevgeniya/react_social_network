import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are you?', likesCount: 2},
                {id: 2, message: 'Yoyoyoyo', likesCount: 12},
                {id: 3, message: 'It is my first post.', likesCount: 42}
            ],
            newPostText: 'text text text'
        },
        messagesPage: {
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
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('State changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer; //патерн observer. похож на publisher-subscriber. по этому же патерну работает addEventListener
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;