const SUBSCRIBE = 'subscribe';
const UNSUBSCRIBE = 'UNSUBSCRIBE';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount: 0
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