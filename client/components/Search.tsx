import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Hobby } from "../types";
import request from "../lib/request";
import AppContext, { AppState } from '../context/app'
import { on } from "events";

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
            <div className="">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div>
                    <input
                        id="search"
                        role="search-box"
                        className=" w-full bg-blue-200 placeholder-white rounded-md mb-2 py-3 pr-3 pl-3 "
                        autoComplete="off"
                        placeholder="Testing"
                        type="search"
                        name="search"
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            const nextOptions = filterInput(options, event.currentTarget.value);
                            console.log(activeOptions)
                            setActiveOptions(nextOptions)
                        }}
                        onFocus={e => e.currentTarget.select()}
                    />
                </div>
                <ul className="grid grid-cols-1 gap-4">
                        {activeOptions.map((hobby) => <a 
                        onClick={() => {
                            onClick(hobby)
                        }}
                        className="rounded-lg shadow-md px-5 pt-10 pb-4 bg-violet-200 flex items-center cursor-pointer tsxt-sm font-semibold">
                            {hobby.name}
                        </a>) }
                </ul>
            </div>
        </>
    )
}

export default SearchComponent;