import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import AppContext, { AppState } from '../context/app'
import LoginPage from '../components/Login'
import request from '../lib/request'
import { LoginRequestBody, APIResponse } from '../types';
import { JWTPayload } from 'jose'
import { route } from 'next/dist/server/router';
import dashboard from './dashboard';

export type loginState = 'WAITING' | 'ERROR' | 'SUCCESS'

const login = () => {
    const router = useRouter()
    const { state, setState } = useContext(AppContext)
    const [loginState, setLoginState] = useState<loginState>('WAITING')

    useEffect(() => {
        if (state) {
            router.push('/dashboard')
        }
    })

    const onLogin = async (email: string, password: string) => {
        if (!state && setState) {
            const loginBody: LoginRequestBody = {
                email,
                password
            }
            const result: APIResponse = await request('POST', 'http://localhost:3001/api/login', { headers: {}, body: loginBody })
            const verifyResult: JWTPayload = await request('GET', 'http://localhost:3001/api/introspect', { headers: { authorization: result.payload } })
            console.log(verifyResult)
            if (!verifyResult || !verifyResult.sub) {
                console.log("ERROR")
                setLoginState('ERROR')
            } else {
                const [username, user_id] = verifyResult.sub.split('/')
                setState({
                    username: username,
                    userID: user_id,
                    jwt: result.payload
                })
                router.push('/dashboard')
            }
        }
    }

    return (
        <div className='h-full'>
            <LoginPage onLogin={onLogin} loginState={loginState} />
        </div>
    )
}

export default login;