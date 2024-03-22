import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";
import authenticationService from "../../api/services/authenticationService";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {

    const [submitting, setSubmitting] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('helperzz-jwt-auth-token');
        if (token) {
            navigate('/')
        }
    }, []);

    const handleChange = (e) => {
        setLoginData(prev => ({...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (loginData.email.length === 0){
            toast.error('Please fill the email field', { position: "top-center", id: 'login' })
            return
        }
        if (loginData.password.length === 0){
            toast.error('Please fill the password field.', { position: "top-center", id: 'login' })
            return
        }
        setSubmitting(true)

        authenticationService.login(loginData).then(response => {
            setSubmitting(false)
            Cookies.set('helperzz-jwt-auth-token', response.token, {
                secure: true,
                sameSite: 'Lax',
            });
            navigate('/')
            toast.success(response.message)
        }).catch(error => {
            toast.error(error.message)
            setSubmitting(false)
        })
    }

    return (
        <div className="flex h-[100vh]">
        <div
            className="relative mx-auto my-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">Helperzz Admin</h1>
                    <p className="mt-2 text-gray-500">Sign in below to access your account</p>
                </div>
                <div className="mt-5">
                    <form action="">
                        <div className="relative mt-6">
                            <input onChange={(e) => handleChange(e)} type="email" name="email" id="email" placeholder="Email Address"
                                   className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                            <label htmlFor="email"
                                   className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email
                                Address</label>
                        </div>
                        <div className="relative mt-6">
                            <input onChange={(e) => handleChange(e)} type="password" name="password" id="password" placeholder="Password"
                                   className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                            <label htmlFor="password"
                                   className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                        </div>
                        <div className="my-6">
                            {submitting ?
                            <button type="submit" onClick={(e) => e.preventDefault()}
                                    className="w-full rounded-md bg-black px-3 py-4 text-white">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
                            </button>
                                :
                            <button onClick={(e) => handleLogin(e)} type="submit"
                                    className="w-full rounded-md bg-black px-3 py-4 text-white hover:scale-105">Sign
                                in
                            </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;
