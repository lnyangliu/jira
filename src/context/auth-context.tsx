import React from "react"
import { useState } from "react"
import * as auth from "auth-provider"
import {User} from 'screens/project-list/search-panel'
import {ReactNode} from 'react'
import { http } from "utils/http"
import { useMount } from "utils"

interface AuthForm {
    username: string,
    password: string
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken()
    if (token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user;
}

const AuthConetxt = React.createContext<
    {user: User | null,
    login: (form: AuthForm) => Promise<void>,
    register: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>} | undefined
>(undefined)
AuthConetxt.displayName = "AuthConetxt"

export const AuthProvider = ({children}: {children:ReactNode}) => {
    const [user, setUser] = useState< User | null >(null)
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    useMount(() => {
        bootstrapUser().then(setUser)
    })

    return <AuthConetxt.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
    const context = React.useContext(AuthConetxt)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context;
}