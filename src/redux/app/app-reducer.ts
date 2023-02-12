import {getAuthUserData} from "../auth/auth-reducer";
import {InferActionsType} from "../redux-store";

let initialState = {
    initialized: false
}


const actions = {
    initializedSuccess: () => ({type: 'SOCIAL_NETWORK/APP/INITIALIZED_SUCCESS'} as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SOCIAL_NETWORK/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

//thunk-a
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export default appReducer;