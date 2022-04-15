import Head from 'next/head';
import { useContext, useEffect} from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import AppContext, { AppState } from '../context/app'
import LoginPage  from '../components/Login'
import request from '../lib/request'
import { LoginRequestBody, LoginResponse } from '../types';
import { JWTPayload } from  'jose'

const login = () => {
    const router = useRouter()
    const { state, setState } = useContext(AppContext)

    useEffect(() => {
        if(state) {
            router.push('/dashboard')
        }
    })

    const onLogin = async (email: string, password: string) => {
        if(!state && setState) {
            const loginBody:LoginRequestBody = {
                email,
                password
            }
            const result: LoginResponse = await request('POST', 'http://localhost:3001/api/login', {headers: {}, body: loginBody})
            const verifyResult: JWTPayload = await request('GET', 'http://localhost:3001/api/introspect', {headers: { authorization: result.payload }} )
            console.log(result.payload)
            setState({
                username: 'efe',
                userID: "334",
                jwt: result.payload
            })
        }
    }

    return (
        <div className='h-full'>
            <LoginPage onLogin={onLogin} />
        </div>
    )
}
    
export default login;