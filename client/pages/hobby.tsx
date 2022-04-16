import React, { useContext, useEffect, useState } from 'react';
import { MenuAlt1Icon } from '@heroicons/react/outline';
import HobbyNav from '../components/HobbyNav';
import Header from '../components/Header';
import AppContext from '../context/app';
import Exchange from '../components/views/Exchange';
import { APIResponse, Hobby, PostConfig } from '../types';
import request from '../lib/request';
import NewPost from '../components/NewPost';

const HobbyPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('Exchange');
  const [posts, setPosts] = useState<PostConfig[]>([])
  const { state, setState } = useContext(AppContext)

  if (!state || !state.activeHobby) {
    return <h1>Loading</h1>
  }

  useEffect(() => {
    const getPosts = async () => {
      const posts: PostConfig[] = await request('GET', `http://localhost:3001/api/getAllPosts?hobby_id=${state.activeHobby?.id}`, { headers: { authorization: state.jwt } })
      setPosts(posts)
    }
    getPosts()
  }, [])

  const newPost = async (requestBody: PostConfig) => {
    const result: APIResponse = await request('POST', `http://localhost:3001/api/createPost`, { headers: { authorization: state.jwt }, body: requestBody})
    console.log(result.result)
    const posts: PostConfig[] = await request('GET', `http://localhost:3001/api/getAllPosts?hobby_id=${state.activeHobby?.id}`, { headers: { authorization: state.jwt } })
    setPosts(posts)
  }

  return (
    <div className="">
      <Header state={state} />
      <div className='grid grid-cols-3 h-screen'>
        <div className='w-52 justify-self-left'>
          <HobbyNav
            activeNav={activeNav} setActiveNav={setActiveNav}
            currentHobby={state.activeHobby?.name ? state.activeHobby.name : ''}
          />
        </div>
        <main className="pb-8 justify-self-">
          <div className="mt-8">
            {activeNav === 'Exchange' && (<Exchange state={state} allPosts={posts} />)}
            {/* { activeNav === 'Tips' && (<Tips state={state} />) }
            { activeNav === 'Questions' && (<Questions state={state} />) } */}
          </div>
        </main>
        <div className='justify-self-center'>
            <NewPost category={activeNav} CreateNewPost={newPost}/>
        </div>
      </div>
    </div>
  );
};

export default HobbyPage;