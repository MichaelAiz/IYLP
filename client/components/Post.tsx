import React from 'react'
import { PostConfig } from '../types'

export type PostProps = {
    post: PostConfig
}


const Post = ({post}: PostProps) => {
    return (
        <div className='bg-white px-4 py-4 rounded-md  border-0 shadow-md' >
            <div>
                {post.createdBy}
            </div>
            <div>
                {post.title}
            </div>
            <div>
                {post.content}
            </div>
        </div>
    )
}

export default Post