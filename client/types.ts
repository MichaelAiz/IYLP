
export interface LoginRequestBody {
    email: string
    password: string
}

export interface RegisterRequestBody {
    username: string
    email: string
    password: string
}

export type APIResponse = {
    result: string,
    payload: string
}

export type Hobby = {
    name: string,
    id: string
}

export type PostConfig = {
    date: string,
    createdBy: string,
    opID: string,
    hobby_id: string,
    title: string,
    category: string,
    content: string
}