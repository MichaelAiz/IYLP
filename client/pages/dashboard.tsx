import Head from 'next/head';
import { useContext, useEffect} from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import AppContext, { AppState } from '../context/app'


const dashboard = () => {
    const testing = "testindg"
    return (
        <div>
            {testing}
        </div>
    )
}

export default dashboard