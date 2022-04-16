import React, { useEffect, useState } from 'react';
import { AppState } from '../../context/app';
import request from '../../lib/request';
import { PostConfig } from '../../types';
import Post from '../Post';

const Exchange = ({ state, allPosts }: { state: AppState, allPosts: PostConfig[] }) => {
    const { username, userID, jwt, activeHobby } = state
    const [exchangePosts, setExchangePosts] = useState<PostConfig[]>([])
    console.log(allPosts)

    const filterPosts = (posts: PostConfig[]) => {
        return posts.filter((post) => {
            return post.category == 'Exchange'
        })
    }

    useEffect(() => {
        if(exchangePosts.length == 0) {
            setExchangePosts(filterPosts(allPosts))
        }
    })

    return (
        <div className='w-4/5'>
            <div className='flex flex-col mx-auto'>
                {exchangePosts.map((post) =>
                    <Post post={post}/>
                )}
            </div>
        </div>
    )
}

export default Exchange