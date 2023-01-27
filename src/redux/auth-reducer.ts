import {authAPI, ResultCodeEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsType} from "./redux-store";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            } as InitialStateType
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: 'SN/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}} as const
    )
}

//thunk creators:
export const getAuthUserData = ():ThunkType => async (dispatch) => {
    const response = await authAPI.me();

    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.resultCode === ResultCodeEnum.Success)
        dispatch(getAuthUserData());
    else {
        let messages = response.messages.length > 0 ? response.messages[0] : 'Something is wrong!';
        dispatch(stopSubmit('login', {_error: messages}));
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.resultCode === ResultCodeEnum.Success)
        dispatch(actions.setAuthUserData(null, null, null, false));
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>