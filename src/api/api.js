import * as axios from "axios";

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
    follow (userId) {
        return  instatce.post(`follow/${userId}`, {})
    },
    unfollow (userId) {
        return  instatce.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instatce.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instatce.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instatce.put(`profile/status`, {status});
    }
}

export const authAPI = {
    me() {
        return instatce.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instatce.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instatce.delete(`auth/login`);
    }
}

