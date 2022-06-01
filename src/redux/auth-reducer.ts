import {authAPI, ResultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

//thunk creators:
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
);
export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me();

    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.resultCode === ResultCodeEnum.Success)
        dispatch(getAuthUserData());
    else {
        let messages = response.messages.length > 0 ? response.messages[0] : 'Something is wrong!';
        dispatch(stopSubmit('login', {_error: messages}));
    }
}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout();

    if (response.resultCode === ResultCodeEnum.Success)
        dispatch(setAuthUserData(null, null, null, false));
}

export default authReducer;