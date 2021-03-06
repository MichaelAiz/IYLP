import React, { useEffect, useState } from 'react';
import { PostConfig } from '../../types';
import Post from '../Post';

const Exchange = ({ posts }: { posts: PostConfig[] }) => {
    return (
        <div className=''>
            <div className='flex flex-col'>
                {posts.map((post) =>
                    <Post post={post} key={post.date} />
                )}
            </div>
        </div>
    )
}

export default Exchange