import React, { useContext, useEffect, useState } from 'react';
import request from '../lib/request';
import AppContext, { AppState } from '../context/app'
import { Hobby } from '../types';


type DashboardNavProps = {
}

const DashboardNav = ({
}: DashboardNavProps) => {
    const { state, setState } = useContext(AppContext)
    const [likedHobbies, setLikedHobbies] = useState<Hobby[]>([])

    useEffect(() => {
        if (state) {
            const getLikedHobbies = async () => {
                console.log('here')
                const hobbies: Hobby[] = await request('GET', 'http://localhost:3001/api/getAllLikedHobbies', { headers: { authorization: state.jwt } })
                setLikedHobbies(hobbies)
            }
            getLikedHobbies()
        }
    }, [])


    return (
        <>
            <div className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4 font-medium text-white text-4xl">IYLP</div>
                    <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                        <div className="px-2 space-y-1">
                            <div>
                                User
                            </div>
                            <div>
                                Messages
                            </div>
                        </div>
                        <div className="mt-6 pt-6">
                            <div className='mb-2 ml-1'>
                                Your Hobbies
                            </div>
                            <div className="px-2 space-y-1">
                                {likedHobbies.map((hobby) => (
                                    <a
                                        className='block'
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