import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"

let rootReducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

type RootReducersType = typeof rootReducers;
export type AppSateType = ReturnType<RootReducersType>

// @ts-ignore
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export default store