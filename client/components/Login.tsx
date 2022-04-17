import styles from './Login.module.css'
import React, { useContext, useState } from "react";
import AppContext, { AppState } from '../context/app';
import Router, { useRouter } from 'next/router';

export type LoginProps = {
    onLogin: (email: string, password: string) => void
    loginState: 'WAITING' | 'ERROR' | 'SUCCESS'
}

const LoginPage: React.FC<LoginProps> = ({ onLogin, loginState }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    return (
        <div className="h-screen w-full">
            <main className='pt-10 sm:pt-16 lg:pt-8 lg:pb-14 h-full lg:overflow-hidden flex lg:items-center justify-center'>
                <div className='mx-auto max-w-7xl lg:px-8'>
                    <div className='lg:grid lg:grid-cols-2'>
                        <div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:text-left lg:flex lg:items-center'>
                            <div>
                                <h1 className='text-4xl pb-2 mb-2'>
                                    <span className='block'>Continue Exploring New Passions</span>
                                </h1>
                                <p className='sm:text-2xl'>or, <a
                                    className='text-button-blue cursor-pointer'
                                    onClick={() => { router.push('/register') }}>
                                    register now
                                </a></p>
                            </div>
                        </div>
                        <div className='mx-auto px-4 sm:px-6 lg:px-0 flex justify-center'>
                            <div className="min-h-full pr-">
                                <div>
                                    <div className='text-3xl'>
                                        <h1>Sign in</h1>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className='sr-only'>Email</label>
                                        <input type="text" placeholder='Enter email' className='w-full bg-IYLP-blue placeholder-violet-text rounded-md py-3 pr-24 pl-3 mt-5'
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className='sr-only'>Password</label>
                                        <input type="password" placeholder='Password' className='w-full bg-IYLP-blue placeholder-violet-text rounded-md py-3 pr-24 pl-3 mt-5'
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <button className='w-full rounded-md py-3 text-white mt-10 bg-button-blue' onClick={(e) => {
                                            e.preventDefault()
                                            console.log("Logging in")
                                            onLogin(email, password)
                                        }}>
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LoginPage