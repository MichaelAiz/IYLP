import Head from 'next/head';
import { useContext, useEffect} from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import AppContext, { AppState } from '../context/app'

export default function Home(){
    const router = useRouter()
    const { state, setState } = useContext(AppContext)
    useEffect(() => {
        if (!state) {
            router.push('/login')
        } else {
            router.push('/dashboard')
        }
    }, [state, setState])
}