const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
            ]
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber () {
        console.log('State changed');
    },
    subscribe (observer) {
        this._callSubscriber = observer; //патерн observer. похож на publisher-subscriber. по этому же патерну работает addEventListener
    },
    dispatch (action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        }
        else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export default store;

window.store = store;