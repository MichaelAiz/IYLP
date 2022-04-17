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

    if (!state) {
        return <h1>Loading</h1>
    }

    useEffect(() => {
        if (state) {
            const getAllHobbies = async () => {
                const hobbies: Hobby[] = await request('GET', 'http://localhost:3001/api/getAllHobbies', { headers: { authorization: state.jwt } })
                setHobbyOptions(hobbies)
            }
            getAllHobbies()
        }
    }, [])

    const onHobbySelect = (hobby: Hobby) => {
        const newState = { ...state, ...{ activeHobby: hobby } }
        if (setState) {
            setState(newState)
            router.push('/hobby')
        }
    }

    return (
        <div className='w-full h-screen grid grid-cols-5'>
            <div>
                <DashboardNav></DashboardNav>
            </div>
            <div className="col-span-3 flex justify-center ">
                <div className='text-center w-2/3 flex flex-col '>
                    <div className='text-3xl mt-10 font-bold mb-3'>
                        What is your Hobby?
                    </div>
                    <SearchComponent onClick={onHobbySelect} options={hobbyOptions} />
                </div>
            </div>
        </div>
    )
}

export default dashboard