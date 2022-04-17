import React from 'react'
import { PostConfig } from '../types'
import Image from 'next/image';

export type PostProps = {
    post: PostConfig
}



const Post = ({ post }: PostProps) => {
    const dateArray = post.date.split(' ')
    let postDate = ''
    for (let i = 0; i < 4; i++) {
        postDate = postDate + dateArray[i] + ' '
    }

    return (
        <div className='bg-white px-4 py-5 my-2 rounded-md  border-0 shadow-md' >
            <div className='flex w-full '>
                <div className='flex flex-col'>
                    <span className='text-bold text-md '>
                        {post.createdBy}
                    </span>
                    <span className='text-sm text-gray-400'>
                        {postDate}
                    </span>
                </div>
            </div>
            <div className='text-md font-bold mb-1 mt-2'>
                {post.title}
            </div>
            <div className='text-sm text-gray-500'>
                {post.content}
            </div>
        </div>
    )
}

export default Post