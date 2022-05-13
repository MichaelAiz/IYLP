import React, { useContext, useState } from 'react'
import AppContext, {AppState } from '../context/app'
import Router, { useRouter } from 'next/router'
import { PostConfig } from '../types'

export type NewPostProps = {
    category: string,
    CreateNewPost:(config: PostConfig) => void
}



const NewPost = ({ category, CreateNewPost }: NewPostProps) => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const {state}  = useContext(AppContext)
    const router = useRouter()
    const hobby = state?.activeHobby

    if(!state || !hobby){
        router.push('/login')
        return <h1>Loading state</h1>
    }

    return (
        <div className='mt-8 bg-white shadow-md px-2 pt-2 pb-4  rounded-md' >
            <div className='mx-auto px-4 sm:px-6 lg:px-0 flex justify-center'>
                <div className="min-h-full">
                    <div>
                        <div className='text-2xl'>
                            <h1>Make a new post in {category}</h1>
                        </div>
                        <div>
                            <label htmlFor="email" className='sr-only'>Email</label>
                            <input type="text" placeholder='Title' className='w-full bg-blue-200 placeholder-white rounded-md py-3  pl-3 mt-5'
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className='sr-only'>Content</label>
                            <textarea placeholder='Content' className='w-full border bg-blue-200 placeholder-white rounded-md py-3 pl-3 mt-2'
                                onChange={(e) => { 
                                    setContent(e.target.value)
                                }}>
                            </textarea>
                        </div>
                        <div>
                            <button className='w-full rounded-md py-3 text-white mt-2 bg-violet-400' onClick={(e) => {
                                e.preventDefault()
                                const newPost: PostConfig = {
                                    date: Date(),
                                    createdBy: state.username,
                                    opID: state.userID,
                                    hobby_id: hobby.id,
                                    category,
                                    title,
                                    content
                                }
                                CreateNewPost(newPost)
                            }}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPost
