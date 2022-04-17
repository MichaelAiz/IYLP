import React, { useContext, useEffect, useState } from 'react';
import HobbyNav from '../components/HobbyNav';
import Header from '../components/Header';
import AppContext from '../context/app';
import Exchange from '../components/views/Exchange';
import { APIResponse, Hobby, PostConfig } from '../types';
import request from '../lib/request';
import NewPost from '../components/NewPost';
import Tips from '../components/views/Tips';

const HobbyPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('Exchange');
  const [posts, setPosts] = useState<PostConfig[]>([])
  const { state, setState } = useContext(AppContext)

  if (!state || !state.activeHobby) {
    return <h1>Loading</h1>
  }

  const hobby: Hobby = state.activeHobby

  const filterPosts = (posts: PostConfig[], category:string) => {
    return posts.filter((post) => {
      return post.category == category
    })
  }

  const getPosts = async () => {
    const result: APIResponse = await request('GET', `http://localhost:3001/api/getAllPosts?hobby_id=${state.activeHobby?.id}`, { headers: { authorization: state.jwt } })
    const allPosts: PostConfig[] = JSON.parse(result.payload)
    const activeNavPosts = filterPosts(allPosts, activeNav)
    setPosts(activeNavPosts)
  }

  useEffect(() => {
    getPosts()
  }, [activeNav])



  const newPost = async (requestBody: PostConfig) => {
    const result: APIResponse = await request('POST', `http://localhost:3001/api/createPost`, { headers: { authorization: state.jwt }, body: requestBody })
    getPosts()
  }

  const saveHobby = async () => {
    const result: APIResponse = await request('POST', `http://localhost:3001/api/likeHobby`, { headers: { authorization: state.jwt }, body: { hobby_id: hobby.id } })
    console.log(result.result)
  }

  return (
    <div className="">
      <Header state={state} onHobbySave={saveHobby} />
      <div className='lg:grid lg:grid-cols-6 h-screen'>
        <div className='w-52 justify-self-left'>
          <HobbyNav
            activeNav={activeNav} setActiveNav={setActiveNav}
          />
        </div>
        <main className="pb-8 col-span-3 flex justify-center ">
          <div className="mt-8 w-4/5">
            {activeNav === 'Exchange' && (<Exchange posts={posts} />)}
            {activeNav === 'Tips' && (<Tips posts={posts} />)}
            {/* { activeNav === 'Questions' && (<Questions state={state} />) } */}
          </div>
        </main>
        <div className='justify-self-center col-span-2'>
          <NewPost category={activeNav} CreateNewPost={newPost} />
        </div>
      </div>
    </div>
  );
};

export default HobbyPage;