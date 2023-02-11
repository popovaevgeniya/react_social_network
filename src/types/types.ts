export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    aboutMe: string
    photos: PhotosType
}

export type UserType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
}