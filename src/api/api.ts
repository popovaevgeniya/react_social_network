import axios from "axios";
import {ProfileType, UserType} from "../types/types";

const instatce = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '3f26be3e-65ab-4630-9892-39fd2574b842'}
});

type GetItemsType = {
    items: Array<UserType>
    itemCount: number
    totalCount: number
    error: string | null
}

export const usersAPI = {
    requestUsers (currentPage = 1, pageSize = 10) {
        return instatce.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`,
        ).then(res => res.data)
    },
    follow (userId: number) {
        return  instatce.post<ResponseType>(`follow/${userId}`, {}).then(res => res.data)
    },
    unfollow (userId: number) {
        return  instatce.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instatce.get<ProfileType>(`profile/${userId}`).then(res => res.data);
    },
    getStatus(userId: number) {
        return instatce.get<string>(`profile/status/${userId}`).then(res => res.data);
    },
    updateStatus(status: string) {
        return instatce.put<ResponseType>(`profile/status`, {status}).then(res => res.data);
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    captchaIsRequired = 10
}

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export const authAPI = {
    me() {
        return instatce.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false) {
        return instatce.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe}).then(res => res.data);
    },
    logout() {
        return instatce.delete(`auth/login`).then(res => res.data);
    }
}

