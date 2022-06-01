import axios from "axios";

const instatce = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '3f26be3e-65ab-4630-9892-39fd2574b842'}
});

export const usersAPI = {
    requestUsers (currentPage = 1, pageSize = 10) {
        return instatce.get(`users?page=${currentPage}&count=${pageSize}`,
        ).then(response => {
            return response.data;
        })
    },
    follow (userId: number) {
        return  instatce.post(`follow/${userId}`, {})
    },
    unfollow (userId: number) {
        return  instatce.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instatce.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instatce.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instatce.put(`profile/status`, {status});
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    captchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instatce.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false) {
        return instatce.post(`auth/login`, {email, password, rememberMe}).then(res => res.data);
    },
    logout() {
        return instatce.delete(`auth/login`).then(res => res.data);
    }
}

