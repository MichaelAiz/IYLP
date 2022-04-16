import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import AppContext, { AppState } from '../context/app'
import RegisterPage from '../components/Register'
import request from '../lib/request'
import { LoginRequestBody, APIResponse, RegisterRequestBody} from '../types';
import { JWTPayload } from 'jose'
import { route } from 'next/dist/server/router';
import dashboard from './dashboard';

export type registerState = 'WAITING' | 'ERROR' | 'SUCCESS'

const register = () => {
    const router = useRouter()
    const { state, setState } = useContext(AppContext)
    const [registerState, setRegisterState] = useState<registerState>('WAITING')

    useEffect(() => {
        if (state) {
            router.push('/dashboard')
        }
    })

    const onRegister = async (username: string, email: string, password: string) => {
        if (!state && setState) {
            const registerBody: RegisterRequestBody = {
                username,
                email,
                password
            }
            const result: APIResponse = await request('POST', 'http://localhost:3001/api/register', { headers: {}, body: registerBody })
            const verifyResult: JWTPayload = await request('GET', 'http://localhost:3001/api/introspect', { headers: { authorization: result.payload } })
            console.log(verifyResult)
            if (!verifyResult || !verifyResult.sub) {
                console.log("ERROR")
                setRegisterState('ERROR')
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
            <RegisterPage onRegister={onRegister} registerState={registerState} />
        </div>
    )
}

export default register;