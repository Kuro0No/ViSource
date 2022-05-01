import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => { return localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null })
    const [authTokens, setAuthTokens] = useState(() => {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    })
    const navigate = useNavigate()

    const register = async (e) => {

        try {
            const res = await axios.post(`http://localhost:8000/api/user/register/`, {
                email: e.email,
                name: e.username,
                password: e.password,

            })
            navigate('/login')
        } catch {
            alert('Failed to register')
        }

    }
    const loginUser = (e) => {

        // try {
        //     const res = await axios.post('http://localhost:8000/api/token/',
        //         {
        //             email: e.email,
        //             password: e.password,
        //         },
        //         {
        //             headers: {
        //                 Authorization: 'Bearer ' + varToken
        //             }
        //         }
        //     )
        //     setAuthTokens(res.data)
        //     setUser(jwt_decode(res.data.access))
        //     localStorage.setItem('authTokens', JSON.stringify(res.data))
        //     navigate('/')
        // } catch {
        //     alert('smt wrong')
        // }

        try {

            axios
                .post(`http://localhost:8000/api/token/`, {
                    email: e.email,
                    password: e.password,
                })
                .then((res) => {
                    setAuthTokens(res.data)
                    setUser(jwt_decode(res.data.access))
                    localStorage.setItem('authTokens', JSON.stringify(res.data));
                    localStorage.setItem('refresh_token', res.data.refresh);
                    axios.defaults.headers['Authorization'] =
                        'Bearer ' + localStorage.getItem('authTokens');
                    navigate('/');

                });
        } catch {
            alert('smt wrong')
        }
    }


    const signOut = () => {
        try {
            localStorage.removeItem('authTokens')
            setAuthTokens(null)
            setUser(null)
            navigate('/login')
        } catch {
            alert('Smt wrong')
        }
    }

    const value = {
        register,
        loginUser,
        user,
        authTokens,
        signOut,

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext