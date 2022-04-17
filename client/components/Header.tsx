import React from 'react';
import Image from 'next/image';
import { AppState } from '../context/app';


const Header = ({ state, onHobbySave }: { state: AppState, onHobbySave: () => void }) => {

    return (
        <div className="bg-white shadow">
            <div className="lg:pl-1 lg:pr-8 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-">
                <div className="py-6 md:flex md:items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold leading-7 sm:leading-9 sm:truncate text-IYLP-Violet">
                                    {state.activeHobby?.name}
                                </h1>
                            </div>
                            <div className=''>
                                <button 
                                onClick={(e) => onHobbySave()}
                                className='text-lg bg-IYLP-Violet rounded-md text-white py-2 px-5'>
                                    Save Hobby
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
