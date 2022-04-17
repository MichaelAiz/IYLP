import React, { useContext, useEffect, useState } from 'react';
import request from '../lib/request';
import AppContext, { AppState } from '../context/app'
import { Hobby } from '../types';

import {
    UserIcon,
    ChatIcon
} from '@heroicons/react/outline';


type DashboardNavProps = {
}

const DashboardNav = ({
}: DashboardNavProps) => {
    const { state, setState } = useContext(AppContext)
    const [likedHobbies, setLikedHobbies] = useState<Hobby[]>([])

    useEffect(() => {
        if (state) {
            const getLikedHobbies = async () => {
                const hobbies: Hobby[] = await request('GET', 'http://localhost:3001/api/getAllLikedHobbies', { headers: { authorization: state.jwt } })
                setLikedHobbies(hobbies)
            }
            getLikedHobbies()
        }
    }, [])

    if (!state) {
        return <h1>Loading</h1>
    }


    return (
        <>
            <div className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex flex-col flex-grow bg-gray-50 pt-5 overflow-y-auto divide-y-2 divide-IYLP-Violet">
                    <div className="flex items-center flex-shrink-0 px-4 font-medium text-button-blue text-4xl">IYLP</div>
                    <nav className="mt-2 flex-1 flex flex-col overflow-y-auto" aria-label="Sidebar">
                        <div className="px-2 ">
                            <div className='flex content-center cursor-pointer mb-2 mt-2 rounded-md'>
                                <UserIcon className='h-6 w-6 mr-1 inline-block' />
                                <span className='mr-20'>
                                    {state.username}
                                </span>
                            </div>
                            <div className='flex content-center cursor-pointer rounded-md hover:text-violet-text'>
                                <ChatIcon className='w-6 h-6 mr-1 inline-block' />
                                <span>
                                    Messages
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 divide-y ">
                            <div className='mb-2 ml-2 text-xl font-bold'>
                                Your Hobbies
                            </div>
                            <div className="px-2 space-y-1 flex flex-col font-mono">
                                {likedHobbies.map((hobby) => (
                                    <a
                                        className='cursor-pointer bg-violet-text hover:bg-IYLP-Violet rounded-md pl-2 py-2 shadow-md'
                                        key={hobby.id}
                                        onClick={() => console.log(hobby.id)}
                                    >
                                        {hobby.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default DashboardNav;