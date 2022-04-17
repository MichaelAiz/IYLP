import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Hobby } from "../types";
import request from "../lib/request";
import AppContext, { AppState } from '../context/app'
import {
    SearchIcon
} from '@heroicons/react/outline';


export type SearchProps = {
    options: Hobby[]
    onClick: (hobby: Hobby) => unknown
}

const filterInput = (options: Hobby[], input?: string) => {
    if (input && input !== '') {
        return options.filter((hobby: Hobby) => {
            const test = input.toLowerCase();
            return hobby.name.toLowerCase().includes(test)
        });
    }
    return [];
};

const SearchComponent:React.FC<SearchProps> = ({
    options,
    onClick
}) => {
    const { state, setState } = useContext(AppContext)
    const [activeOptions, setActiveOptions] = useState<Hobby[]>([]);

    return (
        <>
            <div className="mt-2 ">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="">
                    <input
                        id="search"
                        role="search-box"
                        className=" w-full bg-white border-2 focus:outline-IYLP-Violet focus:border-0 rounded-md mb-2 py-3 pr-3 pl-3 placeholder-gray-500 "
                        autoComplete="off"
                        placeholder="ex. Air Hockey"
                        type="search"
                        name="search"
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            const nextOptions = filterInput(options, event.currentTarget.value);
                            setActiveOptions(nextOptions)
                        }}
                        onFocus={e => e.currentTarget.select()}
                    />
                </div>
                <ul className="flex flex-col mt-4 gap-2">
                        {activeOptions.map((hobby) => <a 
                        key={hobby.id}
                        onClick={() => {
                            onClick(hobby)
                        }}
                        className="rounded-lg shadow-md px-6 py-5 pb-4 hover:bg-IYLP-blue border-gray-300 text-md flex content-center cursor-pointer font-mono">
                            <p>{hobby.name}</p>
                        </a>) }
                </ul>
            </div>
        </>
    )
}


export default SearchComponent;