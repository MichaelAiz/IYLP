import styles from './Login.module.css'
import React, { useContext, useState } from "react";
import AppContext, { AppState } from '../context/app';

export type LoginProps = {
    onLogin: (email: string, password: string) => void
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
                                <p className='sm:text-2xl'>or, register now</p>
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
                                        <input type="text" placeholder='Enter email' className='w-full bg-blue-200 placeholder-white rounded-md py-3 pr-24 pl-3 mt-5'
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className='sr-only'>Password</label>
                                        <input type="text" placeholder='Password' className='w-full border bg-blue-200 placeholder-white rounded-md py-3 pr-24 pl-3 mt-5'
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <button className='w-full rounded-md py-3 text-white mt-20 bg-violet-400' onClick={(e) => {
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