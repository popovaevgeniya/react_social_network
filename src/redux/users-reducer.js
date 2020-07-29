const SUBSCRIBE = 'subscribe';
const UNSUBSCRIBE = 'UNSUBSCRIBE';
const SET_USERS = 'SET_USERS';

let initialState = {
        users: [
            {id: 1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
                fullName: 'Evgeniya P.', status: 'I am a boss', location: {city: 'Kharkov', country: 'Ukraine'}, subscribed: true},
            {id: 2, photoUrl: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
                fullName: 'Yaroslav K.', status: 'I am a boss too', location: {city: 'Liman', country: 'Ukraine'}, subscribed: false},
            {id: 3, photoUrl: 'https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png',
                fullName: 'Marina M.', status: 'I am a boss too', location: {city: 'Lothovaya', country: 'Ukraine'}, subscribed: true}
        ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIBE:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, subscribed: true}
                    }
                    return u;
                })
            }
        case UNSUBSCRIBE:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, subscribed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return  {
                ...state,
                users: [...state.users, ...action.users ]
            }
        }
        default:
            return state;
    }
}

export const subscribeActionCreator = (userId) => ({type: SUBSCRIBE, userId});
export const unsubscribeActionCreator = (userId) => ({type: UNSUBSCRIBE, userId});
export const setUsersActionCreator = (users) => ({type: SET_USERS, users});

export default usersReducer;