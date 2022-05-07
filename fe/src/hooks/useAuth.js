import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
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
    const [avatar, setAvatar] = useState(null)


    const register = async (e) => {

        try {
            const res = await axios.post(`https://visourcebe.herokuapp.com/api/user/register/`, {
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

        try {

            axios
                .post(`https://visourcebe.herokuapp.com/api/token/`, {
                    email: e.email,
                    password: e.password,
                })
                .then((res) => {
                    setAuthTokens(res.data)
                    setUser(jwt_decode(res.data.access))
                    setAvatar(jwt_decode(res.data.access).avatar)
                    localStorage.setItem('authTokens', JSON.stringify(res.data));
                    // localStorage.setItem('refresh_token', res.data.refresh);
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

    useEffect(() => {
        if (user) {

            async function getAva() {
                const res = await axios.get(`https://visourcebe.herokuapp.com/api/user/profile/${user.user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${String(authTokens.access)}`,
                       
                    }
                })
                setAvatar(res.data.avatar.slice(12))
            }
            getAva()
        }
    }, [user])




    const value = {
        register,
        loginUser,
        user,
        authTokens,
        signOut,
        avatar,
        setAvatar,

    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext