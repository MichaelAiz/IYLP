import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import AppContext, { AppState } from '../context/app'
import DashboardNav from '../components/dashboardNav'
import LoginPage from '../components/Login';
import SearchComponent from '../components/Search';
import { Hobby } from '../types';
import request from '../lib/request';

const dashboard = () => {
    const { state, setState } = useContext(AppContext)
    const [hobbyOptions, setHobbyOptions] = useState<Hobby[]>([])
    const router = useRouter()

    if(!state){
        return <h1>Loading</h1>
    }

    useEffect(() => {
        if (state) {
            const getAllHobbies = async () => {
                console.log('here')
                const hobbies: Hobby[] = await request('GET', 'http://localhost:3001/api/getAllHobbies', { headers: { authorization: state.jwt } })
                setHobbyOptions(hobbies)
            }
            getAllHobbies()
        }
    }, [])

    const onHobbySelect = (hobby: Hobby) => {
        const newState = {...state, ...{activeHobby: hobby}}
        if(setState) {
            setState(newState)
            router.push('/hobby')
        }
    }

    return (
        <div className='w-full h-screen'>
            <div>
                <DashboardNav></DashboardNav>
            </div>
            <div className=" w-full h-full flex justify-center">
                <div className='flex w-full flex-col items-center mt-10'>
                    <div className=' text-3xl text-center' >
                        What is your hobby?
                    </div>
                    <div className='w-2/5 mt-5'>
                        <SearchComponent options={hobbyOptions} onClick={onHobbySelect}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard