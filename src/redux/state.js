let rerenderEntireTree = () => {
    console.log('State changed');
}

let state = {
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
            {id: 1,  name: 'Dima'},
            {id: 2,  name: 'Slava'},
            {id: 3,  name: 'Valera'},
            {id: 4,  name: 'Kolia'},
            {id: 5,  name: 'Sveta'}
        ],
        messages: [
            {id: 1,  text: 'Hi'},
            {id: 2,  text: 'Hello'},
            {id: 3,  text: 'How are you?'},
            {id: 4,  text: 'Yo'},
            {id: 5,  text: 'Hey!'}
        ]
    }
}

window.state = state;

export const addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}

export default state;