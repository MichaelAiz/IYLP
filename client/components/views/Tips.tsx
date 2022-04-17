import React, { useEffect, useState } from 'react';
import { PostConfig } from '../../types';
import Post from '../Post';

const Tips = ({ posts }: { posts: PostConfig[] }) => {

    return (
        <div className=''>
            <div className='flex flex-col'>
                {posts.map((post) =>
                    <Post key={post.date} post={post} />
                )}
            </div>
        </div>
    )
}

export default Tips