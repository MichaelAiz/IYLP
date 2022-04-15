import { GetContent } from "react-tooltip"

export interface PostRequestBody {
    date: string
    category: string
    content: string
    title: string
    hobby_id: string
}

export interface LoginRequestBody {
    email: string
    password: string
}

export type LoginResponse = {
    result: string,
    paylaod: string
}